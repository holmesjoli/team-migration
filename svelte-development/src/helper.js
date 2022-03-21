import regions from "./regions";
import { select } from "d3";

export const a06aValues = [
  { value: 1, text: "fewer than 5 years" },
  { value: 2, text: "exactly 5 years" },
  { value: 3, text: "between 5 years and 10 years" },
  { value: 4, text: "more than 10 years" },
];

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
export function getQuestionWithCountryName(
  selectedCountry,
  question,
  a06aText
) {
  let words = question.split(/[\s}]+/);
  let cntryIndex = words.findIndex((w) => w == "{cntry");
  let yearsIndex = words.findIndex((w) => w == "{years");

  if (cntryIndex !== -1) {
    words[cntryIndex] = selectedCountry;
  }

  if (yearsIndex !== -1) {
    words[yearsIndex] = a06aText;
  }
  words = words.join(" ").replace(/\s+(\W)/g, "$1");
  return words;
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
    questionToMode.filter(function (d) {
      if (d.mode_id === possibleModes[i]) {
        possibleQuestions.push(d.question);
      }
    });
  }

  possibleQuestions = [...new Set(possibleQuestions)];

  return possibleQuestions;
}

// Title Create Unnecessary Questions
// Difference between all questions and possible questions
export function createUnnecessaryQuestions(allQuestions, possibleQuestions) {
  let unnecessaryQuestions = [];

  for (let i in allQuestions) {
    let p = allQuestions[i];

    if (!containsObject(p, possibleQuestions)) {
      unnecessaryQuestions.push(p);
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
    return newMap;
  }

  updateClick(id, status) {
    this.questions.set(id, status);
    this.updatePaths();
  }

  highlightPath(butterflyPathsG) {
    for (let i of this.modes) {
      let color;
      if (i[1]) {
        color = "#ae8625";
      } else {
        color = "#FFFFFF";
      }

      butterflyPathsG.select("#" + i[0]).attr("stroke", color);
    }

    let highlight = Array.from(this.modes.values()).some(
      (bool) => bool === true
    );

    if (highlight) {
      select("#butterfly__head").attr("fill", "url(#citizenship__achieved)");
    } else {
      select("#butterfly__head").attr("fill", "#977B67");
    }
  }

  updatePaths() {
    //A01a
    if (this.modes.get("A01a") !== undefined) {
      if (this.questions.get("Q03") && this.questions.get("Q02")) {
        this.modes.set("A01a", true);
      } else {
        this.modes.set("A01a", false);
      }
    }

    //A01b
    if (this.modes.get("A01b") !== undefined) {
      if (this.questions.get("Q03") && !this.questions.get("Q02")) {
        this.modes.set("A01b", true);
      } else {
        this.modes.set("A01b", false);
      }
    }

    //A02a
    if (this.modes.get("A02a") !== undefined) {
      if (this.questions.get("Q02") || this.a02aValue) {
        this.modes.set("A02a", true);
      } else {
        this.modes.set("A02a", false);
      }
    }

    //A02b
    if (this.modes.get("A02b") !== undefined) {
      if (this.questions.get("Q01") && this.questions.get("Q02")) {
        this.modes.set("A02b", true);
      } else {
        this.modes.set("A02b", false);
      }
    }

    //A06a
    if (this.modes.get("A06a") !== undefined) {
      if (this.questions.get("Q22") && this.questions.get("Q23")) {
        this.modes.set("A06a", true);
      } else {
        this.modes.set("A06a", false);
      }
    }

    //A06b
    if (this.modes.get("A06b") !== undefined) {
      if (this.questions.get("Q22") && this.questions.get("Q24")) {
        this.modes.set("A06b", true);
      } else {
        this.modes.set("A06b", false);
      }
    }

    //A06c
    if (this.modes.get("A06c") !== undefined) {
      if (this.questions.get("Q22") && this.questions.get("Q25")) {
        this.modes.set("A06c", true);
      } else {
        this.modes.set("A06c", false);
      }
    }

    //A06d
    if (this.modes.get("A06d") !== undefined) {
      if (this.questions.get("Q22") && this.questions.get("Q26")) {
        this.modes.set("A06d", true);
      } else {
        this.modes.set("A06d", false);
      }
    }

    //A06e
    if (this.modes.get("A06e") !== undefined) {
      if (this.questions.get("Q22") && this.questions.get("Q27")) {
        this.modes.set("A06e", true);
      } else {
        this.modes.set("A06e", false);
      }
    }

    //A06f
    if (this.modes.get("A06f") !== undefined) {
      if (this.questions.get("Q22") && this.questions.get("Q28")) {
        this.modes.set("A06f", true);
      } else {
        this.modes.set("A06f", false);
      }
    }

    //A07
    if (this.modes.get("A07") !== undefined) {
      if (this.questions.get("Q20")) {
        this.modes.set("A07", true);
      } else {
        this.modes.set("A07", false);
      }
    }

    //A08
    if (this.modes.get("A08") !== undefined) {
      if (this.questions.get("Q14") && this.questions.get("Q15")) {
        this.modes.set("A08", true);
      } else {
        this.modes.set("A08", false);
      }
    }

    //A09
    if (this.modes.get("A09") !== undefined) {
      if (
        this.questions.get("Q23") &&
        this.questions.get("Q04") &&
        this.questions.get("Q6")
      ) {
        this.modes.set("A09", true);
      } else {
        this.modes.set("A09", false);
      }
    }

    //A10
    if (this.modes.get("A10") !== undefined) {
      if (this.questions.get("Q03") && this.questions.get("Q05")) {
        this.modes.set("A10", true);
      } else {
        this.modes.set("A10", false);
      }
    }

    //A11
    if (this.modes.get("A11") !== undefined) {
      if (this.questions.get("Q17") && this.questions.get("Q18")) {
        this.modes.set("A11", true);
      } else {
        this.modes.set("A11", false);
      }
    }

    //A12a
    if (this.modes.get("A12a") !== undefined) {
      if (
        this.questions.get("Q17") &&
        this.questions.get("Q18") &&
        this.questions.get("Q19")
      ) {
        this.modes.set("A12a", true);
      } else {
        this.modes.set("A12a", false);
      }
    }

    //A12b
    if (this.modes.get("A12b") !== undefined) {
      if (
        this.questions.get("Q17") &&
        this.questions.get("Q18") &&
        !this.questions.get("Q19")
      ) {
        this.modes.set("A12b", true);
      } else {
        this.modes.set("A12b", false);
      }
    }

    //A13
    if (this.modes.get("A13") !== undefined) {
      if (
        this.questions.get("Q14") &&
        this.questions.get("Q15") &&
        this.questions.get("Q16")
      ) {
        this.modes.set("A13", true);
      } else {
        this.modes.set("A13", false);
      }
    }

    //A14
    if (this.modes.get("A14") !== undefined) {
      if (
        this.questions.get("Q03") &&
        this.questions.get("Q04") &&
        this.questions.get("Q06")
      ) {
        this.modes.set("A14", true);
      } else {
        this.modes.set("A14", false);
      }
    }

    //A16
    if (this.modes.get("A16") !== undefined) {
      if (this.questions.get("Q07")) {
        this.modes.set("A16", true);
      } else {
        this.modes.set("A16", false);
      }
    }

    //A18
    if (this.modes.get("A18") !== undefined) {
      if (this.questions.get("Q08")) {
        this.modes.set("A18", true);
      } else {
        this.modes.set("A18", false);
      }
    }

    //A19
    if (this.modes.get("A19") !== undefined) {
      if (this.questions.get("Q29")) {
        this.modes.set("A19", true);
      } else {
        this.modes.set("A19", false);
      }
    }

    //A21
    if (this.modes.get("A21") !== undefined) {
      if (this.questions.get("Q21")) {
        this.modes.set("A21", true);
      } else {
        this.modes.set("A21", false);
      }
    }

    //A22
    if (this.modes.get("A22") !== undefined) {
      if (this.questions.get("Q09")) {
        this.modes.set("A22", true);
      } else {
        this.modes.set("A22", false);
      }
    }

    //A23\
    if (this.modes.get("A23") !== undefined) {
      if (this.questions.get("Q10")) {
        this.modes.set("A23", true);
      } else {
        this.modes.set("A23", false);
      }
    }

    //A24
    if (this.modes.get("A24") !== undefined) {
      if (this.questions.get("Q11")) {
        this.modes.set("A24", true);
      } else {
        this.modes.set("A24", false);
      }
    }

    //A25
    if (this.modes.get("A25") !== undefined) {
      if (this.questions.get("Q12")) {
        this.modes.set("A25", true);
      } else {
        this.modes.set("A25", false);
      }
    }

    //A26
    if (this.modes.get("A26") !== undefined) {
      if (this.questions.get("Q13")) {
        this.modes.set("A26", true);
      } else {
        this.modes.set("A26", false);
      }
    }
  }
}
