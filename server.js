#!/usr/bin/env node

var express = require('express')
var stylus = require('stylus')
var nib = require('nib')

var context = {
  deploy: '',
  build: Math.round(2440587.5 + (new Date).getTime() / 86400000)
}

express()
  .set('views', __dirname + '/src')
  .set('view engine', 'jade')
  .use(stylus.middleware({
    debug: true,
    src: __dirname + '/src',
    dest: __dirname + '/deploy',
    compile: function(str, path) {
      return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib())
    }
  }))
  .use(express.logger())
  .use(express.static('./deploy'))
  .use('/x', express.static('./x'))
  .get('/favicon.ico', function(req, res){
    res.status(404)
  })
  .get('/', function(req, res){
    res.render('index', context)
  })
  .get('/:page', function(req, res, next){
    res.render(req.params.page, context, function(error, data){
      if (!error) {
        res.send(data)
      } else {
        res.status(404).render('index', context)
      }
    })
  })
  .get('*', function(req, res) {
    res.status(404).render('index', context)
  })
  .enable('trust proxy')
  .listen(19412)

console.log('server started ...')
