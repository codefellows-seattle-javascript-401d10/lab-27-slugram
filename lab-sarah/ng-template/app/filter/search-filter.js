'use strict';

module.exports = function(){
  return function(galleries, nameSearchTerm, descSearchTerm){
    let fuzzyRegex;

    if (!nameSearchTerm && !descSearchTerm) {
      fuzzyRegex = generateFuzzyRegex();
      return galleries.filter(gallery => {
        return fuzzyRegex.test(gallery.name.toUpperCase());
      });
    }
    if (nameSearchTerm && descSearchTerm){
      let fuzzyRegexName = generateFuzzyRegex(nameSearchTerm);
      let fuzzyRegexDesc = generateFuzzyRegex(descSearchTerm);
      let galleriesByName = galleries.filter(gallery => {
        return fuzzyRegexName.test(gallery.name.toUpperCase());
      });
      return galleriesByName.filter(gallery => {
        return fuzzyRegexDesc.test(gallery.desc.toUpperCase());
      });
      // return galleries.filter(gallery => {
      //   return (fuzzyRegex.test(gallery.name.toUpperCase())).filter(gallery => {
      //     return fuzzyRegex.test(gallery.desc.toUpperCase());
      //   });
      // });
    }
    if (!nameSearchTerm) {
      fuzzyRegex = generateFuzzyRegex(descSearchTerm);
      return galleries.filter(gallery => {
        return fuzzyRegex.test(gallery.desc.toUpperCase());
      });
    }
    fuzzyRegex = generateFuzzyRegex(nameSearchTerm);
    return galleries.filter(gallery => {
      return fuzzyRegex.test(gallery.name.toUpperCase());
    });
  };
};


function generateFuzzyRegex(input){
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
