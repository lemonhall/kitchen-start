const fs = require('fs');
const sharp = require("sharp");
const http = require('http');

var transformer = sharp().rotate(180).toBuffer(function(err, data, info) {
	    // data contains the raw pixel data after applying the recomb
	//     // With this example input, a sepia filter has been applied
	//       
});


http.get("http://127.0.0.1:8080/?action=snapshot", function(downloadStream) {
	  var writeStream = fs.createWriteStream('./output.jpg');
	  downloadStream.pipe(transformer).pipe(writeStream);
	  downloadStream.on('end', () => {
		      console.log('downloadStream', 'END');
		    });
	  writeStream.on('error', (err) => {
		      console.log('writeStream', err);
		    });
	  downloadStream.on('error', (err) => {
		      console.log('downloadStream', err);
		    });
});

//因为这个库和elec有冲突，所以需要走一个预加载，调一下顺序
//export LD_PRELOAD=node_modules/sharp/vendor/8.10.5/lib/libvips.so.42
