const TWO_PI = 2 * Math.PI;
const musicKit = require("@jasonfleischer/music-model-kit");
const Line = require("./line.js");
const Point = require("./point.js");
const Polygon = require("./polygon.js");

class FretboardView {
	constructor(id = "fretboard_view_id", width = 1000, onClick, hover = false) {
		
		this.id = id;
		this.hover = hover;
		this.WIDTH = 1000;
		this.HEIGHT = 230;
		this.note_positions = [];
		this.noteValueToNotePositionsDict = {};
		this.root_view = document.getElementById(this.id);

		this,buildCanvases();
		this.draw_background();
		this.resize(width);

		if(onClick !== undefined) {
			this.addClickEventListeners(onClick);
		}
		if(this.hover) {
			this.addHoverEventListeners();
		}
	}

	buildCanvases() {
		this.canvas = document.getElementById("fretboard_canvas_" + this.id);
		canvas.width=this.WIDTH;
		canvas.height=this.HEIGHT;

		this.canvas_background = document.getElementById("fretboard_background_canvas_" + this.id);
		canvas_background.width=this.WIDTH;
		canvas_background.height=this.HEIGHT;
	}

	resize(newWidth){
		var newWidth = Math.min(newWidth, 1000);
		var newHeight = newWidth * (230/1000);
		this.root_view .style.height = newHeight + "px";
		this.canvas_background.style.height = newHeight + "px";
		this.canvas.style.height = newHeight + "px";

		this.root_view .style.width = newWidth + "px";
		this.canvas_background.style.width = newWidth + "px";
		this.canvas.style.width = newWidth + "px";
	}

