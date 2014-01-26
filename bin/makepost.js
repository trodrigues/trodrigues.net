#!/usr/bin/env node
var argv = require('optimist').argv;
var fs = require('fs');
var slug = require('to-slug-case');
var mkdirp = require('mkdirp');
var dataFilePath = 'public/articles/_data.json';
var articles = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

var title = argv._.join(' ');
var slug = slug(title);
var date = (new Date).toISOString();
var splitDate = date.split('-');
var datePath = splitDate[0]+'/'+splitDate[1]+'/';
var newArticle = {
  title: title,
  date: date,
  slug: datePath + slug
};

articles.list.unshift(newArticle);

var articleDatePath = 'public/articles/'+datePath;
mkdirp.sync(articleDatePath);
var articleFile = articleDatePath + slug +'.md';
fs.writeFileSync(articleFile, '');
fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, '  '));
console.log('Created article file:');
console.log(articleFile);
