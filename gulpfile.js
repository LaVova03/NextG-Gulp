const { src, dest, watch, series } = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
let autoprefixer;

// Динамический импорт gulp-autoprefixer
async function loadAutoprefixer() {
  autoprefixer = (await import('gulp-autoprefixer')).default;
}

async function compileSass() {
  await loadAutoprefixer(); // Убедиться, что autoprefixer загружен
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

function copyJs() {
  return src('src/js/**/*.js')
    .pipe(dest('dist/js'));
}

function watchFiles() {
  watch('src/scss/**/*.scss', compileSass);
  watch('src/**/*.html', copyHtml);
  watch('src/js/**/*.js', copyJs);
}

exports.compileSass = compileSass;
exports.copyHtml = copyHtml;
exports.copyJs = copyJs;
exports.watch = watchFiles;
exports.default = series(compileSass, copyHtml, watchFiles);
