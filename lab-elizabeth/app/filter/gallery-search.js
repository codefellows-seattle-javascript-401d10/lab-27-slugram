'use strict';

module.exports = function(){
  return function(galleries, searchTerm){
    if(!searchTerm) return galleries;
    let fuzzyRegex = generateFuzzyRegex(searchTerm);
    return galleries.filter(gallery => {
      return fuzzyRegex.text(gallery.name);
    });
  };
};

function generateFuzzyRegex(input){
  if(!input) return /.*/;
  let fuzzyString = '.*' + input.split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
