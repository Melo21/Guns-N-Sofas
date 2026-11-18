#!/usr/bin/env node
/*
 * Checks data/chords.js and data/songs.js for mistakes that would break a song.
 * Usage: node scripts/validate-songs.js
 * Exits with code 1 and lists every problem it finds.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of ['data/chords.js', 'data/songs.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f });
}
const { shapes, songs, chapters, steps } = sandbox.window.STRUM_DATA;

const errors = [];
const err = (song, msg) => errors.push(`${song ? song.id || '(no id)' : 'data'}: ${msg}`);

const LEVELS = ['easy', 'medium', 'stretch'];
const PATTERN = /^[DUduXxBb-]+$/;
const SHAPE = /^[x0-9]{6}$/;

for (const [name, shape] of Object.entries(shapes)) {
  if (!SHAPE.test(shape)) err(null, `chord "${name}" has an invalid shape "${shape}" (use 6 characters of x or fret numbers)`);
}

const chapterNums = new Set(chapters.map(c => c.n));
const ids = new Set();

function checkPattern(song, where, p, lengths) {
  if (typeof p !== 'string' || !PATTERN.test(p)) err(song, `${where} pattern "${p}" may only use D U d u X x B b -`);
  else if (!lengths.includes(p.length)) err(song, `${where} pattern "${p}" must be ${lengths.join(' or ')} characters long`);
}

for (const s of songs) {
  if (!s.id || !/^[a-z0-9-]+$/.test(s.id)) err(s, 'id must be lowercase letters, numbers, and hyphens');
  if (ids.has(s.id)) err(s, 'duplicate id');
  ids.add(s.id);
  for (const field of ['title', 'artist', 'key', 'skill', 'tip']) {
    if (typeof s[field] !== 'string' || !s[field].trim()) err(s, `missing ${field}`);
  }
  if (!chapterNums.has(s.chapter)) err(s, `chapter ${s.chapter} does not exist`);
  if (!LEVELS.includes(s.level)) err(s, `level must be one of ${LEVELS.join(', ')}`);
  if (s.step !== undefined && !(steps[s.chapter] && steps[s.chapter][s.step])) err(s, `step ${s.step} has no label in chapter ${s.chapter}`);
  if (!Number.isInteger(s.capo) || s.capo < 0 || s.capo > 12) err(s, 'capo must be a whole number from 0 to 12');
  if (!Array.isArray(s.bpm) || s.bpm.length !== 2 || typeof s.bpm[0] !== 'number') err(s, 'bpm must be [start tempo, record tempo or null]');
  else {
    if (s.bpm[0] < 40 || s.bpm[0] > 200 || s.bpm[0] % 5 !== 0) err(s, 'start tempo must be 40 to 200 and a multiple of 5');
    if (s.bpm[1] !== null && (typeof s.bpm[1] !== 'number' || s.bpm[1] < s.bpm[0])) err(s, 'record tempo must be null or at least the start tempo');
  }
  checkPattern(s, 'song', s.strum, [8, 16]);
  if (s.barre) {
    for (const [chord, v] of Object.entries(s.barre)) {
      for (const lvl of ['easy', 'full']) {
        if (!v[lvl] || !SHAPE.test(v[lvl][1] || '')) err(s, `barre chord "${chord}" needs a valid ${lvl} shape`);
      }
    }
  }
  if (!Array.isArray(s.sections) || !s.sections.length) { err(s, 'needs at least one section'); continue; }
  s.sections.forEach((sec, i) => {
    const where = `section "${sec.name || i + 1}"`;
    if (!sec.name) err(s, `section ${i + 1} needs a name`);
    if (!Number.isInteger(sec.repeat) || sec.repeat < 1) err(s, `${where} repeat must be 1 or more`);
    if (sec.strum !== undefined) checkPattern(s, where, sec.strum, [8, 16]);
    if (sec.fill !== undefined) checkPattern(s, `${where} fill`, sec.fill, [8]);
    if (sec.vol !== undefined && (sec.vol < 0.3 || sec.vol > 1.5)) err(s, `${where} vol should be between 0.3 and 1.5`);
    if (!Array.isArray(sec.bars) || !sec.bars.length) { err(s, `${where} has no bars`); return; }
    sec.bars.forEach((bar, b) => {
      if (!Array.isArray(bar) || bar.length < 1 || bar.length > 4) err(s, `${where} bar ${b + 1} must hold 1 to 4 chords`);
      else for (const chord of bar) {
        const known = (s.barre && s.barre[chord]) || (s.shapes && s.shapes[chord]) || shapes[chord];
        if (!known) err(s, `${where} bar ${b + 1} uses "${chord}", which has no chord shape`);
      }
    });
  });
}

for (const c of chapters) {
  if (!songs.some(s => s.chapter === c.n)) err(null, `chapter ${c.n} "${c.name}" has no songs`);
}

if (errors.length) {
  console.error(`Found ${errors.length} problem${errors.length === 1 ? '' : 's'}:`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
const byLevel = LEVELS.map(l => `${songs.filter(s => s.level === l).length} ${l}`).join(', ');
console.log(`All good: ${songs.length} songs (${byLevel}) in ${chapters.length} chapters, ${Object.keys(shapes).length} chord shapes.`);
