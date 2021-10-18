## [@jasonfleischer/fretboard](https://www.npmjs.com/package/@jasonfleischer/fretboard)

A package for displaying notes, chords and scales on a guitar fretboard view. Click [HERE](https://jasonfleischer.github.io/npm-fretboard-demo/) to see a demo

![Screenshot](https://jasonfleischer.github.io/npm-fretboard-demo/screenshot/screen.png "Screenshot")

#### Installation
```bash
$ npm i @jasonfleischer/fretboard
```

#### Usage
``` html
<div id="your_fretboard_id"></div>
```

``` javascript
const fretboardKit = require("@jasonfleischer/fretboard");
const musicKit = require("@jasonfleischer/music-model-kit");
musicKit.init();

const fretboardView = fretboardKit({
	id: 'your_fretboard_id',
	width: 1000,
	onClick: function(note, isOn) {
		if(isOn) {
			fretboardView.drawNote(note);
		} else {
			fretboardView.clearNote(note);
		}
	},
	hover: true,
	showLabels: true,
	darkMode: false
});

// draw a note
let midiValue = 45; // A2
let note = musicKit.all_notes[midiValue];
fretboardView.drawNote(note);

// draw a chord
let midiValue = 60 // C4 = middle C
let note = musicKit.all_notes[midiValue];
let chord = new musicKit.Chord(note, musicKit.Chord.TYPE.minor);
fretboardView.drawChord(chord);

// draw a scale
let midiValue = 62 // D4
let note = musicKit.all_notes[midiValue];
let scale = new musicKit.Scale(note, musicKit.Scale.TYPE.Aeolian); // Dm scale
fretboardView.drawScale(scale);

// clear all drawings
fretboardView.clear();

// add a midi listener
new musicKit.MidiListener(
	function (midiValue, channel, velocity) { // note on
		let note = musicKit.all_notes[midiValue];
		fretboardView.drawNote(note);
	},
	function (midiValue, channel, velocity) { // note off
		let note = musicKit.all_notes[midiValue];
		fretboardView.clearNote(note);
	});

```

Click [here](https://jasonfleischer.github.io/npm-piano-demo/screenshot/notes.jpg) for midi note references 

#### Sample Projects

- [Demo](https://jasonfleischer.github.io/npm-fretboard-demo/)
- [Ear Trainer](https://jasonfleischer.github.io/eartrainer/)
