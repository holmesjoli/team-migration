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

// Title Create Possible Questions
// Filters based on mode id to create a unique list of possible questions
export function createPossibleQuestions(possibleModes, questionToMode) {

  let possibleQuestions = [];
  for (let i in possibleModes) {
    questionToMode.filter(function(d) {

      if (d.mode_id === possibleModes[i]) {
        possibleQuestions.push(d.question)
      }
    });
  }

  possibleQuestions = [...new Set(possibleQuestions)];

  return possibleQuestions;
}

// Title Create Unnecessary Questions
// Difference between all questions and possible questions
export function createUnnecessaryQuestions(allQuestions, possibleQuestions) {

  let unnecessaryQuestions = []

  for (let i in allQuestions) {
    let p = allQuestions[i]

    if (!containsObject(p, possibleQuestions)) {
      unnecessaryQuestions.push(p)
    }
  }

  return unnecessaryQuestions;
}

export class clickContainer {

  constructor() {
    this.Q3 = false;
    this.Q2 = false;
    this.Q1 = false;
    this.Q22 = false;
    this.Q20 = false;
    this.Q14 = false;
    this.Q17 = false;
    this.Q7 = false;
    this.Q08 = false;
    this.Q29 = false;
    this.Q21 = false;
    this.Q9 = false;
    this.Q10 = false;
    this.Q11 = false;
    this.Q12 = false;
    this.Q13 = false;
    this.Q23 = false;
    this.Q24 = false;
    this.Q25 = false;
    this.Q26 = false;
    this.Q27 = false;
    this.Q28 = false;
    this.Q15 = false;
    this.Q4 = false;
    this.Q5 = false;
    this.Q18 =false;
    this.Q6 = false;
    this.Q19 = false
    this.Q16 = false;
  }

  updateClick(id) {
    this[id] = true;
  }
}