'use strict';

module.exports = function() {
  return function(assets, nameSearchTerm, descSearchTerm){
    return assets.filter(function(asset){
      return generateFuzzyRegex(nameSearchTerm).test(asset.name.toUpperCase());
    }).filter(function(asset){
      return generateFuzzyRegex(descSearchTerm).test(asset.desc.toUpperCase());
    });
  };
};

function generateFuzzyRegex(input){
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
