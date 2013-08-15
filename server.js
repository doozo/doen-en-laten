#!/usr/bin/env node

var express = require('express')
var fs = require('fs')

var deploy = './deploy/'

express()
  .use(express.logger())
  .use(function(req, res, next){
    if (req.path.indexOf('.') === -1) {
      fs.exists(deploy + req.path + '.html', function(exists){
        if (exists) {
          req.url += '.html'
        }
        next()
      });
    } else {
      next()
    }
  })
  .use(express.static(deploy))
  .use('/x', express.static('./x'))
  .use('/graphics', express.static('./graphics'))
  .get('*', function(req, res) {
    res.status(404).sendfile(deploy + 'index.html')
  })
  .enable('trust proxy')
  .listen(19412)

console.log('server started ...')
