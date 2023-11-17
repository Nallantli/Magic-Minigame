function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function calculateIntersection(lineA, lineB) {
	/*
	A---------------B
			C---------------D
	
	A-------------------------B
		C----------D
	
				 A----------------B
	C-------------D

			  A---------B
	C----------------------------D
	*/
	if (lineA[0] <= lineB[0] && lineA[1] <= lineB[1] && lineA[1] >= lineB[0]) {
		return {
			size: lineA[1] - lineB[0],
			start: lineB[0]
		};
	}
	if (lineA[0] <= lineB[0] && lineA[1] >= lineB[1]) {
		return {
			size: lineB[1] - lineB[0],
			start: lineB[0]
		};
	}
	if (lineB[0] <= lineA[0] && lineB[1] <= lineA[1] && lineA[0] <= lineB[1]) {
		return {
			size: lineB[1] - lineA[0],
			start: lineA[0]
		};
	}
	if (lineB[0] <= lineA[0] && lineB[1] >= lineA[1]) {
		return {
			size: lineA[1] - lineA[0],
			start: lineA[0]
		};
	}
}

function divideRoom(room, minRoomSizeX, minRoomSizeY, maxRoomSizeX, maxRoomSizeY) {
	if (room.sizeX < minRoomSizeX * 2 && room.sizeY < minRoomSizeY * 2) {
		return {
			rooms: [{
				...room,
				id: crypto.randomUUID()
			}],
			crossings: []
		};
	}
	if (room.sizeX <= maxRoomSizeX && room.sizeY <= maxRoomSizeY && Math.random() < 0.5) {
		return {
			rooms: [{
				...room,
				id: crypto.randomUUID()
			}],
			crossings: []
		};
	}
	let cutX = Math.random() <= 0.5;
	if (room.sizeX < minRoomSizeX * 2) {
		cutX = false;
	}
	if (room.sizeY < minRoomSizeY * 2) {
		cutX = true;
	}
	let left, right, crossing;
	if (cutX) {
		const newSizeX = randomIntFromInterval(minRoomSizeX, room.sizeX - minRoomSizeX);
		left = divideRoom({
			x: room.x,
			y: room.y,
			sizeX: newSizeX,
			sizeY: room.sizeY
		}, minRoomSizeX, minRoomSizeY, maxRoomSizeX, maxRoomSizeY);
		right = divideRoom({
			x: room.x + newSizeX,
			y: room.y,
			sizeX: room.sizeX - newSizeX,
			sizeY: room.sizeY
		}, minRoomSizeX, minRoomSizeY, maxRoomSizeX, maxRoomSizeY);
		const leftRoomsOnEdge = left.rooms.filter(({ x, sizeX }) => x + sizeX === room.x + newSizeX);
		const rightRoomsOnEdge = right.rooms.filter(({ x }) => x === room.x + newSizeX);
		const randomLeft = randomFromList(leftRoomsOnEdge);
		const rightSisterRooms = rightRoomsOnEdge.filter(({ y, sizeY }) => {
			const intersection = calculateIntersection([randomLeft.y, randomLeft.y + randomLeft.sizeY], [y, y + sizeY]);
			return intersection !== undefined && intersection.size >= 2;
		});
		const randomRight = randomFromList(rightSisterRooms);
		const intersection = calculateIntersection([randomLeft.y, randomLeft.y + randomLeft.sizeY], [randomRight.y, randomRight.y + randomRight.sizeY]);
		crossing = {
			leftId: randomLeft.id,
			rightId: randomRight.id,
			x: room.x + newSizeX,
			y: intersection.start + Math.floor(intersection.size / 2)
		};
		console.log(randomLeft, randomRight, crossing, intersection);
	} else {
		const newSizeY = randomIntFromInterval(minRoomSizeY, room.sizeY - minRoomSizeY);
		left = divideRoom({
			x: room.x,
			y: room.y,
			sizeX: room.sizeX,
			sizeY: newSizeY
		}, minRoomSizeX, minRoomSizeY, maxRoomSizeX, maxRoomSizeY);
		right = divideRoom({
			x: room.x,
			y: room.y + newSizeY,
			sizeX: room.sizeX,
			sizeY: room.sizeY - newSizeY
		}, minRoomSizeX, minRoomSizeY, maxRoomSizeX, maxRoomSizeY);
		const leftRoomsOnEdge = left.rooms.filter(({ y, sizeY }) => y + sizeY === room.y + newSizeY);
		const rightRoomsOnEdge = right.rooms.filter(({ y }) => y === room.y + newSizeY);
		const randomLeft = randomFromList(leftRoomsOnEdge);
		const rightSisterRooms = rightRoomsOnEdge.filter(({ x, sizeX }) => {
			const intersection = calculateIntersection([randomLeft.x, randomLeft.x + randomLeft.sizeX], [x, x + sizeX]);
			return intersection !== undefined && intersection.size >= 2;
		});
		const randomRight = randomFromList(rightSisterRooms);
		const intersection = calculateIntersection([randomLeft.x, randomLeft.x + randomLeft.sizeX], [randomRight.x, randomRight.x + randomRight.sizeX]);
		crossing = {
			leftId: randomLeft.id,
			rightId: randomRight.id,
			x: intersection.start + Math.floor(intersection.size / 2),
			y: room.y + newSizeY,
		};
		console.log(randomLeft, randomRight, crossing, intersection);
	}
	return {
		rooms: [
			...left.rooms,
			...right.rooms
		],
		crossings: [
			...left.crossings,
			...right.crossings,
			crossing
		]
	};
}

function generateDungeon(mapSizeX, mapSizeY, minRoomSizeX, minRoomSizeY, maxRoomSizeX, maxRoomSizeY) {
	let room =
		{ x: 0, y: 0, sizeX: mapSizeX - 1, sizeY: mapSizeY - 1 };
	const { rooms, crossings } = divideRoom(room, minRoomSizeX, minRoomSizeY, maxRoomSizeX, maxRoomSizeY);
	let map = [];

	for (let i = 0; i < 50; i++) {
		map.push([])
		for (let j = 0; j < 50; j++) {
			map[i].push(0);
		}
	}

	rooms.forEach(room => {
		for (let i = 0; i < room.sizeX; i++) {
			map[room.x + i][room.y] = 1;
			map[room.x + i][room.y + room.sizeY] = 1;
		}
		for (let i = 0; i < room.sizeY; i++) {
			map[room.x][room.y + i] = 1;
			map[room.x + room.sizeX][room.y + i] = 1;
		}
	});

	map[mapSizeX - 1][mapSizeY - 1] = 1;

	crossings.filter(crossing => crossing !== undefined).forEach(({ x, y }) => map[x][y] = 0);

	return { rooms, crossings, map };
}

function printMap(map) {
	let s = '';

	for (let i = 0; i < 50; i++) {
		for (let j = 0; j < 50; j++) {
			if (map[i][j] === 1) {
				s += '██';
			}
			else if (map[i][j] === 2) {
				s += '  ';
			} else {
				s += '  ';
			}
		}
		s += '\n';
	}

	console.log(s);
}