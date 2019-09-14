// Importerar Gulp-metoder 
const {
    src,
    dest,
    watch,
    series,
    parallel
} = require('gulp');

// Importerar Gulp-plugins
const concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean-fix'),
    terser = require('gulp-terser');

// Sökvägar
const paths = {
    allFiles: 'src/**/*.*',
    htmlFiles: 'src/**/*.html',
    imageFolder: 'src/img/*.*',
    cssFiles: 'src/**/*.css',
    jsFiles: 'src/**/*.js',
    mainCSS: 'src/css/style.css'
}

// Spinnar upp en server och skapar en lyssnare för olika typer av filer och uppgifter
function watchTask() {
    connect.server({
        root: 'pub',
        livereload: true
    });
    watch([paths.allFiles, paths.htmlFiles, paths.imageFolder, paths.cssFiles, paths.jsFiles],
        parallel(copyHTML, copyImages, cssTask, jsTask));
}

// Kopierar HTML-filer till pub och laddar om webbläsaren
function copyHTML() {
    return src(paths.htmlFiles)
        .pipe(dest('pub'))
        .pipe(connect.reload());
}

// Kopierar bilder till pub och laddar om webbläsaren
function copyImages() {
    return src(paths.imageFolder)
        .pipe(dest('pub/img'))
        .pipe(connect.reload());
}

// Konkatenerar och minifierar CSS-filer och laddar om webbläsaren
function cssTask() {
    return src(paths.cssFiles)
        .pipe(concat('style.css'))
        .pipe(csso())
        .pipe(dest('pub/css'))
        .pipe(connect.reload());
}

// Rensar pub-katalogen initialt
function cleanPub() {
    return src('pub')
        .pipe(clean());
}

// Konkatenerar och minifierar JS-filer och laddar om webbläsaren
function jsTask() {
    return src(paths.jsFiles)
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(dest('pub/js'))
        .pipe(connect.reload());
}

// Rad av uppgifter som körs vid "gulp"-kommandot
exports.default = series(
    cleanPub,
    copyHTML,
    copyImages,
    cssTask,
    jsTask,
    watchTask
);