	draw_background(){

		let canvas = this.canvas_background;
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

		var topMargin = Math.round(this.HEIGHT * 0.08);
		var bottomMargin = Math.round(this.HEIGHT * 0.15)

		var leftMargin = Math.round(this.WIDTH *0.037);
		var rightMargin = Math.round(this.WIDTH *0.010);;

		//rect

		var color = "#000";

		ctx.beginPath();
		ctx.lineWidth = 6;
		ctx.strokeStyle = color;
		ctx.rect(leftMargin, topMargin, this.WIDTH-(rightMargin+leftMargin), this.HEIGHT-(bottomMargin+topMargin));
		ctx.stroke();

		//draw frets

		const number_of_frets = 20;
		ctx.lineWidth = 3;

		ctx.strokeStyle = "#999";
		var i;

		var k = 21;
		var prev_buffer = 0;
		for (i=1; i<=number_of_frets; i++){

			ctx.beginPath();

			var buffer =  Math.round(k + prev_buffer );
			

			if(i<12)
				k = k -3;

			var x = Math.round(i * ((this.WIDTH-(rightMargin+leftMargin)) / (number_of_frets)) + buffer);
			ctx.moveTo(x+leftMargin, topMargin);
			ctx.lineTo(x+leftMargin, this.HEIGHT-(bottomMargin));
			ctx.stroke();

			prev_buffer = buffer;
		}

		// setup
		radius = this.HEIGHT * 0.06;

		var note_x_positions = [(radius+2), (this.WIDTH - (leftMargin + rightMargin)) * 0.078, 
											(this.WIDTH - (leftMargin + rightMargin)) * 0.146,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.214, // 3
											(this.WIDTH - (leftMargin + rightMargin)) * 0.278,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.337, // 5
											(this.WIDTH - (leftMargin + rightMargin)) * 0.396,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.451, // 7
											(this.WIDTH - (leftMargin + rightMargin)) * 0.502,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.550, // 9
											(this.WIDTH - (leftMargin + rightMargin)) * 0.596,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.638,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.677, // 12
											(this.WIDTH - (leftMargin + rightMargin)) * 0.714,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.751,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.789, // 15
											(this.WIDTH - (leftMargin + rightMargin)) * 0.826,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.864, // 17
											(this.WIDTH - (leftMargin + rightMargin)) * 0.901,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.9385,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.976]

		var high_e_string_y_position = topMargin;
		var b_string_y_position = ((this.HEIGHT - (topMargin + bottomMargin)) * 0.20) + topMargin;
		var g_string_y_position = ((this.HEIGHT - (topMargin + bottomMargin)) * 0.40) + topMargin;
		var d_string_y_position = ((this.HEIGHT - (topMargin + bottomMargin)) * 0.60) + topMargin;
		var a_string_y_position = ((this.HEIGHT - (topMargin + bottomMargin)) * 0.80) + topMargin;
		var e_string_y_position = ((this.HEIGHT - (topMargin + bottomMargin)) * 1.00) + topMargin;
		var note_y_positions = [high_e_string_y_position, b_string_y_position, g_string_y_position, d_string_y_position, a_string_y_position, e_string_y_position];
		

		// draw fret markers

		var diameter = this.HEIGHT * 0.02;
		var marker_color = "#ccc";
		function draw_single_dot_fret_markers(fret){
			ctx.beginPath();
			ctx.fillStyle = marker_color;
			ctx.lineWidth = 0;
			ctx.arc(note_x_positions[fret], (g_string_y_position + d_string_y_position) / 2, diameter, 0, TWO_PI);
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = marker_color;
			ctx.lineWidth = 0;
			ctx.arc(note_x_positions[fret], this.HEIGHT - (bottomMargin * .25), diameter, 0, TWO_PI);
			ctx.fill();

		}
		draw_single_dot_fret_markers(3);
		draw_single_dot_fret_markers(5);
		draw_single_dot_fret_markers(7);
		draw_single_dot_fret_markers(9);
		draw_single_dot_fret_markers(15);
		draw_single_dot_fret_markers(17);

		function draw_double_dot_fret_markers(fret){
			ctx.beginPath();
			ctx.fillStyle = marker_color;
			ctx.lineWidth = 0;
			ctx.arc(note_x_positions[fret], (d_string_y_position + a_string_y_position) / 2, diameter, 0, TWO_PI);
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = marker_color;
			ctx.lineWidth = 0;
			ctx.arc(note_x_positions[fret], (g_string_y_position + b_string_y_position) / 2, diameter, 0, TWO_PI);
			ctx.fill();

			var seperation = this.WIDTH * 0.008;
			ctx.beginPath();
			ctx.fillStyle = marker_color;
			ctx.lineWidth = 0;
			ctx.arc(note_x_positions[fret] - seperation, this.HEIGHT - (bottomMargin * .25), diameter, 0, TWO_PI);
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = marker_color;
			ctx.lineWidth = 0;
			ctx.arc(note_x_positions[fret] + seperation, this.HEIGHT - (bottomMargin * .25), diameter, 0, TWO_PI);
			ctx.fill();
		}
		
		draw_double_dot_fret_markers(12);



		// draw strings

		const number_of_string = 6;
		var j;

		ctx.strokeStyle = "#555";
		ctx.lineWidth = 1;

		for (j=0; j<number_of_string; j++){

			ctx.beginPath();
			ctx.lineWidth = j*1.2;;

			var y = j * ( (this.HEIGHT-(bottomMargin+topMargin)) / (number_of_string-1));
			ctx.moveTo(leftMargin, y+topMargin);
			ctx.lineTo(this.WIDTH, y+topMargin);
			ctx.stroke();
		}

		// nut

		ctx.beginPath();
		ctx.lineWidth = 6;
		ctx.strokeStyle = "#000";
		ctx.rect(leftMargin, topMargin, 3, this.HEIGHT-(bottomMargin+topMargin));
		ctx.stroke();

		// draw notes


		var note_positions = [];
		var i;
		for(i =0 ; i< note_y_positions.length; i++){
			var j;
			for(j =0; j <note_x_positions.length; j++){

				/*ctx.beginPath();
				ctx.fillStyle = "#fff";
				ctx.strokeStyle = "#000";
				ctx.lineWidth = 1;
				ctx.arc(note_x_positions[j], note_y_positions[i], radius, 0, TWO_PI);
				ctx.fill();
				ctx.stroke();*/
				note_positions.push([note_x_positions[j], note_y_positions[i]]);
			}
		}
		this.note_positions = note_positions


		// 40 -  E2 to  84 - C6

		this.noteValueToNotePositionsDict = {

			40 : [ note_positions[105] ], // E2
			41 : [ note_positions[106] ], // F
			42 : [ note_positions[107] ],
			43 : [ note_positions[108] ], // G
			44 : [ note_positions[109] ], 
			45 : [ note_positions[110], note_positions[84]], // A2
			46 : [ note_positions[111], note_positions[85]], 
			47 : [ note_positions[112], note_positions[86]], // B
			48 : [ note_positions[113], note_positions[87]], // C
			49 : [ note_positions[114], note_positions[88]],
			50 : [ note_positions[115], note_positions[89], note_positions[63]], // D3
			51 : [ note_positions[116], note_positions[90], note_positions[64]],
			52 : [ note_positions[117], note_positions[91], note_positions[65]], // E
			53 : [ note_positions[118], note_positions[92], note_positions[66]], // F
			54 : [ note_positions[119], note_positions[93], note_positions[67]],
			55 : [ note_positions[120], note_positions[94], note_positions[68], note_positions[42]], // G3
			56 : [ note_positions[121], note_positions[95], note_positions[69], note_positions[43]],
			57 : [ note_positions[122], note_positions[96], note_positions[70], note_positions[44]], // A
			58 : [ note_positions[123], note_positions[97], note_positions[71], note_positions[45]],
			59 : [ note_positions[124], note_positions[98], note_positions[72], note_positions[46], note_positions[21]], // B3
			60 : [ note_positions[125], note_positions[99], note_positions[73], note_positions[47], note_positions[22]], // C
			61 : [ 						note_positions[100], note_positions[74],note_positions[48], note_positions[23]],
			62 : [ 						note_positions[101], note_positions[75],note_positions[49], note_positions[24]], // D
			63 : [ 						note_positions[102], note_positions[76],note_positions[50], note_positions[25]],
			64 : [ 						note_positions[103], note_positions[77],note_positions[51], note_positions[26], note_positions[0]], // E4
			65 : [ 						note_positions[104], note_positions[78],note_positions[52], note_positions[27], note_positions[1]], // F
			66 : [ 											 note_positions[79],note_positions[53], note_positions[28], note_positions[2]], 
			67 : [ 											 note_positions[80],note_positions[54], note_positions[29], note_positions[3]], // G
			68 : [ 											 note_positions[81],note_positions[55], note_positions[30], note_positions[4]], 
			69 : [ 											 note_positions[82],note_positions[56], note_positions[31], note_positions[5]], // A
			70 : [ 											 note_positions[83],note_positions[57], note_positions[32], note_positions[6]],
			71 : [ 											 					note_positions[58], note_positions[33], note_positions[7]], // B
			72 : [ 											 					note_positions[59], note_positions[34], note_positions[8]], // C5
			73 : [ 											 					note_positions[60], note_positions[35], note_positions[9]],
			74 : [ 											 					note_positions[61], note_positions[36], note_positions[10]], // D
			75 : [ 											 					note_positions[62], note_positions[37], note_positions[11]],
			76 : [ 											 										note_positions[38], note_positions[12]], // E
			77 : [ 											 										note_positions[39], note_positions[13]], // F
			78 : [ 											 										note_positions[40], note_positions[14]],
			79 : [ 											 										note_positions[41], note_positions[15]], // G
			80 : [ 											 															note_positions[16]],
			81 : [ 											 															note_positions[17]], // A
			82 : [ 											 															note_positions[18]],
			83 : [ 											 															note_positions[19]], // B
			84 : [ 											 															note_positions[20]] // C6
		};
	}

