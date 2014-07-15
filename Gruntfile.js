module.exports = function (grunt) {

  var scripts = [
    'assets/js/vendor/jquery/jquery.js',
    'assets/js/vendor/angular/angular.js',
    'assets/js/vendor/angular-animate/angular-animate.js',
    'assets/js/vendor/angular-cookies/angular-cookies.js',
    'assets/js/vendor/angular-route/angular-route.js',
    'assets/js/vendor/angular-touch/angular-touch.js',
    'assets/js/lib/services/angular-translate.js',
    'assets/js/lib/services/ngProgress.js',
    'assets/js/lib/services/angular-gm-0.2.0.min.js',
    'assets/js/app/home/home.js',
    'assets/js/app/home/homeController.js',
    'assets/js/app/event/event.js',
    'assets/js/app/event/eventController.js',
    'assets/js/app/common/navMenuDirective.js',
    'assets/js/app/common/appController.js',
    'assets/js/app/common/api.parse.js',
    'assets/js/app/common/objectUtils.js',
    'assets/js/app/translations.js',
    'assets/js/app/app.js',
    'assets/js/bootstrap.js'
  ];

  var devscripts = scripts.map(function (path) {
    var path = 'public/' + path;
    return path.toString();
  });

  require('load-grunt-tasks')(grunt);

  var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      src: {
        files: [
          {
            expand: true,
            cwd: './src',
            src: ['**/*'],
            dest: './public'
          }
        ]
      },
      hooks: {
        files: [
          {
            src: 'hooks/pre-commit',
            dest: '.git/hooks/pre-commit'
          }
        ]
      }
    },

    shell: {
      hooks: {
        command: 'chmod +x .git/hooks/pre-commit'
      }
    },

    clean: {
      build: ['public/**'],
      coverage: ['coverage/**'],
      templates: [
        'public/assets/**/*.html',
        'public/assets/**/*.ejs'
      ],
      dist: [
        'public/assets/js/lib/**',
        'public/assets/styles/**/*.less',
        'public/assets/js/app/common/**',
        'public/assets/js/app/config/dev.js',
        'public/assets/js/app/app.js',
        'public/assets/js/app/translations.js',
        'public/index.tpl.ejs',
        'public/assets/js/app/home/**'
      ]
    },

    watch: {
      assets: {
        // Assets to watch:
        files: ['src/**/*', 'Gruntfile.js'],
        // When assets are changed:
        tasks: ['compile']
      }
    },

    recess: {
      options: {
        compile: true
      },
      dev: {
        src: ['src/assets/styles/app.less'],
        dest: 'public/assets/styles/<%= pkg.name %>.css'
      },
      min: {
        options: {
          compress: true
        },
        src: ['src/assets/styles/app.less'],
        dest: 'public/assets/styles/<%= pkg.name %>.min.css'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dev: {
        options: {
          mangle: false,
          beautify: true
        },
        files: [
          {
            src: devscripts,
            dest: 'public/assets/js/<%= pkg.name %>.min.js'
          }
        ]
      },
      min: {
        options: {
          mangle: true,
          beautify: false
        },
        files: [
          {
            src: devscripts,
            dest: 'public/assets/js/<%= pkg.name %>.min.js'
          }
        ]
      },
      templates: {
        options: {
          mangle: true,
          beautify: false
        },
        files: [
          {
            src: ['public/assets/js/app/templates-app.js'],
            dest: 'public/assets/js/app/templates-app.js'
          }
        ]
      }
    },

    ngmin: {
      compile: {
        files: [
          {
            src: [ 'js/app/**/*.js', 'js/vendor/angular/**/*.js', 'js/vendor/angular-*/**/*.js', 'js/lib/directives/**/*js', 'js/lib/services/**/*.js' ],
            cwd: 'public/assets',
            dest: 'public/assets',
            expand: true
          }
        ]
      }
    },

    html2js: {

      app: {
        options: {
          base: 'public'
        },
        src: [ 'public/assets/js/app/**/*.html' ],
        dest: 'public/assets/js/app/templates-app.js'
      }

    },

    render: {
      dev: {
        options: {
          data: {
            env: 'dev',
            scripts: scripts,
            name: '<%= pkg.name %>',
            css: '<%= pkg.name %>.css'
          }
        },
        files: {
          'public/index.html': ['src/index.tpl.ejs']
        }
      },
      prod: {
        options: {
          data: {
            env: 'prod',
            name: '<%= pkg.name %>',
            css: '<%= pkg.name %>.min.css',
            js: '<%= pkg.name %>.min.js'
          }
        },
        files: {
          'public/index.html': ['src/index.tpl.ejs']
        }
      }
    },

    karma: {
      unit: {
        options: {
          files: [
                  'src/assets/js/vendor/angular/angular.js',
                  'src/assets/js/vendor/angular-animate/angular-animate.js',
                  'src/assets/js/vendor/angular-cookies/angular-cookies.js',
                  'src/assets/js/vendor/angular-route/angular-route.js',
                  'src/assets/js/vendor/angular-touch/angular-touch.js',
                  'src/assets/js/lib/services/angular-translate.js',
                  'src/assets/js/vendor/jquery/jquery.js',
                  'src/assets/js/lib/services/**/*.js',
                  'src/assets/js/lib/directives/**/*.js',
                  'src/assets/js/vendor/angular-mocks/angular-mocks.js',
                  'src/assets/js/app/**/*.js',
                  'test/unit/**/*.js'
                ]
        },
        preprocessors: {
          'src/assets/js/app/**/*.js': ['coverage']
        },
        autoWatch: true,
        singleRun: false,
        reporters: ['progress', 'junit', 'coverage', 'osx'],
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        junitReporter: {
          outputFile: 'test/test-results.xml',
          suite: ''
        },
        coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        }
      },
      singleRun: {
        options: {
          files: [
            'src/assets/js/vendor/angular/angular.js',
            'src/assets/js/vendor/angular-animate/angular-animate.js',
            'src/assets/js/vendor/angular-cookies/angular-cookies.js',
            'src/assets/js/vendor/angular-route/angular-route.js',
            'src/assets/js/vendor/angular-touch/angular-touch.js',
            'src/assets/js/lib/services/angular-translate.js',
            'src/assets/js/vendor/jquery/jquery.js',
            'src/assets/js/lib/services/**/*.js',
            'src/assets/js/lib/directives/**/*.js',
            'src/assets/js/vendor/angular-mocks/angular-mocks.js',
            'src/assets/js/app/**/*.js',
            'test/unit/**/*.js'
          ]
        },
        preprocessors: {
          'src/assets/js/app/**/*.js': ['coverage']
        },
        autoWatch: false,
        singleRun: true,
        reporters: ['progress', 'junit'],
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        junitReporter: {
          outputFile: 'test/test-results.xml',
          suite: ''
        },
        coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        }
      }
    },

    connect: {
      options: {
        port: 8080,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      server: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'public')
            ];
          },
          keepalive: true
        }
      },
      dev: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'public')
            ];
          }
        }
      }
    },

    open: {
      app: {
        path: 'http://localhost:8080'
      },
      complexity: {
        path: './complexity/index.html'
      }
    },

    plato: {
      src: {
        options : {
          jshint : grunt.file.readJSON('.jshintrc')
        },
        files: {
          'complexity': ['src/assets/js/app/**/*.js', 'test/unit/**/*.js']
        }
      }
    },

    // https://npmjs.org/package/grunt-ftp-deploy
    'ftp-deploy': {
      build: {
        auth: {
          host: 'chasethebits.com',
          port: 21,
          authKey: 'key1'
        },
        src: 'public',
        dest: '/dashboard',
        exclusions: ['src/**/.DS_Store', 'src/**/Thumbs.db']
      }
    },

    nodemon: {
      dev: {
        script: 'app.js'
      }
    }

  });

  grunt.registerTask('default', [
    'compile',
    'connect:server'
  ]);

  grunt.registerTask('server', [
    'connect:server'
  ]);

  grunt.registerTask('test', [
    'clean:coverage',
    'karma:unit'
  ]);

  grunt.registerTask('compile', [
    'clean:build',
    'copy:src',
    'recess:dev',
    'html2js:app',
    'render:dev',
    'clean:templates',
  ]);

  grunt.registerTask('dev', [
    'compile',
    'connect:dev',
    'open:app',
    'watch:assets'
  ]);

  grunt.registerTask('dist', [
    //'karma:singleRun',
    'copy:src',
    'recess:min',
    'html2js:app',
    'render:prod',
    'ngmin:compile',
    'uglify:min',
    'uglify:templates',
    'clean:templates',
    'clean:dist',
    'nodemon'
  ]);

  grunt.registerTask('hooks', [
    'copy:hooks',
    'shell:hooks'
  ]);


};