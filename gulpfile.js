var gulp = require("gulp");
var sass = require("gulp-sass");
var include = require("gulp-include");
var minify = require("gulp-minify");
var runSequence = require("run-sequence");
var imagemin = require("gulp-imagemin");
var minifyCss = require("gulp-minify-css");
var prefix = require("gulp-autoprefixer");

gulp.task("sass", function() {
  return gulp
    .src("./app/scss/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      minifyCss({
        keepSpecialComments: 1
      })
    )
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("scripts", function() {
  gulp
    .src("./app/js/main.js")
    .pipe(include())
    .pipe(minify())
    .pipe(gulp.dest("./dist/js"));
});

gulp.task("images", function() {
  return gulp
    .src("./app/media/**/*.+(png|jpg|gif|svg)")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/media"));
});

gulp.task("prefix", function() {
  gulp
    .src("./dist/css/main.css")
    .pipe(prefix())
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("video", function() {
  gulp.src("./app/media/*.mp4").pipe(gulp.dest("./dist/media"));
});

gulp.task("watch", function() {
  gulp.watch("./app/scss/*.scss", ["sass"]);
  gulp.watch("./app/js/*.js", ["scripts"]);
});

gulp.task("build", function(callback) {
  runSequence(["sass", "scripts"], "images", "prefix", callback);
});

gulp.task("default", function(callback) {
  runSequence(["sass", "scripts", "video"], "watch", callback);
});
