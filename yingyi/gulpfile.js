var gulp = require('gulp');
var browserSync = require('browser-sync').create();
	rename = require('gulp-rename'), //重命名文件
	notify = require('gulp-notify'), //输出信息，并在发生错误时不中断任务
	clean = require('gulp-clean'), //清除文件夹
	include = require('gulp-html-tag-include'), // 拼装html
	browserSync = require('browser-sync').create(), // 浏览器自动刷新
	reload = browserSync.reload,
	rev = require('gulp-rev'), // 打版本号
	revCollector = require('gulp-rev-collector'), // 替换文件路径
	uglify = require('gulp-uglify'), // js压缩
	minifyCss = require('gulp-minify-css'), // css压缩
	spriter = require('gulp-css-spriter'), // 合并sprtie图片
	cache = require('gulp-cache'), // 缓存，在这里只做如图片修改才重新压缩，没有修改就用缓存的
	imagemin = require('gulp-imagemin'), // 图片压缩
	// pngquant = require('imagemnpmin-pngquant'); // 图片压缩

// 静态服务器
// html 拼装
gulp.task('html-include', function() {
    return gulp.src('./sourcehtml/*.html')
        .pipe(include())
        .pipe(gulp.dest('./html/'))
        .pipe(reload({
            stream: true
        }));
});

// gulp.task('css', function() {
//     return gulp.src('./css/*.css')
//         .pipe(reload({
//             stream: true
//         }));
// });


//浏览器自动刷新
gulp.task('browser-sync', ['html-include'], function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    // 监视文件修改
    gulp.watch('./css/*.css',function (event) {
    if (event.type === "changed") {
        browserSync.reload(event.path);
    }}); // 样式修改
    gulp.watch('./js/*.js').on('change', reload); // js修改
    gulp.watch('./sourcehtml/*.html',['html-include']).on('change',browserSync.reload); // html有修改
    gulp.watch('./inc/*.html',['html-include']).on('change',browserSync.reload); // html有修改
  //   gulp.watch(['./sourcehtml/*.html','./inc/*.html','./inc/*/*.html'],
		// // function (event){
		// // 	if(event.type === "changed"){
		// // 		return	gulp.src(event.path)
		// // 				.pipe(include()) // html拼装
		// // 				.pipe(gulp.dest('./html/'))
		// // 				.pipe(reload({stream: true})); 
		// // 	}
		// }); // html有修改
});


// 开发时使用
gulp.task('dev', ['browser-sync']);

//发布版本时使用
gulp.task('clean', function() {
    return gulp.src('./dist', {
            read: false
        })
        .pipe(clean());
});

gulp.task('css', function() {
    var timestamp = +new Date();
    return gulp.src('./css/*.css')
        .pipe(spriter({
            // 生成的spriter的位置
            'spriteSheet': './img/sprite' + timestamp + '.png',
            // 生成样式文件图片引用地址的路径
            // 如下将生产：backgound:url(../img/sprite20324232.png)
            'pathToSpriteSheetFromCSS': '../img/sprite' + timestamp + '.png'
        }))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

gulp.task('js', function() {
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

gulp.task('imgmin', function() {
    return gulp.src('./img/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            svgoPlugins: [{
                removeViewBox: false
            }], //不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest('./dist/assets/img/'))
});

gulp.task('rev', function() {
    return gulp.src(['rev/**/*.json', './html/*.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                '../css/': '../dist/css/',
                '../js/': '../dist/js/',
            }
        }))
        .pipe(gulp.dest('dist/html'));
});


gulp.task('publish', ['clean'], function() {
    gulp.start('replacePath');
});

gulp.task('replacePath', ['css', 'js'], function() {
    gulp.start('rev', 'imgmin');
})