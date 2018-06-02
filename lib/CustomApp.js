'use strict';
module.exports = class CustomApp {
	constructor(arr, handler) {
		this.arr = [];
	};

	onComplete () {
		console.log('default callback');
	};

	get listener() {
		return this._listener;
	}

	set addListener(_listener) {
		this._listener = _listener;
	}

	start(array) {
		this.arr = array;
		// traversing the cells in the  hashmap
		for (var i = 0; i < array.length; i++) {
			for (var n = 0; n < array[i].length; n++) {
				var totals = this.addItems(
					this.calculateNeighbours({
						x: n,
						y: i
					}));
				this.arr[i][n] = (totals > 0) ? totals : this.arr[i][n];
			}
		}

		this.draw();
	};

	//get the mines around the selected cell
	calculateNeighbours(cell) {
		const cValue = this.getCValue(cell.y, cell.x);

		//return if the cell is a mine.
		if (cValue === "X") return [];

		let i, j;
		let data = [];

		for (i = cell.y - 1; i <= cell.y + 1; i++) {
			if (i < 0 || i >= this.arr.length) continue;
			for (j = cell.x - 1; j <= cell.x + 1; j++) {
				if (j < 0 || j >= this.arr[0].length) continue;
				data.push(this.getCValue(i, j));
			}
		}
		return data;
	};

	//getting the sum of the neighbouring cells that are mines
	addItems(items) {
		let count = 0;
		for (var i = 0; i < items.length; i++) {
			count += (items[i] === "X") ? 1 : 0;
		}
		return count;
	};

	//retrieve the value of the cell in the hash, with the index id [i][j] .
	getCValue(i, j) {
		return this.arr[i][j].toString().toUpperCase();
	};

	//generate console output
	draw() {
		let output = '';
		//let outputHTML = '<p>';
		for (var i = 0; i < this.arr.length; i++) {
			output += '\n';
			//outputHTML += '<br/>';
			for (var n = 0; n < this.arr[i].length; n++) {
				output += this.arr[i][n] + " ";
				//outputHTML += this.arr[i][n]+ " ";
			}
		}

		//outputHTML += "</p>"
    this.onComplete(output);
	};
}
