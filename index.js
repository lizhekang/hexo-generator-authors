/* global hexo */
'use strict';

var assign = require('object-assign');

hexo.config.author_generator = assign({
  per_page: hexo.config.per_page == null ? 10 : hexo.config.per_page
}, hexo.config.author_generator);

hexo.extend.generator.register('author', require('./lib/generator'));