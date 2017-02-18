const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
var del = require('del');

var paths = {
   images: [  './static/**/*(*.jpg|*.svg|*.gif|*.png)', '!./static/o/**/*' ]
 , imagesoptimized: './static/o/'
};

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del( paths.imagesoptimized );
});

gulp.task('images', ['clean'], () =>
  gulp.src(paths.images)
    .pipe( imagemin({optimizationLevel: 5}) )
    .pipe( gulp.dest( paths.imagesoptimized ) )
);

gulp.task('default', ['watch', 'scripts', 'images']);
