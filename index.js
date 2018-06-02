const clear = require('clear');
const files = require('./lib/files');
const CustomApp = require('./lib/CustomApp');

const fs = require('fs');
clear();

// handler action on calculation complete.
const onComplete = (arrData) => {
	console.log('>>test branch >> this is handler in action...\n\n', arrData.toString().toUpperCase());
}

//read local text file.
const getFileContents = (data) => {
	var arr = [];
  var str = data.trim();
	str.replace(/\r?\n/g, '|').replace(/\r/g, '|').split('|').map((item) => {
		arr.push(item.split(' '));
	});
  return arr;
}

//handler on file load.
const onLoadComplete = (data) => {
  const customApp = new CustomApp();
  customApp.onComplete = onComplete;
  customApp.start(getFileContents(data));
}

//start app sequence.
const start = () => {
	let data = '';
	let readStream = fs.createReadStream('text.txt', 'utf8');

  //start file stream.
	readStream.on('data', function (chunk) {
		data += chunk;
	}).on('end', function () {
    onLoadComplete (data);
	});
}

start();
