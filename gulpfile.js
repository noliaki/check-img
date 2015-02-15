;(function(){
  "use strict";

  var srcDir = "./src",
      buildDir = "./build";

  var gulp = require("gulp"),
      sass = require("gulp-ruby-sass"),
      imagemin = require("gulp-imagemin"),
      pngquant = require("imagemin-pngquant"),
      uglify = require("gulp-uglify"),
      jsonminify = require("gulp-jsonminify");

  // =============================================
  // sass
  // 
  gulp.task("sass", function() {
    sass(srcDir, {
      "style": "compressed"
    })
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(buildDir));
  });


  // =============================================
  // image min
  // 
  gulp.task("imagemin", function(){
    gulp.src([srcDir + "/**/*.png"])
        .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
        }))
        .pipe(gulp.dest(buildDir));
  });


  // =============================================
  // js min
  // 
  gulp.task("jsmin", function() {
    gulp.src([srcDir + "/**/*.js"])
        .pipe(uglify())
        .pipe(gulp.dest(buildDir));
  });

  // =============================================
  // json min
  // 
  gulp.task("jsonmin", function() {
    gulp.src([srcDir + "/**/*.json"])
        .pipe(jsonminify())
        .pipe(gulp.dest(buildDir));
  });


  gulp.task("default", ["sass", "imagemin", "jsmin", "jsonmin"]);
})();
