const gulp = require("gulp");
const sass = require('gulp-dart-sass');
const gzip = require("gulp-gzip");
const postcss = require("gulp-postcss");
const cleanCSS = require("gulp-clean-css");
const cssvariables = require("postcss-css-variables");

gulp.task("default", css);

function css(done) {
	return gulp.src("src/*.scss")
		.pipe(sass())
		.pipe(postcss([cssvariables()]))
		.pipe(cleanCSS({ level: 2 }))
		.pipe(gulp.dest("dist/"))
		.pipe(gzip())
		.pipe(gulp.dest("dist/"))
	done();
}

gulp.task("minify", minify);

function minify(done) {
	return gulp.src("src/*.scss")
		.pipe(sass())
		.pipe(postcss([cssvariables()]))
		.pipe(cleanCSS({ level: 2 }))
		.pipe(gulp.dest("dist/"))
	done();
}

gulp.task("watch", function(){
	gulp.series("minify")
	gulp.watch("src/*.scss").on("change", gulp.series("minify"));
})
