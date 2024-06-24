const { src, dest, watch, series } = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
let autoprefixer;

// Динамически импортируем gulp-autoprefixer
(async () => {
  autoprefixer = (await import('gulp-autoprefixer')).default;
})();

function compileSass() {
  return src('src/scss/**/*.scss')
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(dest('dist/css'));
}

function copyHtml() {
  return src('src/**/*.html')
    .pipe(dest('dist'));
}

function watchFiles() {
  watch('src/scss/**/*.scss', compileSass);
  watch('src/**/*.html', copyHtml);
}

exports.compileSass = compileSass;
exports.copyHtml = copyHtml;
exports.watch = watchFiles;
exports.default = series(compileSass, copyHtml, watchFiles);
