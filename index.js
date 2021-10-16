const FretboardView = require("./lib/fretboard_view.js");
const log = require("@jasonfleischer/log");

function fretboardBuilder(options) {

	var id = options.id;
	if (id === undefined){
		log.e('id not provided for fretboard')
		return
	}

	if (document.getElementById(id) === undefined){
		log.e('no fretboard DIV exists with id: ' + id)
		return
	}

	var width = 1000;
	if (options.width !== undefined){
		width = options.width;
	}
	var hover = false;
	if (options.hover !== undefined){
		hover = options.hover;
	}

	var showLabels = true;
	if (options.showLabels !== undefined){
		showLabels = options.showLabels;
	}

	return new FretboardView(id, width, options.onClick, hover, showLabels);
}

module.exports = fretboardBuilder;