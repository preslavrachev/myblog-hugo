+++
author = "Preslav Rachev"
categories = ["Programming", "JavaScript", "Gulp", "Grunt"]
date = 2015-01-06T06:29:00Z
description = ""
draft = false
featured_image = "/images/2015/january/gulp-vs-grunt-header.jpeg"
slug = "gulp-vs-grunt-why-one-why-the-other"
tags = ["Programming", "JavaScript", "Gulp", "Grunt"]
title = "Gulp vs Grunt. Why one? Why the Other?"

+++

So you've been trying to wrap your heads around and decide between Grunt and Gulp? Yeah, me too, been there, done that. In my case, the decision wasn't really hard. I've never had strong feelings for Grunt, and for a long time, I used a custom made ANT script. I used to copy it over to every new project, and it helped me with basic tasks — moving, copying, cleaning, linting, minifying, etc. At one point, I switched over to Grunt, but my workflow essentially mimicked the one I had already created using ANT.

So, when Gulp came out, I was right at the point of willing to dive deep into JS-based task runners. Plus, it quickly became the darling of a large portion of the JS community, and many projects, like Ionic, adopted it right away. So, my choice was easy.

{{< tweet 420272334281662464 >}}

Yet, writing Grunt off for all the wrong reasons does not feel right. It is still a great tool, with a bustling community around it, so it makes a lot of sense to make a proper comparison between Grunt and Gulp.

# The Differences

{{< tweet 521003643802513409 >}}

There are two main differences between Grunt and Gulp:

1. Grunt focuses on configuration, while Gulp focuses on code
2. Grunt was built around a set of [built-in, and commonly used tasks][7], while Gulp came around with the idea of enforcing nothing, but how community-developed micro-tasks should connect to each other

That is not to say that Grunt does not support community extensions. Of course, Grunt has supported creating custom plugins since the beginning, and I am sure that one can find a plugin for just about anything one needs. It was just the nature of the built-in tasks that made me stick around a little longer with my ANT script. In retrospect, I have to admit that I was wrong that for being sceptical about it becoming as popular as it is today. In early 2015, Grunt still holds a larger community than Gulp, despite the latter catching up fast.

Every task in Grunt is an array of different plugin configurations, that simply get executed one after another, in a strictly independent, and sequential fashion:
    
```javascript  
grunt.initConfig({
    clean: {
    src: ['build/app.js', 'build/vendor.js']
    },
    
    copy: {
    files: [{
        src: 'build/app.js',
        dest: 'build/dist/app.js'
    }]
    }
    
    concat: {
    'build/app.js': ['build/vendors.js', 'build/app.js']
    }
    
    // ... other task configurations ...
    
});

grunt.registerTask('build', ['clean', 'bower', 'browserify', 'concat', 'copy']);
```
 
In this case, 'clean' and 'concat' must be configured before the 'build' task is registered. Each task configuration is independent from all the rest. When dealing with IO, such as files, each task accesses the file separately — opening the file, applying the changes, and closing the file. Therefore, almost every task requires a source and destination to be specified. This not only doubles the effort for the developer, but it also makes Grunt relatively slower thanGulp.

Gulp on the other hand is all about streams and building complex pipelines with ease. It uses node.js' streams, and executes faster, since it does not open/close files, or create intermediary copies all the time. This is a sample task declaration, taken straight from Ionic's gulpfile.js
    
```javascript
//import the necessary gulp plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

//declare the task
gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
        keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});
```

One thing that is immediately noticed here, is the lack of any up-front configuration, especially, specifying a source and destination. It is clear how one processor plugs into another. Just like LEGO bricks, plugins fit right into each other. The magic happens because of the object format that plugins exchange, the so called [Vinyl][8]. Vinyl is just an abstraction that describes a virtual file object — one that could refer to an existing file on the FS, a stream, or simply dead-ends with a null.

The use of streams is also a part of how gulp plugins are developed. In unison with the UNIX philosophy, gulp plugins must [**try to do one thing well**][9]. In simple words, if your plugin tries to do way too many things, better split it into several smaller plugins, and try to use as many readily developed plugins as you can. Let the complexity reside within the task orchestration, not the plugin body.

Both Grunt and Gulp have their own specifics when developing extensions. Both will make you sacrifice a bit of the beauty of your code, for the sake of plugging it into each build system. Truth is though that Gulp plugins feel one idea less coupled than their Grunt counterparts. This is because every Gulp plugin is first and foremost a legit node.js streaming module. With a bit of fitting, it can be re-used in other pieces of streaming node.js code.

![][10][@maxodgen | Twitter][11]

One word of advice though is to try not to fit every piece of your code into a Gulp plugin. As this [article points out][12], thinking of your code as a Gulp plugin would inevitably increase configuration, which is counter to what the Gulp guidelines, and the **do one thing well** philosophy suggest. This is where the **code over configuration** principle shines. Unlike Grunt, Gulp makes it extremely easy to fit other code within a task definition, besides streaming from one plugin to another. In fact, a Gulp task may not even contain a streaming pipeline:
    
```javascript
var http = require('http');
    
//declare the task
gulp.task('server', function(done) {
    //start an http server (I know, a totally useless example, but helps to illustrate the point)
    var requestListener = function (req, res) {
    res.writeHead(200);
    res.end('Hello, World!n');
    }
    
    var server = http.createServer(requestListener);
    server.listen(8080);
    
    done();
});
```

# The Verdict

Has Gulp made Grunt obsolete. [_No, for the same reason that Burger King didn't make McDonald's obsolete_][13]. Truth is, if you're starting to work with JS-based build systems, there is a high chance that you'd pick Gulp right away. The prospects for it just seem a little rosier, plus, it has been adopted by a large portion of projects. Yet, if you are still using Grunt and feel comfortable using it, there is nothing to be worried about — the community is still there, bigger than Gulp, and keeps growing. Grunt has almost a couple of years of advantage, and I am sure that large project maintainers will try to stick to it for as long as possible. Another advantage of using Grunt is if all you need is that little built-in set of simple tasks. In that case, you'd feel right at home with it, and Gulp, despite all of its flexibility, will make you spend more time in theory than you need. As with everything else project related, you should choose based on the circumstances.

# Resources
- [Why grunt? Why not something else?](http://benalman.com/news/2012/08/why-grunt/)
- [Build Wars: Gulp vs Grunt](http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt)
- [gulp - Eric Schoffstall - Medium](https://medium.com/p/3828e8126466)
- [自家用車の新車について](http://www.100percentjs.com/just-like-grunt-gulp-browserify-now/)
and others...

[1]: https://twitter.com/sindresorhus/status/420272334281662464?ref_src=twsrc%5Etfw
[2]: https://twitter.com/hashtag/Grunt?src=hash&ref_src=twsrc%5Etfw
[3]: https://twitter.com/hashtag/Gulp?src=hash&ref_src=twsrc%5Etfw
[4]: https://twitter.com/hashtag/Maven?src=hash&ref_src=twsrc%5Etfw
[5]: https://twitter.com/hashtag/Gradle?src=hash&ref_src=twsrc%5Etfw
[6]: https://twitter.com/evgeny_goldin/status/521003643802513409?ref_src=twsrc%5Etfw
[7]: http://bocoup.com/weblog/introducing-grunt/
[8]: https://github.com/wearefractal/vinyl
[9]: https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md
[10]: https://preslav.me/content/images/2019/02/image.png
[11]: https://twitter.com/maxogden/status/421375617733386242
[12]: http://blog.overzealous.com/post/74121048393/why-you-shouldnt-create-a-gulp-plugin-or-how-to
[13]: http://qr.ae/6rv0g

