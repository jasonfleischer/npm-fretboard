class Polygon {
	constructor(array_of_pts){
		this.points = array_of_pts;
	}

	draw(ctx, color = "#eee"){

		var i;
		ctx.beginPath();
		if(color == 'clear')
			ctx.globalCompositeOperation = 'destination-out';
		ctx.lineWidth = 0;
		ctx.fillStyle = color;
		var first_pt = this.points[0]; 
		ctx.moveTo(first_pt.x, first_pt.y);
		

		for(i=1; i<this.points.length; i++){
			var pt = this.points[i];
			ctx.lineTo(pt.x, pt.y);
		}
		ctx.closePath();
		ctx.fill();

		if(color == 'clear')
			ctx.globalCompositeOperation = 'source-over';
	}
}

module.exports = Polygon;