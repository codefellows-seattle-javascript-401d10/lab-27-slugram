'use strict';

module.exports = function(){
  return function(assets, nameSearchTerm, descSearchTerm){
    let fuzzyRegex;

    if (!nameSearchTerm && !descSearchTerm) {
      fuzzyRegex = generateFuzzyRegex();
      return assets.filter(asset => {
        return fuzzyRegex.test(asset.name.toUpperCase());
      });
    }

    if (nameSearchTerm && descSearchTerm){
      return assets.filter(function(asset) {
        return fuzzyRegex.test(asset.name.toUpperCase());
      }).filter(function(asset){
        return fuzzyRegex.test(asset.desc.toUpperCase());
      });
    }

    if (!nameSearchTerm) {
      fuzzyRegex = generateFuzzyRegex(descSearchTerm);
      return assets.filter(asset => {
        return fuzzyRegex.test(asset.desc.toUpperCase());
      });
    }

    fuzzyRegex = generateFuzzyRegex(nameSearchTerm);
    return assets.filter(asset => {
      return fuzzyRegex.test(asset.name.toUpperCase());
    });
  };
};

function generateFuzzyRegex(input){
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
