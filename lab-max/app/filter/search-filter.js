'use strict';

module.exports = function(){
  return function(items, searchTermName, searchTermDesc){
    if(!searchTermName && !searchTermDesc) return items;

    if(searchTermName && !searchTermDesc){
      let fuzzyRegex = generateFuzzyRegex(searchTermName);
      return items.filter(item => {
        return fuzzyRegex.test(item.name.toUpperCase());
      });
    }

    if(searchTermDesc && !searchTermName){
      let fuzzyRegex = generateFuzzyRegex(searchTermDesc);
      return items.filter(item => {
        return fuzzyRegex.test(item.desc.toUpperCase());
      });
    }

    if(searchTermName && searchTermDesc){
      let fuzzyRegexName = generateFuzzyRegex(searchTermName);
      let fuzzyRegexDesc = generateFuzzyRegex(searchTermDesc);
      return items.filter(item => {
        return fuzzyRegexName.test(item.name.toUpperCase()) && fuzzyRegexDesc.test(item.desc.toUpperCase());
      });
    }
  };
};


function generateFuzzyRegex(input){
  if (!input) return /.*/;

  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
