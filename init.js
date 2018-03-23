'use strict';

var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    browserSync = require('browser-sync'),
    harp        = require('harp'),
    http        = require('http'),
    net         = require('net');

const webDirectory = __dirname + '/../';

let isPortTaken = function(port, fn) {
  let tester = net.createServer()
  .once('error', function (err) {
    if (err.code != 'EADDRINUSE') {
      return fn(true);
    }
    fn(true);
  })
  .once('listening', function() {
    tester.once('close', function() { 
      fn(false)
    })
    .close()
  })
  .listen(port)
};

let checkPort = function (callback) {
  let portNumber = 7100;
  let randomPort = randomInt(5,65500);

  return isPortTaken(portNumber, function (par1) {
    console.log('port is taken?',par1);
    if (par1) {
      return callback(randomPort);
    } else {
      return callback(portNumber);
    }
  });
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let setupBrowserSync = function (availablePort) {
  browserSync.init(null, {
    //proxy: "shop-her.dev",
    proxy: "onebostonday.test",
    port: availablePort + 2,
    ghostMode: false,
    files: ['html/js/', 'html/css/', 'html/img', 'craft/templates/**/*.*'],
    open: false,
    /* Hide the notification. It gets annoying */
    notify: {
      styles: ['opacity: 0', 'position: absolute']
    },
    ui: {
      port: availablePort + 3
    }

  }, function (err) {
    let message = err ? err : 'Successful Start';
    console.log(message);
  });
}


let runServer = function (checkPort) {
  let availablePort = checkPort;
  let harpOptions = {
    port: availablePort
  };

  harp.server(webDirectory, harpOptions , function () {
    setupBrowserSync(availablePort);
  })
}

let init = function () {
  checkPort(runServer);
}

module.exports = init;