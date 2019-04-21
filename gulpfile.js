// gulpfile.js
var gulp         = require("gulp"),
    sass         = require("gulp-sass"),
    postcss      = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano      = require("cssnano"),
    sourcemaps   = require("gulp-sourcemaps");
    notify       = require('gulp-notify'), 

    browserSync  = require("browser-sync").create();

	
var paths = {
  styles: {
    srcGen: "./assets/sass/index.scss",
    srcSrc: "./assets/sass/*.scss",
    dest:   "./assets/css/"
  }
};

function reload(done) {
  browserSync.reload();
  done();
}

function style() {
  return (
    gulp
      .src(paths.styles.srcGen)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    server: {
        baseDir: "./"
    }
    // If you are already serving your website locally using something like apache
    // You can use the proxy setting to proxy that instead
    // proxy: "yourlocal.dev"
  });

  gulp.watch(paths.styles.srcSrc, style);
  gulp.watch("*.html", reload);
}

exports.watch = watch
exports.style = style;