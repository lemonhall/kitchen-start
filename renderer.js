// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const electron = require('electron'); 
const path = require('path');
const request = require('request');
const fs = require('fs');

var save = document.getElementById('save');
var counter_text = document.getElementById('counter');

//实际负责下载的函数
function downloadFile(file_url , targetPath){
	 var req = request({method: 'GET',uri: file_url});
	 var out = fs.createWriteStream(targetPath);
	 req.pipe(out);
}

// Synchronous read
var record_filename = fs.readFileSync('./record.txt');
var record_counter  = parseInt(record_filename.toString());
console.log("record_counter:"+record_counter);
var counter = record_counter;

save.addEventListener('click', (event) => { 
	console.log("save image been Clicked!!!");
	//实际的产生下载图片的调用
	//downloadFile("", "");
	downloadFile("http://127.0.0.1:8080/?action=snapshot","./snapshot/"+counter+".jpg");
	counter++;
	fs.writeFile('./record.txt', counter, function(err) {
		   if (err) {
				console.error(err);
		   }
	});
	counter_text.textContent = "已记录:"+(counter - 1);
});
