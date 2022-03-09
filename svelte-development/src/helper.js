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

  pathTrue = "#000000";
  pathFalse = "#FFFFFF";
  pathNA = "#";

  constructor() {
    this.Q03 = false;
    this.Q02 = false;
    this.Q01 = false;
    this.Q22 = false;
    this.Q20 = false;
    this.Q14 = false;
    this.Q17 = false;
    this.Q07 = false;
    this.Q08 = false;
    this.Q29 = false;
    this.Q21 = false;
    this.Q09 = false;
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
    this.Q04 = false;
    this.Q05 = false;
    this.Q18 = false;
    this.Q06 = false;
    this.Q19 = false
    this.Q16 = false;

    this.A01a = false;
    this.A01b = false;
    this.A02a = false;
    this.A02b = false;
    this.A06a = false;
    this.A06b = false;
    this.A06c = false;
    this.A06d = false;
    this.A06e = false;
    this.A06f = false;
    this.A07 = false;
    this.A08 = false;
    this.A09 = false;
    this.A10 = false;
    this.A11 = false;
    this.A12a = false;
    this.A12b = false;
    this.A13 = false;
    this.A14 = false;
    this.A16 = false;
    this.A18 = false;
    this.A19 = false;
    this.A21 = false;
    this.A22 = false;
    this.A23 = false;
    this.A24 = false;
    this.A25 = false;
    this.A26 = false;
  }

  updateClick(id) {
    this[id] = true;
  }

  highlightPaths() {
    //A01a
    if (this.Q03 && this.Q02) {
      this.A01a = true;
    }

    //A01b
    if (this.Q03 && !this.Q02) {
      this.A01b = true;
    }

    //A02a
    if (this.Q02) {
      this.A02a = true;
    }

    //A02b
    if (this.Q01 & this.Q02) {
      this.A02b = true;
    }

    //A06a //come back to requires extra coding
    // if (this.Q22 & blah) {
    //   this.A06a = true;
    // }

    //A06b
    if (this.Q22 && this.Q24) {
      this.A06b = true;
    }

    //A06c
    if (this.Q22 && this.Q25) {
      this.A06c = true;
    }

    //A06d
    if (this.Q22 && this.Q25) {
      this.A06d = true;
    }
    //A06e
    if (this.Q22 && this.Q27) {
      this.A06e = true;
    }

    //A06f
    if (this.Q22 && this.Q28) {
      this.A06f = true;
    }

    //A07
    if (this.Q20) {
      this.A07 = true;
    }

    //A08
    if (this.Q14 && this.Q15) {
      this.A08 = true;
    }

    //A09
    if (this.Q23 && this.Q04 && this.Q06) {
      this.A09 = true;
    }

    //A10
    if (this.Q03 && this.Q05) {
      this.A10 = true;
    }

    //A11
    if (this.Q17 && this.Q18) {
      this.A11 = true;
    }

    //A12a
    if (this.Q17 && this.Q18 && this.Q19) {
      this.A12b = true;
    }

    //A12b
    if (this.Q17 && this.Q18 && !this.Q19) {
      this.A12a = true;
    }

    //A13
    if (this.Q14 && this.Q15 && this.Q16) {
      this.A13 = true;
    }

    //A14
    if (this.Q03 && this.Q04 && this.Q06) {
      this.A14 = true;
    }

    //A16
    if (this.Q07) {
      this.A16 = true;
    }

    //A18
    if (this.Q08) {
      this.A18 = true;
    }

    //A19
    if (this.Q29) {
      this.A19 = true;
    }

    //A21
    if (this.Q21) {
      this.A21 = true;
    }

    //A22
    if (this.Q09) {
      this.A22 = true;
    }

    //A23
    if (this.Q10) {
      this.A23 = true;
    }

    //A24
    if (this.Q11) {
      this.A24 = true;
    }

    //A25
    if (this.Q12) {
      this.A25 = true;
    }

    //A26
    if (this.Q13) {
      this.A26= true;
    }
  }
}