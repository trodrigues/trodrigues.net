#!/usr/bin/env node
var Table = require('cli-table');
var fs = require('fs');
var prompt = require('sync-prompt').prompt;
var common = require('../lib/common');

var table = new Table({
  head: ['Index', 'Title', 'Date', 'Slug']
});

var articles = common.getArticles();
articles.list.forEach(function (article, index) {
  table.push([index, article.title, article.date, article.slug]);
});

console.log(table.toString());

var indexToRemove = prompt('Index to remove: ');
if(!indexToRemove) process.exit();

var articleToRemove = articles.list[indexToRemove];
fs.unlinkSync(common.articlesPath + articleToRemove.slug+'.md');
articles.list.splice(indexToRemove, 1);

common.writeArticlesFile(articles);
console.log('Removed '+articleToRemove.title);

var articleDir = articleToRemove.slug.split('/');
articleDir.pop();
articleDir = common.articlesPath + articleDir.join('/');
var dirFiles = fs.readdirSync(articleDir);
if(dirFiles.length === 0){
  fs.rmdirSync(articleDir);
  console.log('Removed empty directory '+articleDir);
}