	getNotePositionsFromNoteType(note_type) {
		let NOTE_TYPE = musicKit.Note.Name.TYPE;
		var note_positions = this.note_positions
		switch(note_type){
	    	case NOTE_TYPE.C:
			return [	note_positions[113], note_positions[87],
						note_positions[125], note_positions[99], note_positions[73], note_positions[47], note_positions[22],
						note_positions[59], note_positions[34], note_positions[8],
						note_positions[20] ]
			case NOTE_TYPE.C_sharp: 
			return [	note_positions[114], note_positions[88],
						note_positions[100], note_positions[74],note_positions[48], note_positions[23],
						note_positions[60], note_positions[35], note_positions[9]]
			case NOTE_TYPE.D: 
			return [	note_positions[115], note_positions[89], note_positions[63],
						note_positions[101], note_positions[75],note_positions[49], note_positions[24],
						note_positions[61], note_positions[36], note_positions[10] ]
			case NOTE_TYPE.D_sharp: 
			return [	note_positions[116], note_positions[90], note_positions[64],
						note_positions[102], note_positions[76],note_positions[50], note_positions[25],
						note_positions[62], note_positions[37], note_positions[11]]
			case NOTE_TYPE.E: 
			return [ 	note_positions[105], 
						note_positions[117], note_positions[91], note_positions[65], 
						note_positions[103], note_positions[77], note_positions[51], note_positions[26], note_positions[0], 
						note_positions[38], note_positions[12] ]
			case NOTE_TYPE.F: 
			return [	note_positions[106],
						note_positions[118], note_positions[92], note_positions[66],
						note_positions[104], note_positions[78],note_positions[52], note_positions[27], note_positions[1],
						note_positions[39], note_positions[13] ]
			case NOTE_TYPE.F_sharp: 
			return [	note_positions[107],
						note_positions[119], note_positions[93], note_positions[67],
						note_positions[79], note_positions[53], note_positions[28], note_positions[2],
						note_positions[40], note_positions[14]]
			case NOTE_TYPE.G: 
			return [	note_positions[108],
	  					note_positions[120], note_positions[94], note_positions[68], note_positions[42],
	  					note_positions[80], note_positions[54], note_positions[29], note_positions[3],
	  					note_positions[41], note_positions[15] ]
	  		case NOTE_TYPE.G_sharp: 
	  		return [	note_positions[109],
	  					note_positions[121], note_positions[95], note_positions[69], note_positions[43],
	  					note_positions[81],note_positions[55], note_positions[30], note_positions[4],
	  					note_positions[16]]
	  		case NOTE_TYPE.A: 
	  		return [	note_positions[110], note_positions[84],
	  					note_positions[122], note_positions[96], note_positions[70], note_positions[44],
	  					note_positions[82], note_positions[56], note_positions[31], note_positions[5],
	  					note_positions[17] ]
	  		case NOTE_TYPE.A_sharp: 
	  		return [	note_positions[111], note_positions[85],
	  					note_positions[123], note_positions[97], note_positions[71], note_positions[45],
	  					note_positions[83],note_positions[57], note_positions[32], note_positions[6],
	  					note_positions[18]]
	  		case NOTE_TYPE.B: 
	  		return [	note_positions[112], note_positions[86],
	  					note_positions[124], note_positions[98], note_positions[72], note_positions[46], note_positions[21],
	  					note_positions[58], note_positions[33], note_positions[7],
	  					note_positions[19] ]
	  	}
	}

