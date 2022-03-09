import regions from "./regions";

// Title Unique Array
// Returns the unique values of a variable in a dataset as an array
export function uniqueArray(data, variable) {
  let all = data.map(function (d) {
    return d[variable];
  });

  return [...new Set(all)];
}

// Title Region Color
// Param region object containing a mapping between region and color
export function findRegionColor(region) {
  let regionIndex = regions.findIndex((re) => re.name === region);
  let color = {
    vivid: regions[regionIndex].color,
    light: regions[regionIndex].colorLight,
  };
  return color;
}

// Title Get Questions With Country Name
// Param Places country name into the question
export function getQuestionWithCountryName(selectedCountry, question) {
  let words = question.split(/[\s}]+/)
  let index = words.findIndex(w => w == "{cntry")
  if (index !== -1) {
    words[index] = selectedCountry
  }
  words = words.join(" ").replace(/\s+(\W)/g, "$1")
  return words
}

// Title Contains Object
export function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
          return true;
      }
  }

  return false;
}