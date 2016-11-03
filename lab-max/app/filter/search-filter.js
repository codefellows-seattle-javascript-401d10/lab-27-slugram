'use strict';

module.exports = function(){
  return function(galleries, searchTermName, searchTermDesc){
    if(!searchTermName && !searchTermDesc) return galleries;

    if(searchTermName && !searchTermDesc){
      let fuzzyRegex = generateFuzzyRegex(searchTermName);
      return galleries.filter(gallery => {
        return fuzzyRegex.test(gallery.name.toUpperCase());
      });
    }

    if(searchTermDesc && !searchTermName){
      let fuzzyRegex = generateFuzzyRegex(searchTermDesc);
      return galleries.filter(gallery => {
        return fuzzyRegex.test(gallery.desc.toUpperCase());
      });
    }

    if(searchTermName && searchTermDesc){
      let fuzzyRegexName = generateFuzzyRegex(searchTermName);
      let fuzzyRegexDesc = generateFuzzyRegex(searchTermDesc);
      return galleries.filter(gallery => {
        return fuzzyRegexName.test(gallery.name.toUpperCase()) && fuzzyRegexDesc.test(gallery.desc.toUpperCase());
      });
    }
  };
};


function generateFuzzyRegex(input){
  if (!input) return /.*/;

  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
