var gulp = require('gulp'),
	bower = require('main-bower-files'),
	clean = require('gulp-clean'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	typescript = require('gulp-tsc'),
	uglify = require('gulp-uglify');

var config = {
	development: false,

	scripts: {
		src: './Scripts/*.ts',
		dest: './wwwroot/js/'
	},
	styles: {
		src: './Styles/*.less',
		dest: './wwwroot/css/'
	},
	components: {
		src: './bower_components/',
		dest: './wwwroot/lib/'
	}
}

gulp.task('build', ['copy-components', 'build-styles', 'build-scripts'], function () {
	// Add custom build logic here:

});

gulp.task('clean', ['clean-components', 'clean-styles', 'clean-scripts'], function () {
	// Add custom clean logic here:

});

// Scripts
gulp.task('build-scripts', ['clean-scripts'], function () {
	var stream = gulp.src(config.scripts.src)
		.pipe(typescript({
			sourceMap: config.development,
			emitError: false,
			outDir: config.scripts.dest
		}));

	if(!config.development)
		stream.pipe(uglify());

	return stream.pipe(gulp.dest(config.scripts.dest));
});

gulp.task('clean-scripts', function () {
	return gulp.src(config.scripts.dest, { read: false }).pipe(clean({ force: true }));
});

// Styles
gulp.task('build-styles', ['clean-styles'], function () {
	var stream = gulp.src(config.styles.src)
		.pipe(less());

	if (!config.development)
		stream.pipe(minifyCSS({ compatibility: 'ie8' }));

	return stream.pipe(gulp.dest(config.styles.dest));
});

gulp.task('clean-styles', function () {
	return gulp.src(config.styles.dest, { read: false }).pipe(clean({ force: true }));
});

// Bower Components
gulp.task('copy-components', ['clean-components'], function () {
	return gulp.src(bower(), { base: config.components.src }).pipe(gulp.dest(config.components.dest));
});

gulp.task('clean-components', function () {
	return gulp.src(config.components.dest, { read: false }).pipe(clean({ force: true }));
});