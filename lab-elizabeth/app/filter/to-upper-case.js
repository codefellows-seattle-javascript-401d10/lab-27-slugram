'use strict';

module.exports = function(){
  return function(input, pre, punc){
    let prefix = pre || '';
    let punctuation = punc || '!!!';
    return prefix + input.toUpperCase() + punctuation;
  };
};
