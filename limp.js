var Jimp = require('jimp'),
    size = require('image-size');
	fs = require('fs'),
	path = 'img/',
	l = [['tempalate/build/img/laptop','425'],['tempalate/build/img/tablet','768'],['tempalate/build/img/mobile','1024']];


function resize() {
    Jimp.read(__dirname + '/' + path + items[i], function (err, lenna) {
        if (err) throw err;
        lenna.resize(250, 260)            
            .quality(100)                 
            .write(path + 'small-png-' + [i] + '.png'); 
    });
}

fs.readdir(path, function(err, items) {
	if (err) throw err;
    console.log(items);
 
    for (var i=0; i<items.length; i++) {
        //console.log(items[i]);
        console.log(__dirname + '/' + path + items[i]);
        console.log('______//______');
        //console.log(path + [i] + items[i])
        //console.log('______//______');
        //console.log(items[i])

        size(__dirname + '/' + path + items[i], function (err, size) {
            if (err) throw err;
            console.log(size.width, size.height);
            if (768>=size<=1024) {

            }
            if (425>=size<=768) {

            }
            if (size<=425) {

            }
        });

        Jimp.read(__dirname + '/' + path + items[i], function (err, lenna) {
			if (err) throw err;
		    lenna.resize(250, 260)            // resize
		        .quality(100)                 // set JPEG quality
		        .write(path + 'small-png-' + [i] + '.png'); // save
		});
    }
});

