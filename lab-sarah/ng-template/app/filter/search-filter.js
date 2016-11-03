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
      let fuzzyRegexName = generateFuzzyRegex(nameSearchTerm);
      let fuzzyRegexDesc = generateFuzzyRegex(descSearchTerm);
      let assetsByName = assets.filter(asset => {
        return fuzzyRegexName.test(asset.name.toUpperCase());
      });
      return assetsByName.filter(asset => {
        return fuzzyRegexDesc.test(asset.desc.toUpperCase());
      });
      // return assets.filter(asset => {
      //   return (fuzzyRegex.test(asset.name.toUpperCase())).filter(asset => {
      //     return fuzzyRegex.test(asset.desc.toUpperCase());
      //   });
      // });
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
