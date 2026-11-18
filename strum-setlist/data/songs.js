/*
 * Strum Setlist song data.
 *
 * Each song: chapter, level (easy | medium | stretch), key it sounds in, capo fret,
 * bpm [start tempo, record tempo or null], and sections of bars.
 * A bar is a list of chords; two chords in a bar get two beats each.
 *
 * Strum patterns are 8 slots (1 & 2 & 3 & 4 &) or 16 slots (two bars):
 *   D/U full down/up strum, d/u light strum, X chuck, B bass note, - rest.
 * Section options: strum (pattern), fill (last bar of the section), vol (0.5 soft to 1.2 loud), pm (palm mute).
 * Song options: swing (long-short eighth notes), chop (reggae chop), barre (easier and full shapes).
 *
 * Run `node scripts/validate-songs.js` after editing.
 */
window.STRUM_DATA = window.STRUM_DATA || {};
window.STRUM_DATA.chapters = [
  {
    "n": 1,
    "name": "Open chord classics",
    "blurb": "Your safe zone. 15 songs with no barres, easiest first."
  },
  {
    "n": 2,
    "name": "Barre on-ramp",
    "blurb": "New territory, one small step at a time. Each song starts with an easier shape you can switch to the full barre when you are ready."
  },
  {
    "n": 3,
    "name": "Blues and sevenths",
    "blurb": "Open seventh chords and the 12-bar form. No barres, so it is a good break between barre chapters."
  },
  {
    "n": 4,
    "name": "Full barre songs",
    "blurb": "The A-shape barre and songs where barre chords do most of the work. Every song still has an easier shape to fall back on."
  },
  {
    "n": 5,
    "name": "Strumming techniques",
    "blurb": "New sounds from your strumming hand: chucks, boom-chick bass strumming, and palm muting. Mostly chords you already know, so all your focus goes to the right hand."
  },
  {
    "n": 6,
    "name": "BLACKPINK",
    "blurb": "K-pop on acoustic guitar. Three easy songs on open chords first, then songs that add Bm and Cm when you want a stretch."
  },
  {
    "n": 7,
    "name": "Holiday songs",
    "blurb": "Seasonal songs to play with family. All five are easy and use open chords only."
  },
  {
    "n": 8,
    "name": "Goo Goo Dolls",
    "blurb": "The records use unusual tunings, so these are standard-tuning versions. They keep the ring-and-pinky anchor you learned in Wonderwall, so all three are easy."
  },
  {
    "n": 9,
    "name": "Modern pop",
    "blurb": "Recent hits on open chords. Three easy four-chord loops, then Too Sweet with a B7."
  }
];
window.STRUM_DATA.steps = {
  "1": {
    "2": "More classics · no capo needed"
  },
  "2": {
    "1": "Step 1 · F with no barre",
    "2": "Step 2 · Mini barre, then full F",
    "3": "Step 3 · Move the shape up the neck",
    "4": "Step 4 · Full barre in a whole song"
  },
  "3": {
    "1": "Step 1 · Learn the form",
    "2": "Step 2 · A real blues song"
  },
  "4": {
    "1": "Step 1 · A-shape minor",
    "2": "Step 2 · A-shape major",
    "3": "Step 3 · Graduation"
  },
  "5": {
    "1": "Step 1 · Chucking",
    "2": "Step 2 · Boom-chick bass strum",
    "3": "Step 3 · Palm muting and power chords"
  },
  "6": {
    "1": "Easy · open chords only",
    "2": "Medium · adds Bm",
    "3": "Stretch · adds Bm and Cm"
  },
  "7": {
    "1": "Easy · open chords only"
  },
  "8": {
    "1": "Easy · anchor-finger shapes"
  },
  "9": {
    "1": "Easy · four-chord loops",
    "2": "Medium · adds B7"
  }
};
window.STRUM_DATA.songs = [
  {
    "id": "bad-moon-rising",
    "title": "Bad Moon Rising",
    "artist": "Creedence Clearwater Revival",
    "chapter": 1,
    "level": "easy",
    "key": "D",
    "capo": 0,
    "bpm": [100, 180],
    "strum": "D-D-DUDU",
    "skill": "Quick two-beat changes",
    "tip": "In the verse, A and G split one bar, two beats each. Look ahead to the G while you are still on A.",
    "sections": [
      {"name": "Verse", "repeat": 2, "strum": "D-dUD-dU", "vol": 0.85, "fill": "D-dUD---", "bars": [["D"], ["A", "G"], ["D"], ["D"]]},
      {"name": "Chorus", "repeat": 1, "strum": "D-DUDUDU", "vol": 1.1, "fill": "D-D-D-D-", "bars": [["G"], ["G"], ["D"], ["D"], ["A"], ["G"], ["D"], ["D"]]}
    ]
  },
  {
    "id": "leaving-on-a-jet-plane",
    "title": "Leaving on a Jet Plane",
    "artist": "John Denver",
    "chapter": 1,
    "level": "easy",
    "key": "G",
    "capo": 0,
    "bpm": [70, 100],
    "strum": "D-dU-udUD-dUDUdU",
    "skill": "Smooth G to C",
    "tip": "The same eight bars work for the verse and the chorus. Let the D ring for two full bars before you head back to G.",
    "sections": [
      {"name": "Verse and chorus", "repeat": 2, "fill": "D---D-DU", "bars": [["G"], ["C"], ["G"], ["C"], ["G"], ["C"], ["D"], ["D"]]}
    ]
  },
  {
    "id": "stand-by-me",
    "title": "Stand By Me",
    "artist": "Ben E. King",
    "chapter": 1,
    "level": "easy",
    "key": "A",
    "capo": 2,
    "bpm": [80, 118],
    "strum": "D-dU-udUD-dUDUdU",
    "skill": "G to Em",
    "tip": "Hit the lowest string of each chord on beat 1 to echo the famous bass line, then strum the rest.",
    "sections": [
      {"name": "Whole song", "repeat": 1, "fill": "D---D---", "bars": [["G"], ["G"], ["Em"], ["Em"], ["C"], ["D"], ["G"], ["G"]]}
    ]
  },
  {
    "id": "sweet-home-alabama",
    "title": "Sweet Home Alabama",
    "artist": "Lynyrd Skynyrd",
    "chapter": 1,
    "level": "medium",
    "key": "D",
    "capo": 0,
    "bpm": [80, 98],
    "strum": "D-dU-udUD-dUDUdU",
    "shapes": {"G": "320033"},
    "skill": "Anchor fingers",
    "tip": "Play G with your ring and pinky on fret 3 of the top two strings. They stay put for Cadd9, so only two fingers move.",
    "sections": [
      {"name": "Main riff", "repeat": 4, "bars": [["D", "Cadd9"], ["G"]]}
    ]
  },
  {
    "id": "three-little-birds",
    "title": "Three Little Birds",
    "artist": "Bob Marley",
    "chapter": 1,
    "level": "easy",
    "key": "A",
    "capo": 0,
    "bpm": [60, 76],
    "strum": "--D---D-",
    "chop": true,
    "skill": "Reggae off-beat chop",
    "tip": "Strum only on beats 2 and 4, then ease off the pressure right away so the chord stops short.",
    "sections": [
      {"name": "Chorus", "repeat": 2, "strum": "--D---D---D---Du", "vol": 1, "bars": [["A"], ["A"], ["D"], ["A"]]},
      {"name": "Verse", "repeat": 1, "strum": "--D---D-", "vol": 0.85, "fill": "--D-D-D-", "bars": [["A"], ["E"], ["A"], ["D"], ["A"], ["E"], ["D"], ["A"]]}
    ]
  },
  {
    "id": "zombie",
    "title": "Zombie",
    "artist": "The Cranberries",
    "chapter": 1,
    "level": "easy",
    "key": "Em",
    "capo": 0,
    "bpm": [70, 84],
    "strum": "D-DUDUDU",
    "skill": "Soft verse, loud chorus",
    "tip": "The whole song is one loop: Em, C, G, D. What makes it sound like Zombie is the contrast between sections. Keep the verse light and sparse, then hit the chorus hard with every strum. For the bass line the record has, try D/F# (2x0232) in place of D.",
    "sections": [
      {"name": "Intro", "repeat": 1, "strum": "D-D-D-DU", "vol": 1.1, "bars": [["Em"], ["C"], ["G"], ["D"]]},
      {"name": "Verse", "repeat": 2, "strum": "D---D-du", "vol": 0.6, "fill": "D---D---", "bars": [["Em"], ["C"], ["G"], ["D"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-DUDUDU", "vol": 1.2, "fill": "D-D-D-D-", "bars": [["Em"], ["C"], ["G"], ["D"]]}
    ]
  },
  {
    "id": "wagon-wheel",
    "title": "Wagon Wheel",
    "artist": "Old Crow Medicine Show",
    "chapter": 1,
    "level": "medium",
    "key": "A",
    "capo": 2,
    "bpm": [90, 145],
    "strum": "D-dU-udUD-dUDUdU",
    "skill": "Em to C at speed",
    "tip": "Each line ends on two bars of C, which gives you a moment to reset before the G.",
    "sections": [
      {"name": "Verse and chorus", "repeat": 2, "fill": "D-D-D---", "bars": [["G"], ["D"], ["Em"], ["C"], ["G"], ["D"], ["C"], ["C"]]}
    ]
  },
  {
    "id": "good-riddance",
    "title": "Good Riddance (Time of Your Life)",
    "artist": "Green Day",
    "chapter": 1,
    "level": "medium",
    "key": "G",
    "capo": 0,
    "bpm": [70, 95],
    "strum": "D-DUDUDU",
    "shapes": {"G": "320033"},
    "skill": "Busier strum",
    "tip": "Keep ring and pinky planted on fret 3 of the top two strings between G and Cadd9.",
    "sections": [
      {"name": "Verse", "repeat": 2, "strum": "D-dUdUdU", "vol": 0.8, "bars": [["G"], ["G"], ["Cadd9"], ["D"], ["G"], ["G"], ["Cadd9"], ["D"], ["Em"], ["D"], ["Cadd9"], ["G"], ["Em"], ["D"], ["Cadd9"], ["G"]]},
      {"name": "Chorus", "repeat": 1, "strum": "D-DUDUDUD-DU-UDU", "vol": 1.1, "fill": "D---D---", "bars": [["Em"], ["G"], ["Em"], ["G"], ["Em"], ["D"], ["G"]]}
    ]
  },
  {
    "id": "wonderwall",
    "title": "Wonderwall",
    "artist": "Oasis",
    "chapter": 1,
    "level": "medium",
    "key": "F#m",
    "capo": 2,
    "bpm": [70, 87],
    "strum": "D-DU-UDU",
    "shapes": {"G": "320033"},
    "skill": "New chord shapes",
    "tip": "Ring and pinky never leave fret 3 of the top two strings. Only your first two fingers move between every chord.",
    "sections": [
      {"name": "Verse", "repeat": 2, "strum": "D-DUdUdUD-dU-UdU", "vol": 0.9, "bars": [["Em7"], ["G"], ["Dsus4"], ["A7sus4"]]},
      {"name": "Pre-chorus", "repeat": 1, "strum": "D-dU-udU", "vol": 0.95, "fill": "D-D-D-D-", "bars": [["Cadd9"], ["Dsus4"], ["Em7"], ["Em7"], ["Cadd9"], ["Dsus4"], ["A7sus4"], ["A7sus4"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-DUDUDU", "vol": 1.15, "bars": [["Cadd9"], ["Em7"], ["G"], ["Em7"]]}
    ]
  },
  {
    "id": "island-in-the-sun",
    "title": "Island in the Sun",
    "artist": "Weezer",
    "chapter": 1,
    "step": 2,
    "level": "easy",
    "key": "Em",
    "capo": 0,
    "bpm": [80, null],
    "strum": "D-DUD-DU",
    "skill": "Two chords per bar",
    "tip": "Em, Am, D, G with two beats on each chord, so you change on beats 1 and 3. That quick, bouncy change is what makes it sound like the song. The record also has a lead guitar melody on top; this play-along is just the strummed part underneath.",
    "sections": [
      {"name": "Intro", "repeat": 3, "bars": [["Em", "Am"], ["D", "G"]]},
      {"name": "Verse", "repeat": 6, "strum": "D-dUD-dU", "vol": 0.8, "bars": [["Em", "Am"], ["D", "G"]]},
      {"name": "Hip hip", "repeat": 1, "vol": 1.15, "fill": "D---D---", "bars": [["D", "G"], ["D", "G"], ["C", "Am"], ["D"]]},
      {"name": "Instrumental", "repeat": 3, "bars": [["Em", "Am"], ["D", "G"]]},
      {"name": "Chorus", "repeat": 1, "vol": 1.1, "bars": [["D", "G"], ["Em", "Am"], ["D", "G"], ["Em", "Am"], ["D", "G"], ["Em", "Am"], ["D", "G"]]},
      {"name": "Hip hip (again)", "repeat": 1, "vol": 1.15, "fill": "D---D---", "bars": [["D", "G"], ["D", "G"], ["C", "Am"], ["D"]]},
      {"name": "Outro", "repeat": 2, "strum": "D-dUD-dU", "vol": 0.85, "fill": "D-------", "bars": [["Em", "Am"], ["D", "G"]]}
    ]
  },
  {
    "id": "heart-of-gold",
    "title": "Heart of Gold",
    "artist": "Neil Young",
    "chapter": 1,
    "step": 2,
    "level": "easy",
    "key": "Em",
    "capo": 0,
    "bpm": [80, null],
    "strum": "D-dUD-dU",
    "skill": "Two beats per chord",
    "tip": "The verse is Em, C, D, G with two beats on each, so you change twice a bar. The chorus slows down and lets each chord ring longer.",
    "sections": [
      {"name": "Intro", "repeat": 2, "bars": [["Em"], ["D", "Em"]]},
      {"name": "Verse", "repeat": 2, "vol": 0.85, "bars": [["Em", "C"], ["D", "G"], ["Em", "C"], ["D", "G"]]},
      {"name": "Chorus", "repeat": 1, "strum": "D-dU-udU", "vol": 1.05, "fill": "D---D---", "bars": [["Em"], ["G"], ["C"], ["C"], ["Em"], ["G"], ["C"], ["G"]]}
    ]
  },
  {
    "id": "aint-no-sunshine",
    "title": "Ain't No Sunshine",
    "artist": "Bill Withers",
    "chapter": 1,
    "step": 2,
    "level": "easy",
    "key": "Am",
    "capo": 0,
    "bpm": [70, null],
    "strum": "D---D-dU",
    "skill": "Quick Em to G inside a bar",
    "tip": "Am holds for two beats, then Em and G get one beat each. Keep it sparse and soulful. Dm shows up once per verse.",
    "sections": [
      {"name": "Verse", "repeat": 3, "vol": 0.85, "fill": "D-------", "bars": [["Am", "Am", "Em", "G"], ["Am"], ["Am", "Am", "Em", "G"], ["Am"], ["Em"], ["Dm"], ["Am", "Am", "Em", "G"], ["Am"]]}
    ]
  },
  {
    "id": "riptide",
    "title": "Riptide",
    "artist": "Vance Joy",
    "chapter": 1,
    "step": 2,
    "level": "easy",
    "key": "Am",
    "capo": 0,
    "bpm": [80, null],
    "strum": "D-DU-UDU",
    "skill": "Three chords, quick changes",
    "tip": "Am, G, C for the whole song. The record uses capo 1; without a capo it sounds a little lower, which is fine on its own.",
    "sections": [
      {"name": "Verse", "repeat": 3, "vol": 0.85, "bars": [["Am"], ["G"], ["C"], ["C"]]},
      {"name": "Pre-chorus", "repeat": 2, "vol": 0.95, "fill": "D-D-D-D-", "bars": [["Am"], ["G"], ["C"], ["C"]]},
      {"name": "Chorus", "repeat": 3, "strum": "D-DUDUDU", "vol": 1.15, "bars": [["Am"], ["G"], ["C"], ["C"]]}
    ]
  },
  {
    "id": "wild-thing",
    "title": "Wild Thing",
    "artist": "The Troggs",
    "chapter": 1,
    "step": 2,
    "level": "easy",
    "key": "A",
    "capo": 0,
    "bpm": [80, null],
    "strum": "D-D-DUDUD-D-D-D-",
    "skill": "Loud and simple",
    "tip": "A, D, E, D with two beats each, over and over. Big down strums. A good song for fast changes between A, D, and E.",
    "sections": [
      {"name": "Whole song", "repeat": 6, "vol": 1.1, "bars": [["A", "D"], ["E", "D"]]}
    ]
  },
  {
    "id": "twist-and-shout",
    "title": "Twist and Shout",
    "artist": "The Beatles",
    "chapter": 1,
    "step": 2,
    "level": "easy",
    "key": "D",
    "capo": 0,
    "bpm": [90, null],
    "strum": "D-DU-UDUD-DUDUDU",
    "skill": "Party groove on D, G, A",
    "tip": "D and G get two beats each, then A gets a full bar. For the famous build-up, hold A and strum harder each bar.",
    "sections": [
      {"name": "Verse and chorus", "repeat": 6, "vol": 1.05, "bars": [["D", "G"], ["A"]]},
      {"name": "Build-up", "repeat": 1, "strum": "D-D-D-D-", "vol": 1.2, "fill": "D-------", "bars": [["A"], ["A"], ["A"], ["A"]]}
    ]
  },
  {
    "id": "let-it-be",
    "title": "Let It Be",
    "artist": "The Beatles",
    "chapter": 2,
    "step": 1,
    "level": "medium",
    "key": "C",
    "capo": 0,
    "bpm": [60, 72],
    "strum": "D-DUD-DU",
    "barre": {"F": {"easy": ["Fmaj7", "xx3210"], "full": ["mini F", "xx3211"]}},
    "skill": "F without a barre",
    "tip": "Each chord gets two beats, so you change twice in every bar. Start with Fmaj7 for the F, then try mini F once the changes feel smooth.",
    "sections": [
      {"name": "Intro", "repeat": 1, "strum": "D-dUD-dU", "vol": 0.8, "fill": "D---D---", "bars": [["C", "G"], ["Am", "F"], ["C", "G"], ["F", "C"]]},
      {"name": "Verse", "repeat": 2, "strum": "D-dUd-dU", "vol": 0.75, "bars": [["C", "G"], ["Am", "F"], ["C", "G"], ["F", "C"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-DUD-DU", "vol": 1.05, "fill": "D---D---", "bars": [["Am", "G"], ["F", "C"], ["C", "G"], ["F", "C"]]}
    ]
  },
  {
    "id": "have-you-ever-seen-the-rain",
    "title": "Have You Ever Seen the Rain",
    "artist": "Creedence Clearwater Revival",
    "chapter": 2,
    "step": 2,
    "level": "medium",
    "key": "C",
    "capo": 0,
    "bpm": [80, 116],
    "strum": "D-DU-UDU",
    "barre": {"F": {"easy": ["mini F", "xx3211"], "full": ["full F", "133211"]}},
    "skill": "Mini barre to full barre",
    "tip": "Use mini F until the chorus flows. For full F, roll your index finger slightly onto its bony side and keep your elbow close to your body. A buzzing string or two is normal for the first few weeks.",
    "sections": [
      {"name": "Intro", "repeat": 1, "strum": "D-D-D-D-", "bars": [["Am"], ["F"], ["C"], ["G"], ["C"], ["C"]]},
      {"name": "Verse", "repeat": 2, "strum": "D-dU-udU", "vol": 0.85, "bars": [["C"], ["C"], ["C"], ["C"], ["C"], ["G"], ["G"], ["C"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-DUDUDU", "vol": 1.15, "fill": "D-D-D---", "bars": [["F"], ["G"], ["C", "Am"], ["Am"], ["F"], ["G"], ["C"], ["C"]]}
    ]
  },
  {
    "id": "stand-by-me-in-a",
    "title": "Stand By Me (in A)",
    "artist": "Ben E. King",
    "chapter": 2,
    "step": 3,
    "level": "medium",
    "key": "A",
    "capo": 0,
    "bpm": [80, 118],
    "strum": "D-dU-udUD-dUDUdU",
    "barre": {"F#m": {"easy": ["mini F#m", "xx4222"], "full": ["full F#m", "244222"]}},
    "skill": "Your first moved shape",
    "tip": "Same song you know, no capo. F#m is the Em shape slid up two frets with your index finger acting as the capo. Start with the mini version on the top four strings.",
    "sections": [
      {"name": "Whole song", "repeat": 1, "fill": "D---D---", "bars": [["A"], ["A"], ["F#m"], ["F#m"], ["D"], ["E"], ["A"], ["A"]]}
    ]
  },
  {
    "id": "wagon-wheel-in-a",
    "title": "Wagon Wheel (in A)",
    "artist": "Old Crow Medicine Show",
    "chapter": 2,
    "step": 3,
    "level": "medium",
    "key": "A",
    "capo": 0,
    "bpm": [90, 145],
    "strum": "D-dU-udUD-dUDUdU",
    "barre": {"F#m": {"easy": ["mini F#m", "xx4222"], "full": ["full F#m", "244222"]}},
    "skill": "F#m at speed",
    "tip": "Same chords as the capo version, written in their real names. E to F#m is the move to drill: both use the same finger shape, so slide it up and add the barre.",
    "sections": [
      {"name": "Verse and chorus", "repeat": 2, "fill": "D-D-D---", "bars": [["A"], ["E"], ["F#m"], ["D"], ["A"], ["E"], ["D"], ["D"]]}
    ]
  },
  {
    "id": "country-roads",
    "title": "Take Me Home, Country Roads",
    "artist": "John Denver",
    "chapter": 2,
    "step": 4,
    "level": "stretch",
    "key": "A",
    "capo": 0,
    "bpm": [70, 82],
    "strum": "D-DU-UDU",
    "barre": {"F#m": {"easy": ["mini F#m", "xx4222"], "full": ["full F#m", "244222"]}},
    "skill": "Full barre in context",
    "tip": "F#m shows up in both the verse and the chorus. Once you can hold the full barre for a whole bar without buzzing, this song is yours.",
    "sections": [
      {"name": "Verse", "repeat": 2, "strum": "D-dU-udU", "vol": 0.85, "bars": [["A"], ["F#m"], ["E"], ["A"], ["A"], ["F#m"], ["E"], ["D", "A"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-DU-UDUD-DUDUDU", "vol": 1.15, "fill": "D---D-DU", "bars": [["A"], ["E"], ["F#m"], ["D"], ["A"], ["E"], ["D"], ["A"]]}
    ]
  },
  {
    "id": "twelve-bar-blues-in-e",
    "title": "12-Bar Blues in E",
    "artist": "Classic blues form",
    "chapter": 3,
    "step": 1,
    "level": "easy",
    "key": "E",
    "capo": 0,
    "bpm": [70, 110],
    "strum": "D-dUD-dU",
    "swing": true,
    "skill": "The 12-bar form",
    "tip": "Twelve bars, three chords, and it powers thousands of songs. Count the bars out loud until the shape of the form is in your ears: four of E7, two of A7, two of E7, then the turnaround. Blues usually swings: the play-along pushes each up strum a little late, long-short, long-short.",
    "sections": [
      {"name": "12 bars", "repeat": 2, "fill": "D-D-D-DU", "bars": [["E7"], ["E7"], ["E7"], ["E7"], ["A7"], ["A7"], ["E7"], ["E7"], ["B7"], ["A7"], ["E7"], ["B7"]]}
    ]
  },
  {
    "id": "quick-change-blues-in-a",
    "title": "Quick-Change Blues in A",
    "artist": "Classic blues form",
    "chapter": 3,
    "step": 1,
    "level": "easy",
    "key": "A",
    "capo": 0,
    "bpm": [70, 110],
    "strum": "D-dUD-dU",
    "swing": true,
    "skill": "The quick change",
    "tip": "Same 12 bars, but you jump to D7 in bar 2 and come right back. A7 to D7 is a small move: lift and shift, keep it light. Blues usually swings: the play-along pushes each up strum a little late, long-short, long-short.",
    "sections": [
      {"name": "12 bars", "repeat": 2, "fill": "D-D-D-DU", "bars": [["A7"], ["D7"], ["A7"], ["A7"], ["D7"], ["D7"], ["A7"], ["A7"], ["E7"], ["D7"], ["A7"], ["E7"]]}
    ]
  },
  {
    "id": "folsom-prison-blues",
    "title": "Folsom Prison Blues",
    "artist": "Johnny Cash",
    "chapter": 3,
    "step": 2,
    "level": "easy",
    "key": "E",
    "capo": 0,
    "bpm": [90, 110],
    "strum": "D-dUD-dU",
    "skill": "Train-beat strumming",
    "tip": "A real song built on the 12-bar form. Keep the strum steady and chugging like a train. Try hitting just the low string on beat 1 for that boom-chicka sound.",
    "sections": [
      {"name": "Verse", "repeat": 2, "fill": "D-D-D---", "bars": [["E"], ["E"], ["E"], ["E7"], ["A7"], ["A7"], ["E"], ["E"], ["B7"], ["B7"], ["E"], ["E"]]}
    ]
  },
  {
    "id": "knockin-in-a",
    "title": "Knockin' on Heaven's Door (in A)",
    "artist": "Bob Dylan",
    "chapter": 4,
    "step": 1,
    "level": "stretch",
    "key": "A",
    "capo": 0,
    "bpm": [60, 68],
    "strum": "D-d-DUdUD-dUDUdU",
    "barre": {"Bm": {"easy": ["mini Bm", "xx4432"], "full": ["full Bm", "x24432"]}},
    "skill": "A-shape barre: Bm",
    "tip": "A song you already learned, moved up to A so that Am becomes Bm. The mini version skips the barre on the A string. For the full shape, the index finger covers strings 1 to 5 at fret 2.",
    "sections": [
      {"name": "Verse and chorus", "repeat": 2, "fill": "D-------", "bars": [["A"], ["E"], ["Bm"], ["Bm"], ["A"], ["E"], ["D"], ["D"]]}
    ]
  },
  {
    "id": "free-fallin-in-f",
    "title": "Free Fallin' (in F)",
    "artist": "Tom Petty",
    "chapter": 4,
    "step": 2,
    "level": "stretch",
    "key": "F",
    "capo": 0,
    "bpm": [70, 84],
    "strum": "D-dU-udUD-dUDUdU",
    "barre": {"F": {"easy": ["mini F", "xx3211"], "full": ["full F", "133211"]}, "Bb": {"easy": ["mini Bb", "xx3331"], "full": ["full Bb", "x13331"]}},
    "skill": "A-shape barre: Bb",
    "tip": "The famous riff moves fast: F and Bb share the first bar, then Bb, F, and C squeeze into the second. Keep your index finger near fret 1 the whole time. Mini F and mini Bb make it much easier.",
    "sections": [
      {"name": "Riff (verse and chorus)", "repeat": 8, "bars": [["F", "Bb"], ["Bb", "F", "C"]]}
    ]
  },
  {
    "id": "im-yours-in-b",
    "title": "I'm Yours (in B)",
    "artist": "Jason Mraz",
    "chapter": 4,
    "step": 3,
    "level": "stretch",
    "key": "B",
    "capo": 0,
    "bpm": [60, 76],
    "strum": "D-dU-udUD-dUDUdU",
    "barre": {"B": {"easy": ["B7", "x21202"], "full": ["full B", "x24442"]}, "F#": {"easy": ["mini F#", "xx4322"], "full": ["full F#", "244322"]}, "G#m": {"easy": ["mini G#m", "xx6444"], "full": ["full G#m", "466444"]}},
    "skill": "All barres, one song",
    "tip": "The same four-chord loop as the capo 4 version, now with every shape barred. This is the graduation song. Practice the easier shapes until the loop is smooth, then trade them in one at a time.",
    "sections": [
      {"name": "Whole song", "repeat": 4, "bars": [["B"], ["F#"], ["G#m"], ["E"]]}
    ]
  },
  {
    "id": "chuck-drill",
    "title": "Chuck Drill",
    "artist": "Technique exercise",
    "chapter": 5,
    "step": 1,
    "level": "easy",
    "key": "G",
    "capo": 0,
    "bpm": [60, 90],
    "strum": "D-X-D-X-D-X-D-XU",
    "skill": "Your first chucks",
    "tip": "Strum down on 1 and 3. On 2 and 4, strum down while the fleshy side of your strumming hand lands on the strings at the same time, so you get a click instead of a chord. Keep the fretting hand holding the chord the whole time.",
    "sections": [
      {"name": "Drill", "repeat": 2, "bars": [["G"], ["G"], ["C"], ["C"], ["D"], ["D"], ["G"], ["G"]]}
    ]
  },
  {
    "id": "stand-by-me-chucks",
    "title": "Stand By Me (with chucks)",
    "artist": "Ben E. King",
    "chapter": 5,
    "step": 1,
    "level": "medium",
    "key": "A",
    "capo": 2,
    "bpm": [70, 118],
    "strum": "D-XU-uXUD-XUdUXU",
    "skill": "Chucks in a full pattern",
    "tip": "This is Old Faithful with the down strums on 2 and 4 swapped for chucks, like a snare drum. Go slow: the up strum right after each chuck is the tricky part.",
    "sections": [
      {"name": "Whole song", "repeat": 1, "fill": "D-X-D---", "bars": [["G"], ["G"], ["Em"], ["Em"], ["C"], ["D"], ["G"], ["G"]]}
    ]
  },
  {
    "id": "im-yours-chucks",
    "title": "I'm Yours (capo 4)",
    "artist": "Jason Mraz",
    "chapter": 5,
    "step": 1,
    "level": "medium",
    "key": "B",
    "capo": 4,
    "bpm": [60, 76],
    "strum": "D-XU-uXUD-XU-uXU",
    "skill": "The classic chuck song",
    "tip": "The famous chunky sound in this song comes from chucks on 2 and 4. Four open chords with the capo on, so all your attention can go to the strumming hand.",
    "sections": [
      {"name": "Whole song", "repeat": 4, "fill": "D-X-D-X-", "bars": [["G"], ["D"], ["Em"], ["C"]]}
    ]
  },
  {
    "id": "ring-of-fire",
    "title": "Ring of Fire",
    "artist": "Johnny Cash",
    "chapter": 5,
    "step": 2,
    "level": "medium",
    "key": "G",
    "capo": 0,
    "bpm": [80, 104],
    "strum": "B-D-B-D-B-D-B-DU",
    "skill": "Boom-chick bass strum",
    "tip": "Pick only the lowest note of the chord on 1 and 3, then strum the rest of the chord on 2 and 4: boom, chick, boom, chick. Once that is steady, try alternating the bass note between two strings.",
    "sections": [
      {"name": "Verse", "repeat": 2, "bars": [["G"], ["C"], ["G"], ["G"], ["G"], ["D"], ["G"], ["G"]]},
      {"name": "Chorus", "repeat": 1, "vol": 1.1, "fill": "B-D-B-D-", "bars": [["D"], ["C"], ["G"], ["G"], ["D"], ["C"], ["G"], ["G"]]}
    ]
  },
  {
    "id": "folsom-boom-chick",
    "title": "Folsom Prison Blues (boom-chick)",
    "artist": "Johnny Cash",
    "chapter": 5,
    "step": 2,
    "level": "medium",
    "key": "E",
    "capo": 0,
    "bpm": [90, 110],
    "strum": "B-D-B-DUB-D-B-D-",
    "skill": "Boom-chick on a song you know",
    "tip": "Same 12 bars from Chapter 3, now with the bass-and-strum feel. On E, the bass note is the open low E string. On A7 and B7 it is the A string.",
    "sections": [
      {"name": "Verse", "repeat": 2, "bars": [["E"], ["E"], ["E"], ["E7"], ["A7"], ["A7"], ["E"], ["E"], ["B7"], ["B7"], ["E"], ["E"]]}
    ]
  },
  {
    "id": "power-chord-rock",
    "title": "Power Chord Rock in E",
    "artist": "Technique exercise",
    "chapter": 5,
    "step": 3,
    "level": "easy",
    "key": "E",
    "capo": 0,
    "bpm": [80, 130],
    "strum": "DdDdDdDd",
    "pm": true,
    "skill": "Palm muting and power chords",
    "tip": "Power chords are just two or three strings, so they are quick to grab. Rest the edge of your strumming palm on the strings right where they meet the bridge, then use all down strums. Too far forward and the notes die; too far back and they ring.",
    "sections": [
      {"name": "Riff", "repeat": 2, "fill": "D-D-D-D-", "bars": [["E5"], ["E5"], ["G5"], ["A5"], ["E5"], ["E5"], ["D5"], ["A5"]]}
    ]
  },
  {
    "id": "zombie-dynamics",
    "title": "Zombie (muted verse)",
    "artist": "The Cranberries",
    "chapter": 5,
    "step": 3,
    "level": "easy",
    "key": "Em",
    "capo": 0,
    "bpm": [70, 84],
    "strum": "D-D-DUDU",
    "skill": "Muted verse, open chorus",
    "tip": "Palm mute the verse to keep it tight and quiet, then lift your hand off for the chorus so the chords ring out. That contrast is a big part of how the song builds.",
    "sections": [
      {"name": "Verse (palm muted)", "repeat": 2, "pm": true, "strum": "DdDdDdDd", "vol": 0.75, "bars": [["Em"], ["C"], ["G"], ["D"]]},
      {"name": "Chorus (let it ring)", "repeat": 2, "strum": "D-DUDUDU", "vol": 1.2, "fill": "D-D-D-D-", "bars": [["Em"], ["C"], ["G"], ["D"]]}
    ]
  },
  {
    "id": "stay-blackpink",
    "title": "Stay",
    "artist": "BLACKPINK",
    "chapter": 6,
    "step": 1,
    "level": "easy",
    "key": "A#m",
    "capo": 1,
    "bpm": [70, null],
    "strum": "D-dU-udU",
    "barre": {"F": {"easy": ["Fmaj7", "xx3210"], "full": ["mini F", "xx3211"]}},
    "skill": "Am to F, slow and pretty",
    "tip": "Their acoustic ballad, and the gentlest song in this chapter. Am, F, and C carry most of it. Start with Fmaj7 for the F, then try mini F once the changes feel smooth.",
    "sections": [
      {"name": "Verse", "repeat": 2, "strum": "D---D-dU", "vol": 0.65, "bars": [["Am"], ["F"], ["C"], ["C"]]},
      {"name": "Pre-chorus", "repeat": 1, "strum": "D-dU-udU", "vol": 0.85, "fill": "D-------", "bars": [["Am"], ["G"], ["F"], ["F"], ["Am"], ["G"], ["F"], ["F"], ["Dm"], ["Dm"], ["G"], ["G"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-DU-UDU", "vol": 1.05, "fill": "D---D---", "bars": [["Am"], ["F"], ["C"], ["G"]]}
    ]
  },
  {
    "id": "playing-with-fire",
    "title": "Playing With Fire",
    "artist": "BLACKPINK",
    "chapter": 6,
    "step": 1,
    "level": "easy",
    "key": "Em shapes",
    "capo": 0,
    "bpm": [70, null],
    "strum": "D-XU-uXUD-XUdUXU",
    "skill": "Chucks on a pop song",
    "tip": "The intro, chorus, and rap verse all loop Em, G, C, D, chords you already own. Use the chuck strum from Chapter 5 to get a punchy pop feel. The original recording may sit in a different key, so slide a capo up until it matches if you play along to it.",
    "sections": [
      {"name": "Intro, chorus, and rap verse", "repeat": 4, "bars": [["Em"], ["G"], ["C"], ["D"]]}
    ]
  },
  {
    "id": "forever-young-acoustic",
    "title": "Forever Young (acoustic)",
    "artist": "BLACKPINK",
    "chapter": 6,
    "step": 1,
    "level": "easy",
    "key": "E",
    "capo": 4,
    "bpm": [70, null],
    "strum": "D-dU-udU",
    "barre": {"F": {"easy": ["Fmaj7", "xx3210"], "full": ["mini F", "xx3211"]}},
    "skill": "Big pop chorus on four chords",
    "tip": "The verse loops C, Em, F, G, and the chorus is just Am and C. Use Fmaj7 for every F. Keep the verse light, push harder through the pre-chorus, then let the chorus ring out.",
    "sections": [
      {"name": "Intro", "repeat": 1, "bars": [["C"], ["Em"], ["F"], ["G"], ["C"], ["Em"], ["F"], ["G"]]},
      {"name": "Verse", "repeat": 4, "strum": "D---D-dU", "vol": 0.7, "bars": [["C"], ["Em"], ["F"], ["G"]]},
      {"name": "Pre-chorus", "repeat": 1, "strum": "D-D-D-DU", "vol": 0.95, "fill": "D-D-D-D-", "bars": [["F"], ["C"], ["F"], ["C"], ["F"], ["C"], ["F"], ["G"]]},
      {"name": "Chorus", "repeat": 4, "strum": "D-DUDUDU", "vol": 1.15, "bars": [["Am"], ["Am"], ["C"], ["C"]]}
    ]
  },
  {
    "id": "lovesick-girls",
    "title": "Lovesick Girls",
    "artist": "BLACKPINK",
    "chapter": 6,
    "step": 2,
    "level": "medium",
    "key": "D#m",
    "capo": 4,
    "bpm": [80, 128],
    "strum": "D-D-DUDU",
    "barre": {"Bm": {"easy": ["mini Bm", "xx4432"], "full": ["full Bm", "x24432"]}},
    "skill": "Bm at pop speed",
    "tip": "Upbeat and driving, with Bm in every section. Learn it slow with mini Bm. The record is fast, so build up the tempo a few bpm at a time.",
    "sections": [
      {"name": "Verse", "repeat": 2, "strum": "D-dUd-dU", "vol": 0.85, "bars": [["Bm"], ["D"], ["G"], ["A"]]},
      {"name": "Pre-chorus", "repeat": 2, "strum": "D-DUDUDU", "vol": 1, "bars": [["G"], ["A"], ["Bm"], ["D"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-DUDUDUD-DUDUDU", "vol": 1.2, "fill": "D-D-D-D-", "bars": [["Bm"], ["A"], ["D"], ["G"]]}
    ]
  },
  {
    "id": "hope-not",
    "title": "Hope Not",
    "artist": "BLACKPINK",
    "chapter": 6,
    "step": 3,
    "level": "stretch",
    "key": "G",
    "capo": 0,
    "bpm": [60, null],
    "strum": "D-dU-udU",
    "barre": {"Bm": {"easy": ["mini Bm", "xx4432"], "full": ["full Bm", "x24432"]}, "Cm": {"easy": ["mini Cm", "xx5543"], "full": ["full Cm", "x35543"]}},
    "skill": "Ballad with Bm and Cm",
    "tip": "The verse is all open chords: G, D, and Em. The pre-chorus and chorus add Bm and the moody Cm. If those feel like too much, loop just the verse until the rest is ready.",
    "sections": [
      {"name": "Verse", "repeat": 2, "strum": "D---D-dU", "vol": 0.7, "bars": [["G"], ["D", "Em"], ["G"], ["D", "Em"]]},
      {"name": "Pre-chorus", "repeat": 1, "strum": "D-dU-udU", "vol": 0.9, "fill": "D-------", "bars": [["Bm", "C"], ["Bm", "C"], ["Bm", "C"], ["Cm"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-DU-UDU", "vol": 1.05, "fill": "D-------", "bars": [["G", "D"], ["Am"], ["G", "D"], ["Am"], ["Cm"]]}
    ]
  },
  {
    "id": "jingle-bells",
    "title": "Jingle Bells",
    "artist": "Traditional",
    "chapter": 7,
    "step": 1,
    "level": "easy",
    "key": "G",
    "capo": 0,
    "bpm": [90, null],
    "strum": "D-dUD-dUD-dUDUdU",
    "skill": "Holiday warm-up",
    "tip": "Starts with the verse, then the chorus. The verse moves G, C, D, G two bars at a time. In the chorus, G holds for four bars, so relax and keep the strum bouncy. A7 to D7 near the end is the only quick change.",
    "sections": [
      {"name": "Verse", "repeat": 2, "strum": "D-dUD-dU", "vol": 0.9, "bars": [["G"], ["G"], ["C"], ["C"], ["D"], ["D"], ["G"], ["G"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-dUD-dUD-dUDUdU", "vol": 1.1, "fill": "D-D-D---", "bars": [["G"], ["G"], ["G"], ["G"], ["C"], ["G"], ["A7"], ["D7"], ["G"], ["G"], ["G"], ["G"], ["C"], ["G"], ["D"], ["G"]]}
    ]
  },
  {
    "id": "last-christmas",
    "title": "Last Christmas",
    "artist": "Wham!",
    "chapter": 7,
    "step": 1,
    "level": "easy",
    "key": "F",
    "capo": 5,
    "bpm": [80, 108],
    "strum": "D-dU-udUD-dUDUdU",
    "skill": "Four-chord loop with Dm",
    "tip": "The same four chords loop through the whole song. With the capo on fret 5, every shape is open, and Dm is the only new one.",
    "sections": [
      {"name": "Whole song", "repeat": 4, "bars": [["C"], ["Am"], ["Dm"], ["G"]]}
    ]
  },
  {
    "id": "feliz-navidad",
    "title": "Feliz Navidad",
    "artist": "José Feliciano",
    "chapter": 7,
    "step": 1,
    "level": "easy",
    "key": "D",
    "capo": 7,
    "bpm": [90, 148],
    "strum": "D-DU-uDUD-DUdUDU",
    "skill": "Party strum, open chords",
    "tip": "With the capo on fret 7, C, D, G, and Em sound in the same key as the record, so there is no barre chord. C and D share a bar, then G gets a full bar. It moves quickly, so get it clean slowly first.",
    "sections": [
      {"name": "Chorus", "repeat": 2, "strum": "D-DU-uDU", "vol": 1.05, "bars": [["C", "D"], ["G"], ["C", "D"], ["G"], ["C", "D"], ["G", "Em"], ["C", "D"], ["G"]]},
      {"name": "Verse", "repeat": 2, "strum": "D-dU-udU", "vol": 0.95, "fill": "D-D-D---", "bars": [["C", "D"], ["G", "Em"], ["C", "D"], ["G"]]}
    ]
  },
  {
    "id": "rudolph",
    "title": "Rudolph the Red-Nosed Reindeer",
    "artist": "Holiday classic",
    "chapter": 7,
    "step": 1,
    "level": "easy",
    "key": "G",
    "capo": 0,
    "bpm": [80, null],
    "strum": "D-dUD-dU",
    "skill": "Long stretches on one chord",
    "tip": "Each verse line sits on G or D7 for several bars, so the changes are slow. Play D instead of D7 if it feels easier. The middle section brings in C, Em, and A7.",
    "sections": [
      {"name": "Verse", "repeat": 2, "fill": "D-D-D---", "bars": [["G"], ["G"], ["G"], ["D7"], ["D7"], ["D7"], ["D7"], ["G"]]},
      {"name": "Middle", "repeat": 1, "strum": "D-dU-udU", "vol": 1.05, "fill": "D---D---", "bars": [["C"], ["G"], ["D7"], ["G"], ["D"], ["D"], ["Em", "A7"], ["D7"]]},
      {"name": "Last verse", "repeat": 1, "fill": "D-D-D-D-", "bars": [["G"], ["G"], ["G"], ["D7"], ["D7"], ["D7"], ["D7"], ["G"]]}
    ]
  },
  {
    "id": "frosty",
    "title": "Frosty the Snowman",
    "artist": "Holiday classic",
    "chapter": 7,
    "step": 1,
    "level": "easy",
    "key": "G",
    "capo": 0,
    "bpm": [90, null],
    "strum": "D-dUD-dU",
    "barre": {"Bm": {"easy": ["D instead", "xx0232"], "full": ["mini Bm", "xx4432"]}},
    "skill": "Bouncy holiday strum",
    "tip": "Mostly G, C, and D. The middle section has a Bm; the easier setting plays D there instead, which also sounds fine.",
    "sections": [
      {"name": "Verse", "repeat": 2, "fill": "D-D-D---", "bars": [["G"], ["G"], ["C"], ["G"], ["C"], ["G"], ["D"], ["G"]]},
      {"name": "Middle", "repeat": 1, "strum": "D-dU-udU", "vol": 0.95, "bars": [["C", "Bm"], ["Am", "D"], ["G"], ["G"], ["D"], ["D"], ["A"], ["D"]]},
      {"name": "Ending", "repeat": 1, "strum": "D-D-D-D-", "vol": 1.05, "fill": "D-------", "bars": [["G"], ["G"], ["G"], ["D"], ["D"], ["D"], ["D"], ["G"]]}
    ]
  },
  {
    "id": "iris",
    "title": "Iris (standard tuning)",
    "artist": "Goo Goo Dolls",
    "chapter": 8,
    "step": 1,
    "level": "easy",
    "key": "Bm",
    "capo": 0,
    "bpm": [70, null],
    "strum": "D-dU-dU-",
    "swing": true,
    "skill": "Big chorus, simple shapes",
    "tip": "Played in standard tuning here; the record uses an unusual tuning. The song has a rolling, swung feel (12/8), which the play-along imitates by pushing the up strums late. The verse is gentle, one strum per chord is fine; the chorus gets loud. Bm7 (x20202) has no barre.",
    "sections": [
      {"name": "Verse", "repeat": 2, "strum": "D---D---", "vol": 0.75, "bars": [["D"], ["Em7"], ["G"], ["G"], ["Bm7"], ["Asus4"], ["G"], ["G"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-dUdUdU", "vol": 1.15, "fill": "D-D-D-D-", "bars": [["Bm7"], ["Asus4"], ["G"], ["G"], ["Bm7"], ["Asus4"], ["G"], ["G"]]}
    ]
  },
  {
    "id": "slide",
    "title": "Slide (standard tuning)",
    "artist": "Goo Goo Dolls",
    "chapter": 8,
    "step": 1,
    "level": "easy",
    "key": "Ab",
    "capo": 1,
    "bpm": [80, null],
    "strum": "D-dU-udU",
    "skill": "Anchor fingers, like Wonderwall",
    "tip": "A standard-tuning version of a song recorded in an alternate tuning. Your ring and pinky stay on fret 3 of the top two strings for almost every chord, so only your first two fingers move. Same trick as Wonderwall.",
    "sections": [
      {"name": "Verse", "repeat": 2, "vol": 0.8, "bars": [["Em7"], ["Dsus2"], ["Cadd9"], ["Cadd9"], ["Em7"], ["Dsus4"], ["Cadd9"], ["Cadd9"]]},
      {"name": "Pre-chorus", "repeat": 1, "strum": "D-DU-UDU", "vol": 0.95, "fill": "D-D-D-D-", "bars": [["Em7"], ["Dsus2"], ["Cadd9"], ["G"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-DUDUDU", "vol": 1.15, "fill": "D-D-D---", "bars": [["Cadd9"], ["G"], ["Cadd9"], ["G"], ["Cadd9"], ["G"], ["Dsus2"], ["Dsus2"]]}
    ]
  },
  {
    "id": "name",
    "title": "Name (standard tuning)",
    "artist": "Goo Goo Dolls",
    "chapter": 8,
    "step": 1,
    "level": "easy",
    "key": "A",
    "capo": 2,
    "bpm": [70, null],
    "strum": "D-dU-udU",
    "skill": "Slash chords with anchor fingers",
    "tip": "Another standard-tuning version. Every shape keeps fret 3 on the top two strings. Dsus4/F# puts your thumb or middle finger on the low E string at fret 2; Dsus4/A just plays the open A string underneath.",
    "sections": [
      {"name": "Verse", "repeat": 2, "strum": "D---D-dU", "vol": 0.75, "bars": [["G"], ["Dsus4/F#"], ["Cadd9"], ["Em7"], ["Dsus4/A"], ["Cadd9"], ["Cadd9"], ["Cadd9"]]},
      {"name": "Chorus", "repeat": 2, "vol": 1.05, "fill": "D-------", "bars": [["Em7"], ["Dsus4/A"], ["Cadd9"], ["Cadd9"]]}
    ]
  },
  {
    "id": "birds-of-a-feather",
    "title": "Birds of a Feather",
    "artist": "Billie Eilish",
    "chapter": 9,
    "step": 1,
    "level": "easy",
    "key": "D",
    "capo": 2,
    "bpm": [80, 105],
    "strum": "D-dU-udU",
    "skill": "One loop, three moods",
    "tip": "C, Am, Dm, G the whole way through. The sections only change how you strum: light in the verse, building in the pre-chorus, full in the chorus.",
    "sections": [
      {"name": "Verse", "repeat": 2, "strum": "D---D-dU", "vol": 0.7, "bars": [["C"], ["Am"], ["Dm"], ["G"]]},
      {"name": "Pre-chorus", "repeat": 1, "vol": 0.9, "fill": "D-D-D-D-", "bars": [["C"], ["Am"], ["Dm"], ["G"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-DU-UDUD-DUDUDU", "vol": 1.1, "bars": [["C"], ["Am"], ["Dm"], ["G"]]}
    ]
  },
  {
    "id": "someone-you-loved",
    "title": "Someone You Loved",
    "artist": "Lewis Capaldi",
    "chapter": 9,
    "step": 1,
    "level": "easy",
    "key": "Db",
    "capo": 1,
    "bpm": [70, 110],
    "strum": "D-dU-udU",
    "barre": {"F": {"easy": ["Fmaj7", "xx3210"], "full": ["mini F", "xx3211"]}},
    "skill": "Piano ballad on guitar",
    "tip": "C, G, Am, F loops through the verse and chorus. Use Fmaj7 for the F. The bridge is the only change: Dm, Am, G, Am, then back to the loop.",
    "sections": [
      {"name": "Verse", "repeat": 2, "strum": "D---D-dU", "vol": 0.7, "bars": [["C"], ["G"], ["Am"], ["F"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-DU-UDU", "vol": 1.1, "fill": "D---D---", "bars": [["C"], ["G"], ["Am"], ["F"]]},
      {"name": "Bridge", "repeat": 1, "vol": 0.9, "bars": [["Dm"], ["Am"], ["G"], ["Am"], ["C"], ["G"], ["Am"], ["F"]]}
    ]
  },
  {
    "id": "watermelon-sugar",
    "title": "Watermelon Sugar",
    "artist": "Harry Styles",
    "chapter": 9,
    "step": 1,
    "level": "easy",
    "key": "Dm",
    "capo": 0,
    "bpm": [80, null],
    "strum": "D-dU-udUD-dU-uDU",
    "skill": "Funky four-chord groove",
    "tip": "Dm, Am, C, G for the whole song. Keep the light strums really light and the full ones punchy; that bounce is the whole feel. If it does not line up with the record, slide a capo up until it matches.",
    "sections": [
      {"name": "Verse", "repeat": 2, "vol": 0.85, "bars": [["Dm"], ["Am"], ["C"], ["G"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-DUDUDU", "vol": 1.15, "fill": "D-D-D-D-", "bars": [["Dm"], ["Am"], ["C"], ["G"]]}
    ]
  },
  {
    "id": "too-sweet",
    "title": "Too Sweet",
    "artist": "Hozier",
    "chapter": 9,
    "step": 2,
    "level": "medium",
    "key": "Gm",
    "capo": 3,
    "bpm": [80, null],
    "strum": "D-dU-udU",
    "skill": "Minor groove with B7",
    "tip": "Em, C, G, and D, plus B7 from the blues chapter. B7 to Em is the move to drill; try it in the Chord changes tab.",
    "sections": [
      {"name": "Intro", "repeat": 1, "bars": [["Em"], ["G"], ["C"], ["D", "B7"]]},
      {"name": "Verse", "repeat": 2, "vol": 0.85, "bars": [["Em"], ["D"], ["B7"], ["Em"], ["G"], ["C"], ["D"], ["B7"]]},
      {"name": "Chorus", "repeat": 2, "strum": "D-DUDUDU", "vol": 1.15, "fill": "D-D-D-D-", "bars": [["Em"], ["B7"], ["C"], ["G"], ["Em"], ["B7"], ["C"], ["G"]]}
    ]
  }
];