	drawNote(note){

		let canvas = this.canvas;
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

		this.drawNoteWithColor(note);
	}

	drawNoteWithColor(note, label) {
		let canvas = this.canvas;
		var ctx = canvas.getContext("2d");
		var note_positions = this.noteValueToNotePositionsDict[note.midi_value]

		var i;
		for( i=0; i<note_positions.length; i++)  {
			ctx.beginPath();
			ctx.fillStyle = note.note_name.color;
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 1;
			ctx.arc(note_positions[i][0], note_positions[i][1], radius, 0, TWO_PI);

			ctx.fill();
			ctx.stroke();
			if(label != undefined){
				ctx.fillStyle = 'black';
	    		ctx.font = radius + 'px san-serif';
	    		ctx.textAlign = 'center';
	    		ctx.fillText(label, note_positions[i][0], note_positions[i][1]+radius*.3, radius*2);
	    	}
		}
	}

	drawInterval(interval){

		var play_type = interval.play_type;
		let higher_note = interval.getHigherNote(musicKit.all_notes);
		var first_note = (play_type == musicKit.Interval.PLAY_TYPE.ASCENDING) ? interval.lower_note : higher_note;

		let canvas = this.canvas;
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

		this.drawNoteWithColor(first_note);

		// delay

		setTimeout(() => {
			var second_note = (play_type == musicKit.Interval.PLAY_TYPE.ASCENDING) ? higher_note : interval.lower_note;
			this.drawNoteWithColor(second_note);
		}, (interval.play_type == musicKit.Interval.PLAY_TYPE.HARMONIC) ? 0 : interval.delay_in_ms);	
	}

