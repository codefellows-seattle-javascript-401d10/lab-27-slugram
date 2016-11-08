'use strict';

module.exports = function(){
  return function(items, searchTermName, searchTermDesc){

    let fuzzyRegex = generateFuzzyRegex(searchTermDesc);
    let filterArray =  items.filter(item => {
      return fuzzyRegex.test(item.desc.toUpperCase());
    });

    fuzzyRegex = generateFuzzyRegex(searchTermName);
    filterArray = filterArray.filter(item => {
      return fuzzyRegex.test(item.name.toUpperCase());
    });

    return filterArray;
  };
};


// module.exports = function(){
//   return function(items, searchTerm){
//     let fuzzyRegex = generateFuzzyRegex(searchTerm);
//
//     return items.filter(item => {
//       let fuzzyName = fuzzyRegex.test(item.name.toUpperCase());
//       let fuzzyDesc = fuzzyRegex.test(item.desc.toUpperCase());
//       //run filter on the name, return that, then f/u with filter by desc and return that
//       return fuzzyName || fuzzyDesc;
//     });
//   };
// };

function generateFuzzyRegex(input){
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
