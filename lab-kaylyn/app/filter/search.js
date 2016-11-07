'use strict';

module.exports = function(){
  return function(galleries, searchTermName, searchTermDesc){

    let filterArray = [];
    let fuzzyRegex = generateFuzzyRegex(searchTermDesc);
    filterArray =  galleries.filter(gallery => {
      return fuzzyRegex.test(gallery.desc.toUpperCase());
    });

    fuzzyRegex = generateFuzzyRegex(searchTermName);
    filterArray = filterArray.filter(gallery => {
      return fuzzyRegex.test(gallery.name.toUpperCase());
    });

    return filterArray;
  };
};

function generateFuzzyRegex(input){
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
