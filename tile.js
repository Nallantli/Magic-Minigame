class Tile {
	constructor(filePath, sizeX, sizeY) {
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.img = new Image();
		this.img.src = filePath;
	}

	getIndexFromNeighbors(neighbors) {
		/*
			[ 0 ]
		[ 1 ]   [ 2 ]
			[ 3 ]
		*/
		if (!neighbors[0] && !neighbors[1] && !neighbors[2] && !neighbors[3]) {
			return [1, 1];
		}
		if (neighbors[0] && !neighbors[1] && !neighbors[2] && !neighbors[3]) {
			return [4, 2];
		}
		if (!neighbors[0] && neighbors[1] && !neighbors[2] && !neighbors[3]) {
			return [5, 1];
		}
		if (neighbors[0] && neighbors[1] && !neighbors[2] && !neighbors[3]) {
			return [2, 2]
		}
		if (!neighbors[0] && !neighbors[1] && neighbors[2] && !neighbors[3]) {
			return [3, 1]
		}
		if (neighbors[0] && !neighbors[1] && neighbors[2] && !neighbors[3]) {
			return [0, 2];
		}
		if (!neighbors[0] && neighbors[1] && neighbors[2] && !neighbors[3]) {
			return [1, 0];
		}
		if (neighbors[0] && neighbors[1] && neighbors[2] && !neighbors[3]) {
			return [1, 2];
		}
		if (!neighbors[0] && !neighbors[1] && !neighbors[2] && neighbors[3]) {
			return [4, 0];
		}
		if (neighbors[0] && !neighbors[1] && !neighbors[2] && neighbors[3]) {
			return [0, 1];
		}
		if (!neighbors[0] && neighbors[1] && !neighbors[2] && neighbors[3]) {
			return [2, 0];
		}
		if (neighbors[0] && neighbors[1] && !neighbors[2] && neighbors[3]) {
			return [2, 1];
		}
		if (!neighbors[0] && !neighbors[1] && neighbors[2] && neighbors[3]) {
			return [0, 0];
		}
		if (neighbors[0] && !neighbors[1] && neighbors[2] && neighbors[3]) {
			return [3, 0];
		}
		if (!neighbors[0] && neighbors[1] && neighbors[2] && neighbors[3]) {
			return [3, 2];
		}
		if (neighbors[0] && neighbors[1] && neighbors[2] && neighbors[3]) {
			return [4, 1];
		}
	}

	draw(ctx, x, y, sX, sY, neighbors) {
		const [indexX, indexY] = this.getIndexFromNeighbors(neighbors);
		ctx.drawImage(this.img, indexX * this.sizeX, indexY * this.sizeY, this.sizeX, this.sizeY, x, y, sX, sY);
	}
}