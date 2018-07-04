var gulp = require("gulp");
var sass = require("gulp-sass");
var connect = require("gulp-connect");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var pump = require("pump");

gulp.task("connect", function() {
    connect.server({
        root: "./",
        livereload: true
    });
});

// keeps gulp from crashing for scss errors
var sassMainFile = "sass/app.scss";
var sassFiles = "sass/**/*.scss";
var jsFiles = "js/**/*.js";

gulp.task("css", function() {
    gulp.src(sassMainFile)
        .pipe(sass({ errLogToConsole: true }))
        .pipe(gulp.dest("./public/css"))
        .pipe(connect.reload());
});
var htmlFiles = ["*.html"];

gulp.task("html", function() {
    gulp.src("*.html").pipe(connect.reload());
});

gulp.task("js", function() {
    gulp.src(jsFiles)
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./public/js"))
        .pipe(connect.reload());
});

// gulp.task("scripts", function() {
//     gulp.src(["js/**/*.js"])
//         .pipe(concat("all.js"))
//         .pipe(uglify())
//         .pipe(gulp.dest("./public/js/app.js"));
// });

gulp.task("watch", function() {
    gulp.watch(sassFiles, ["css"]);
    gulp.watch(jsFiles, ["js"]);
    gulp.watch(htmlFiles, ["html"]);
});

gulp.task("default", ["connect", "watch", "css", "js"]);
