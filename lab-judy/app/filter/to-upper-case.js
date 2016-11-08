'use strict';

module.exports = function(){
  return function(input, pre, end){
    let prefix = pre || '';
    let ending = end || '';
    return prefix + input.toUpperCase() + ending;
  };
};
