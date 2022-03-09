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

  constructor(possibleQuestions, possibleModes) {
    this.questions = this.createMap(possibleQuestions);
    this.modes = this.createMap(possibleModes);
  }

  createMap(array) {
    let newMap = new Map();
    for (let i of array) {
      newMap.set(i, false);
    }
    return newMap
  }

  updateClick(id, status) {
    this.questions.set(id, status);
    this.updatePaths();
  }

  updatePaths() {
    //A01a
    if (this.questions.get("Q03") && this.questions.get("Q02")) {
      this.mode.set("A01a", true);
    }

    //A01b
    if (this.questions.get("Q03") && !this.questions.get("Q02")) {
      this.mode.set("A01b", true);
    }

    //A02a
    if (this.questions.get("Q02")) {
      this.mode.set("A02a", true);
    }

    //A02b
    if (this.questions.get("Q01") & this.questions.get("Q02")) {
      this.mode.set("A02b", true);
    }

    //A06a //come back to requires extra coding
    // if (this.questions.Q22 & this.questions.blah) {
    //   this.mode.set("A06a", true);
    // }

    //A06b
    if (this.questions.get("Q22") && this.questions.get("Q24")) {
      this.mode.set("A06b", true);
    }

    //A06c
    if (this.questions.get("Q22") && this.questions.get("Q25")) {
      this.mode.set("A06c", true);
    }

    //A06d
    if (this.questions.get("Q22") && this.questions.get("Q26")) {
      this.mode.set("A06d", true);
    }
    //A06e
    if (this.questions.get("Q22") && this.questions.get("Q27")) {
      this.mode.set("A06e", true);
    }

    //A06f
    if (this.questions.get("Q22") && this.questions.get("Q28")) {
      this.mode.set("A06f", true);
    }

    //A07
    if (this.questions.get("Q20")) {
      this.mode.set("A07", true);
    }

    //A08
    if (this.questions.get("Q14") && this.questions.get("Q15")) {
      this.mode.set("A08", true);
    }

    //A09
    if (this.questions.get("Q23") && this.questions.get("Q04") && this.questions.get("Q6")) {
      this.mode.set("A09", true);
    }

    //A10
    if (this.questions.get("Q03") && this.questions.get("Q05")) {
      this.mode.set("A10", true);
    }

    //A11
    if (this.questions.get("Q17") && this.questions.get("Q18")) {
      this.mode.set("A11", true);
    }

    //A12a
    if (this.questions.get("Q17") && this.questions.get("Q18") && this.questions.get("Q19")) {
      this.mode.set("A12a", true);
    }

    //A12b
    if (this.questions.get("Q17") && this.questions.get("Q18") && !this.questions.get("Q19")) {
      this.mode.set("A12b", true);
    }

    //A13
    if (this.questions.get("Q14") && this.questions.get("Q15") && this.questions.get("Q16")) {
      this.mode.set("A13", true);
    }

    //A14
    if (this.questions.get("Q03") && this.questions.get("Q04") && this.questions.get("Q06")) {
      this.mode.set("A14", true);
    }

    //A16
    if (this.questions.get("Q07")) {
      this.mode.set("A16", true);
    }

    //A18
    if (this.questions.get("Q08")) {
      this.mode.set("A18", true);
    }

    //A19
    if (this.questions.get("Q29")) {
      this.mode.set("A19", true);
    }

    //A21
    if (this.questions.get("Q21")) {
      this.mode.set("A21", true);
    }

    //A22
    if (this.questions.get("Q09")) {
      this.mode.set("A22", true);
    }

    //A23
    if (this.questions.get("Q10")) {
      this.mode.set("A23", true);
    }

    //A24
    if (this.questions.get("Q11")) {
      this.mode.set("A24", true);
    }

    //A25
    if (this.questions.get("Q12")) {
      this.mode.set("A25", true);
    }

    //A26
    if (this.questions.get("Q13")) {
      this.mode.set("A26", true);
    }
  }
}