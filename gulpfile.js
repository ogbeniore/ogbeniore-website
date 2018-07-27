var gulp = require("gulp");
var connect = require("gulp-connect");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var util = require("gulp-util");

//create live server

gulp.task("connect", function() {
    connect.server({
        root: "./",
        livereload: true
    });
});

//css autoprefix watch and build

var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var scss = require("postcss-scss");
var autoprefixer = require("autoprefixer");

var sassMainFile = "sass/main.scss";
var sassFiles = "sass/**/*.scss";

var postcssProcessors = [
    autoprefixer({
        browsers: [
            "Explorer >= 11",
            "last 2 Explorer versions",
            "last 2 ExplorerMobile versions",
            "last 2 Edge versions",

            "last 2 Firefox versions",
            "last 2 FirefoxAndroid versions",

            "last 2 Chrome versions",
            "last 2 ChromeAndroid versions",

            "last 3 Safari versions",
            "last 3 iOS versions",

            "last 2 Opera versions",
            "last 2 OperaMini versions",
            "last 2 OperaMobile versions",

            "last 2 Android versions",
            "last 2 BlackBerry versions"
        ]
    })
];

gulp.task("css", function() {
    gulp.src(sassMainFile)
        .pipe(postcss(postcssProcessors, { syntax: scss }))
        .pipe(sass({ outputStyle: "compressed" }).on("error", util.log))
        .pipe(gulp.dest("./public/css"))
        .pipe(connect.reload());
});

//Watch the Html

var htmlFiles = ["*.html"];
gulp.task("html", function() {
    gulp.src("*.html").pipe(connect.reload());
});

//Build and watch the JS files
var jsFiles = "js/**/*.js";
gulp.task("js", function() {
    gulp.src(jsFiles)
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./public/js"))
        .pipe(connect.reload());
});

gulp.task("watch", function() {
    gulp.watch(sassFiles, ["css"]);
    gulp.watch(jsFiles, ["js"]);
    gulp.watch(htmlFiles, ["html"]);
});

gulp.task("default", ["connect", "watch", "css", "js"]);
