const gulp = require("gulp");
const merge = require('merge2');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json", { declaration: true });
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const del = require('del');
const mocha = require('gulp-mocha');

gulp.task("test",function() {
    return gulp.src("test/**/*.ts")
    .pipe(mocha({require:['ts-node/register']}))
})

gulp.task("cleanDist", function () {
    return del('dist/**/*')
})

gulp.task("devbuild", ["cleanDist"], function () {
    let tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject())

    return merge([
        tsResult.js
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(uglify())
            .pipe(sourcemaps.write('../sourcemap', { destPath: 'dist/js' }))
            .pipe(gulp.dest('dist/js')),
        tsResult.dts
            .pipe(gulp.dest('dist/definitions'))
    ])
})

gulp.task("build", ["tsbuild", "uglify"]);

gulp.task("prePublish", ["test","build"]);

