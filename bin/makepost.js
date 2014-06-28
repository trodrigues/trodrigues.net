#!/usr/bin/env node
var prompt = require('sync-prompt').prompt;
var fs = require('fs');
var slug = require('to-slug-case');
var mkdirp = require('mkdirp');
var common = require('../lib/common');
var articles = common.getArticles();

var title
while(!title) {
  title = prompt('Article title: ');
}
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

var articleDatePath = common.articlesPath + datePath;
mkdirp.sync(articleDatePath);
var articleFile = articleDatePath + slug +'.md';
fs.writeFileSync(articleFile, '');
common.writeArticlesFile(articles);
console.log('Created article file:');
console.log(articleFile);
