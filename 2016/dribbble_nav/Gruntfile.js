module.exports = function(grunt){

	// 任务配置，所有插件的配置信息
	grunt.initConfig({

		// 获取 packge.json 的信息
		pkg: grunt.file.readJSON('package.json'),

		// clean-清空文件夹
		clean: ["dist/css"],

		// sass-转成css
		sass: {
	        options: {
	            sourceMap: true
	        },
	        dist: {
	            files: {
	                'css/style.css': 'sass/style.scss'
	            }
	        }
		},

		// cssmin-合并压缩css
		cssmin: {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1,
		    compatibility : 'ie8', //设置兼容模式
		    noAdvanced : true //取消高级特性  
		  },
		  // 合并文件
		  target: {
		    files: {
		      'css/style.min.css': ['css/*.css']
		    }
		  }
		},

		// uglify-压缩合并js
		uglify: {
		    options: {
		      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
		        '<%= grunt.template.today("yyyy-mm-dd") %> */'
		    },
		    // 合并插件
		    plugins: {
		      files: {
		        'js/tools.min.js': ['js/plugins/*.js']
		      }
		    },
		    // 全局脚本
		    global: {
		      files: {
		        'js/global.js': ['js/*.js']
		      }
		    }
		},

		// watch-检测文件改动
		watch: {
		  // 检测css
		  css: {
		    files: ['sass/*.scss'],
		    tasks: ['clean', 'sass', 'cssmin'],
		    options: {
		      spawn: false
		    }
		  },
		  // 检测js
		  js: {
		    files: ['js/*.js'],
		    tasks: ['uglify:global'],
		    options: {
		      spawn: false
		    }
		  },
		  plugins: {
		  	files: ['js/plugins/*.js'],
		    tasks: ['uglify:plugins'],
		    options: {
		      spawn: false
		    }
		  }
		}

	});

	// 加载的插件
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 告诉grunt当我们在终端输入grunt时需要做些什么（注意先后顺序）
	grunt.registerTask('default', ['clean', 'sass', 'cssmin',  'watch']);

};