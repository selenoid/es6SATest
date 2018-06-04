const clear = require('clear');
const files = require('./lib/files');
const CustomApp = require('./lib/CustomApp');

const fs = require('fs');
clear();

// handler action on calculation complete.
const onComplete = (arrData) => {
	console.log( /*'>>test branch >> this is handler in action...\n\n',*/ arrData.toString().toUpperCase());
}

//read local text file.
const getFileContents = (data) => {
	var error = false;
	var promise = new Promise( (resolve, reject) => {

		if (error) {
			reject(Error("Error Occured"));
		}

		var arr = [];
		var str = data.trim();
		str.replace(/\r?\n/g, '|').replace(/\r/g, '|').split('|').map((item) => {
			arr.push(item.split(' '));
		});

		resolve(arr);
	});
	return promise;
}



//start app sequence.
const init = () => {

	let data = '';
	let readStream = fs.createReadStream('text.txt', 'utf8');

	//start file stream.
	readStream.on('data',  (chunk) => {
		data += chunk;
	}).on('end',  () => {
		getFileContents(data)
			.then((arr) => {
				const customApp = new CustomApp();
				customApp.onComplete = onComplete;
				customApp.start(arr);
			}, (error) => {
				console.log("error", error)
			})
	});
}

init();
