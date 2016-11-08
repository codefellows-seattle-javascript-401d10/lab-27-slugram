'use strict';

module.exports = function() {
  return function(galleries, searchName, searchDesc) {
    if(!searchName && !searchDesc) return galleries;
    if(searchName && !searchDesc) {
      let fuzzyRegex = makeFuzzyRegex(searchName);
      return galleries.filter(gallery => {
        return fuzzyRegex.test(gallery.name.toUpperCase());
      });
    }
    if(searchDesc && !searchName) {
      let fuzzyRegex = makeFuzzyRegex(searchDesc);
      return galleries.filter(gallery => {
        return fuzzyRegex.test(gallery.desc.toUpperCase());
      });
    }
    if(searchDesc && searchName) {
      let fuzzyRegexDesc = makeFuzzyRegex(searchDesc);
      let fuzzyRegexName = makeFuzzyRegex(searchName);
      return galleries.filter(gallery => {
        return fuzzyRegexDesc.test(gallery.desc.toUpperCase()) && fuzzyRegexName.test(gallery.name.toUpperCase());
      });
    }
  };
};

function makeFuzzyRegex(string) {
  if (!string) return /.*/;
  let fuzzyString = '.*' + string.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
