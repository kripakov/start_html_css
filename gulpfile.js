var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglifyjs = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'), 
    pngquant = require('imagemin-pngquant'), 
    cache = require('gulp-cache'),
    pug = require('gulp-pug'),
    Jimp = require('jimp'); 

/* sass file convert to css file */

gulp.task('sass', function() { 
  return gulp.src('template/sass/**/*.sass') 
    .pipe(sass({
        includePaths: require('node-bourbon').includePaths,
        style: 'compressed',
        quiet: true
    })).on('error', sass.logError)
    .pipe(rename({suffix: '.min'}))
	.pipe(autoprefixer({
		browsers: ['last 15 versions'],
		cascade: false
	}))
	.pipe(minifycss())
    .pipe(gulp.dest('template/css/'))
    .pipe(browserSync.stream()) 
  });

/* start project */

gulp.task('browser-sync',function(){
	browserSync({
		server:{
			baseDir:'template'
		},
		notify:false
	})
})

/* Compress img */

gulp.task('img', function(){

	return gulp.src('img/**/*')
	.pipe(cache(imagemin({
		interlaced:true,
		progressive:true,
		svgoPlugins:[{removeViewBox:false}],
		une:[pngquant()]
	})))
	.pipe(gulp.dest('template/build/img/'))

})

/* slicing img */

gulp.task('slice', function(){

	fs.readdir(path, function(err, items) {
	    console.log(items);
	 
	    for (var i=0; i<items.length; i++) {
	        console.log(items[i]);
	    }
	});
	
	Jimp.read('main.jpg', function (err, lenna) {
	if (err) throw err;
    lenna.resize(250, 250)            // resize
        .quality(100)                 // set JPEG quality
        .write("lena-small-bw.jpg"); // save
	});
});

gulp.task('manipulation',['slice', 'img'], function () {
	console.log('manipulation successfully');
});

/*pug render file */

gulp.task('views', function buildHTML() {
  return gulp.src('template/views/index.pug')
  .pipe(pug({
  	pretty: true
  }))
  .pipe(gulp.dest('template/'))
});

/* gulp watch file to change file */

gulp.task('watch', ['browser-sync','sass', 'views'], function(){
	gulp.watch('template/sass/**/*.sass',['sass']);
	gulp.watch('template/*.html',browserSync.reload);
	gulp.watch('template/js/**/*.js',browserSync.reload);
	gulp.watch('template/views/*.pug', ['views']);
})

gulp.task('build',['img','sass','scripts'], function(){
	var buildCss = gulp.src(['template/css/main.css'])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src(['template/fonts/**/*'])
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src(['template/js/**/*'])
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src(['template/*.html'])
		.pipe(gulp.dest('dist'));
});