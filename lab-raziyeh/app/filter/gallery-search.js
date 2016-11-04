'use strict';

module.exports = function(){
  return function(galleries, searchTerm, fieldSearch){
    let fuzzyRegex = genorateFuzzyRegex(searchTerm);

    return galleries.filter(gallery => {
      if(fieldSearch === 'name') 
        return fuzzyRegex.test(gallery.name.toUpperCase());
      return fuzzyRegex.test(gallery.desc.toUpperCase());
    });
  };
};

function genorateFuzzyRegex(input){
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}