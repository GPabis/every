const gulp = require('gulp'),
      gulpCli = require('gulp-cli'),
      gulpSass = require('gulp-sass'),
      gulpConcat = require('gulp-concat'),
      gulpUglify = require('gulp-uglify'),
      imagemin = require('gulp-imagemin'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCss = require('gulp-clean-css'),
      concatCss = require('gulp-concat-css'),
      browserSync = require('browser-sync').create(),
      reload = browserSync.reload,
      rename = require('gulp-rename'),
      imageminPngquant = require('imagemin-pngquant'),
      imageminZopfli = require('imagemin-zopfli'),
      imageminMozjpeg = require('imagemin-mozjpeg'),
      imageminGiflossy = require('imagemin-giflossy'),
      cache = require('gulp-cache');

const main = {
  in:{
    scss: 'src/style/scss/main.scss',
    css: 'src/style/css/*.css',
    js: 'src/js/*.js',
    img: 'src/assets/img/*',
    lib: 'src/assets/lib/**/*'
  },
  out:{
    scss: 'src/style/css/',
    css: 'dist/style/',
    js: 'dist/js',
    img: 'dist/assets/img',
    lib: 'dist/assets/lib/'
  }
}

gulp.task('sass', () =>{
  return gulp.src(main.in.scss)
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(autoprefixer({
          cascade: false
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(main.out.scss))
        .pipe(browserSync.stream());

});

gulp.task('concat', ()=> {
  return gulp.src(main.in.css)
        .pipe(cleanCss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(main.out.css))
        .pipe(browserSync.stream());

})

gulp.task('scripts', () =>{
  return gulp.src(main.in.js)
        .pipe(gulpUglify())
        .pipe(gulpConcat('script.min.js'))
        .pipe(gulp.dest(main.out.js))
        .pipe(browserSync.stream());
})

gulp.task('imgMin', () =>{
  return gulp.src(main.in.img)
  .pipe(cache(imagemin([
    imageminPngquant({
        speed: 1,
        quality: [0.95, 1]
    }),
    imageminZopfli({
        more: true
    }),
    imageminGiflossy({
        optimizationLevel: 3,
        optimize: 3,
        lossy: 2
    }),
    imagemin.svgo({
        plugins: [{
            removeViewBox: false
        }]
    }),
    imagemin.mozjpeg({
        progressive: true
    }),
    imageminMozjpeg({
        quality: 90
    })
])))
  .pipe(gulp.dest(main.out.img));
})

gulp.task('lib', () =>{
  return gulp.src(main.in.lib)
    .pipe(gulp.dest(main.out.lib));
})

gulp.task('watch', ()=>{
  browserSync.init({
    server: "."
  });
  gulp.watch('src/style/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/style/css/*.css', gulp.series('concat'));
  gulp.watch('src/js/*.js', gulp.series('scripts'));
  gulp.watch('src/assets/img/*', gulp.series('imgMin'));
  gulp.watch('src/assets/lib/**/*', gulp.series('lib'));
  gulp.watch("*.html").on("change", reload);
})

// gulp.task('runDev', gulp.series('browserSync', 'watch'))
gulp.task('build', gulp.series( 'sass', 'concat', 'scripts', 'imgMin'));