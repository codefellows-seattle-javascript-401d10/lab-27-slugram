'use strict';

module.exports = function(){
  return function(items, searchTerm){
    let fuzzyRegex = generateFuzzyRegex(searchTerm);

    let filteredByName = items.filter(item => {
      //does the generateFuzzyRegex happen here or next block?
      let fuzzyName = fuzzyRegex.test(item.name.toUpperCase());
      let fuzzyDesc = fuzzyRegex.test(item.desc.toUpperCase());
      return fuzzyName;
    });
    filtered.filter(item => {
      //any chaining of methods?
      return item;
    });
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
