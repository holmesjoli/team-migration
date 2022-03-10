import regions from "./regions";
import { select } from "d3";

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
  let words = question.split(/[\s}]+/);
  let index = words.findIndex((w) => w == "{cntry");
  if (index !== -1) {
    words[index] = selectedCountry;
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

  constructor(possibleQuestions, possibleModes, a06aValue) {
    this.questions = this.createMap(possibleQuestions);
    this.modes = this.createMap(possibleModes);
    this.a06aValue = a06aValue;
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

  updatePaths() {
    //A01a
    if (this.questions.get("Q03") && this.questions.get("Q02")) {
      if (this.modes.get("A01a") !== undefined) {
        this.modes.set("A01a", true);
      }
    }

    //A01b
    if (this.questions.get("Q03") && !this.questions.get("Q02")) {
      if (this.modes.get("A01b") !== undefined) {
        this.modes.set("A01b", true);
      }
    }

    //A02a
    if (this.questions.get("Q02")) {
      if (this.modes.get("A02a") !== undefined) {
        this.modes.set("A02a", true);
      }
    }

    //A02b
    if (this.questions.get("Q01") && this.questions.get("Q02")) {
      if (this.modes.get("A02b") !== undefined) {
        this.modes.set("A02b", true);
      }
    }

    // A06a
    if (
      this.questions.get("Q22") &&
      this.questions.get("Q23") == this.a06aValue
    ) {
      if (this.modes.get("A06a") !== undefined) {
        this.mode.set("A06a", true);
      }
    }

    //A06b
    if (this.questions.get("Q22") && this.questions.get("Q24")) {
      if (this.modes.get("A06b") !== undefined) {
        this.modes.set("A06b", true);
      }
    }

    //A06c
    if (this.questions.get("Q22") && this.questions.get("Q25")) {
      if (this.modes.get("A06c") !== undefined) {
        this.modes.set("A06c", true);
      }
    }

    //A06d
    if (this.questions.get("Q22") && this.questions.get("Q26")) {
      if (this.modes.get("A06d") !== undefined) {
        this.modes.set("A06d", true);
      }
    }
    //A06e
    if (this.questions.get("Q22") && this.questions.get("Q27")) {
      if (this.modes.get("A06e") !== undefined) {
        this.modes.set("A06e", true);
      }
    }

    //A06f
    if (this.questions.get("Q22") && this.questions.get("Q28")) {
      if (this.modes.get("A06f") !== undefined) {
        this.modes.set("A06f", true);
      }
    }

    //A07
    if (this.questions.get("Q20")) {
      if (this.modes.get("A07") !== undefined) {
        this.modes.set("A07", true);
      }
    }

    //A08
    if (this.questions.get("Q14") && this.questions.get("Q15")) {
      if (this.modes.get("A08") !== undefined) {
        this.modes.set("A08", true);
      }
    }

    //A09
    if (
      this.questions.get("Q23") &&
      this.questions.get("Q04") &&
      this.questions.get("Q6")
    ) {
      if (this.modes.get("A09") !== undefined) {
        this.modes.set("A09", true);
      }
    }

    //A10
    if (this.questions.get("Q03") && this.questions.get("Q05")) {
      if (this.modes.get("A10") !== undefined) {
        this.modes.set("A10", true);
      }
    }

    //A11
    if (this.questions.get("Q17") && this.questions.get("Q18")) {
      if (this.modes.get("A11") !== undefined) {
        this.modes.set("A11", true);
      }
    }

    //A12a
    if (
      this.questions.get("Q17") &&
      this.questions.get("Q18") &&
      this.questions.get("Q19")
    ) {
      if (this.modes.get("A12a") !== undefined) {
        this.modes.set("A12a", true);
      }
    }

    //A12b
    if (
      this.questions.get("Q17") &&
      this.questions.get("Q18") &&
      !this.questions.get("Q19")
    ) {
      if (this.modes.get("A12b") !== undefined) {
        this.modes.set("A12b", true);
      }
    }

    //A13
    if (
      this.questions.get("Q14") &&
      this.questions.get("Q15") &&
      this.questions.get("Q16")
    ) {
      if (this.modes.get("A13") !== undefined) {
        this.modes.set("A13", true);
      }
    }

    //A14
    if (
      this.questions.get("Q03") &&
      this.questions.get("Q04") &&
      this.questions.get("Q06")
    ) {
      if (this.modes.get("A14") !== undefined) {
        this.modes.set("A14", true);
      }
    }

    //A16
    if (this.questions.get("Q07")) {
      if (this.modes.get("A16") !== undefined) {
        this.modes.set("A16", true);
      }
    }

    //A18
    if (this.questions.get("Q08")) {
      if (this.modes.get("A18") !== undefined) {
        this.modes.set("A18", true);
      }
    }

    //A19
    if (this.questions.get("Q29")) {
      if (this.modes.get("A19") !== undefined) {
        this.modes.set("A19", true);
      }
    }

    //A21
    if (this.questions.get("Q21")) {
      if (this.modes.get("A21") !== undefined) {
        this.modes.set("A21", true);
      }
    }

    //A22
    if (this.questions.get("Q09")) {
      if (this.modes.get("A22") !== undefined) {
        this.modes.set("A22", true);
      }
    }

    //A23
    if (this.questions.get("Q10")) {
      if (this.modes.get("A23") !== undefined) {
        this.modes.set("A23", true);
      }
    }

    //A24
    if (this.questions.get("Q11")) {
      if (this.modes.get("A24") !== undefined) {
        this.modes.set("A24", true);
      }
    }

    //A25
    if (this.questions.get("Q12")) {
      if (this.modes.get("A25") !== undefined) {
        this.modes.set("A25", true);
      }
    }

    //A26
    if (this.questions.get("Q13")) {
      if (this.modes.get("A26") !== undefined) {
        this.modes.set("A26", true);
      }
    }
  }
}

export function highlightPath(
  clicks,
  butterflyPathsG,
  bodyColor = "url(#citizenship__achieved)",
  pathColor = "#ae8625"
) {
  for (let i of clicks.modes) {
    let color;
    if (i[1]) {
      select("#butterfly__head").attr("fill", bodyColor);
      color = pathColor;
    } else {
      color = "#FFFFFF";
    }

    butterflyPathsG.select("#" + i[0]).attr("stroke", color);
  }
}
