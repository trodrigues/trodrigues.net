var fs = require('fs');

var articlesPath = 'public/articles/';
var dataFilePath = articlesPath+'_data.json'

function getArticles() {
  return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
}

function writeArticlesFile(articles) {
  fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, '  '));
}

module.exports = {
  articlesPath: articlesPath,
  dataFilePath: dataFilePath,
  getArticles: getArticles,
  writeArticlesFile: writeArticlesFile
};
