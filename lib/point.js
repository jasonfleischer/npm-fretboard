class Point{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	draw(ctx, diameter, color="#000") {
		if(this.isValid){
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.lineWidth = 0;
			ctx.arc(this.x, this.y, diameter, 0, 2 * Math.PI);
			ctx.fill();
		}
	}

	isValid(){
		return this.x >= 0 && this.y >= 0;
	}

	distanceBetweenPoints(point) {
        return Math.sqrt((Math.pow(point.x-this.x,2))+(Math.pow(point.y-this.y,2)));
    }
}

module.exports = Point;