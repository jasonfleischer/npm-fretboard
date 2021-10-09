class Line {
	constructor(pt1, pt2){
		this.pt1 = pt1;
		this.pt2 = pt2;
	}

	draw(ctx, color = '#000') {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = 10;
		ctx.moveTo(this.pt1.x, this.pt1.y);
		ctx.lineTo(this.pt2.x, this.pt2.y);
		ctx.stroke();
	}

	getIntersectionPtBetweenTwoLines(other_line){
		var l1 = this;
		var l2 = other_line;
		var a1 = l1.pt2.y - l1.pt1.y;
        var b1 = l1.pt1.x - l1.pt2.x;
        var c1 = a1 * l1.pt1.x + b1 * l1.pt1.y;
 
        var a2 = l2.pt2.y - l2.pt1.y;
        var b2 = l2.pt1.x - l2.pt2.x;
        var c2 = a2 * l2.pt1.x + b2 * l2.pt1.y;
 
        var delta = a1 * b2 - a2 * b1;
        var pt = new Point((b2 * c1 - b1 * c2) / delta, (a1 * c2 - a2 * c1) / delta);
        return pt;
	}
}

module.exports = Line;