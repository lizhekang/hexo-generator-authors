'use strict';

var pagination = require('hexo-pagination');

module.exports = function(locals) {
  var config = this.config;
  var perPage = config.author_generator.per_page;
  var paginationDir = config.pagination_dir || 'page';
  var posts = locals.posts.sort(config.index_generator.order_by);
  var authors = {
    keys: [],
    data: {}
  };
  var authorDir;
  
  for(var k in posts.data) {
    var item = posts.data[k];
    
    if(item.author) {
      if(authors.data[item.author] == undefined) {
        authors.keys.push(item.author);
        authors.data[item.author]= {data: [], length: 0};
      }
      authors.data[item.author].data.push(item);
      authors.data[item.author].length = authors.data[item.author].length + 1;
    }
  }

  var pages = [];
  
  if(!authors.keys.length) {
    pages = [];
  }else {
    var data;
    for(var k in authors.keys) {
      var author = authors.keys[k];
      posts.data = authors.data[author].data;
      posts.length = authors.data[author].length;
      
      data = pagination('authors/' + author, posts, {
        perPage: perPage,
        layout: ['author', 'archive', 'index'],
        format: paginationDir + '/%d/',
        data: {
          author: author
        }
      });
      
      pages = pages.concat(data);
    }
  }
  
  return pages;
}