	drawChord(chord){
		let canvas = this.canvas;
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

		let note_array = chord.getNoteArray(musicKit.all_notes, model.range);
		var j;
		for(j=0; j<note_array.length; j++) {
			var note = note_array[j];
			var label = chord.note_labels[j]
			this.drawNotePlaceholder(note, label);
			if (label == 'R'){
				this.drawNoteWithColor(note, label);
			} else {
				this.drawNoteWithWhite(note, label);
			}
		}
	}

	drawNotePlaceholder(note, label) {
		let canvas = this.canvas;
		var ctx = canvas.getContext("2d");
		var note_positions = this.getNotePositionsFromNoteType(note.note_name.type)

		var i;
		for( i=0; i<note_positions.length; i++)  {
			ctx.beginPath();
			ctx.fillStyle = "#555";
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 1;
			ctx.arc(note_positions[i][0], note_positions[i][1], radius, 0, TWO_PI);

			ctx.fill();
			ctx.stroke();


			ctx.fillStyle = 'white';
	    	ctx.font = radius + 'px san-serif';
	    	ctx.textAlign = 'center';
	    	ctx.fillText(label, note_positions[i][0], note_positions[i][1]+radius*.3, radius*2);
		}
	}

	drawNoteWithWhite(note, label) {
		let canvas = this.canvas;
		var ctx = canvas.getContext("2d");
		var note_positions = this.noteValueToNotePositionsDict[note.midi_value]

		var i;
		for( i=0; i<note_positions.length; i++)  {
			ctx.beginPath();
			ctx.fillStyle = "#fff";
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 1;
			ctx.arc(note_positions[i][0], note_positions[i][1], radius, 0, TWO_PI);

			ctx.fill();
			ctx.stroke();

			ctx.fillStyle = 'black';
	    	ctx.font = radius + 'px san-serif';
	    	ctx.textAlign = 'center';
	    	ctx.fillText(label, note_positions[i][0], note_positions[i][1]+radius*.3, radius*2);
		}
	}

	addClickEventListeners(onClick) {

		let view = this.root_view;
		view.style.cursor="pointer";
		let self = this;
		view.addEventListener("click", function(event){
		    
		    let position =	self.getPosition(view);
		    let x = (event.clientX - position.x) * (WIDTH/width);
		    let y = (event.clientY- position.y) * (WIDTH/width);

		});
	}

	addHoverEventListeners() {

	}

	getPosition(element) {
		const rect = element.getBoundingClientRect();
		return { x: rect.left, y: rect.top };
	}
}

module.exports = FretboardView;