//Title xPosition
//Description creates an array which can be used to set x
function xPosition(nCol, nRow) {
  const nArray = [];
  for (var i = 1; i <= nCol; i++) {
    nArray.push(i);
  }

  return [].concat.apply([], Array(nRow).fill(nArray));
}

//Title yPosition
//Description creates an array which can be used to set y
function yPosition(nCol, nRow) {
  var foo = [];
  for (var i = 1; i <= nRow; i++) {
    for (var j = 1; j <= nCol; j++) {
      foo.push(i);
    }
  }

  return foo;
}

// Country Position on a grid
function countryPosition(data, nCol, nRow) {
  const xPos = xPosition(nCol, nRow);
  const yPos = yPosition(nCol, nRow);

  data.forEach(function (d, i) {
    d.x = xPos[i];
    d.y = yPos[i];
  });

  return data;
}

//Title Generate Matrix
//Description Geneates the number of columns and number of rows
//Which depend on the number of countries
function generateMatrix(nCntry) {
  let nRow;

  if (nCntry >= 14) {
    nRow = 2;
  } else {
    nRow = 1;
  }

  return {
    nCol: Math.ceil(nCntry / nRow),
    nRow: nRow,
  };
}

// Generates the Country selection menu
function showCountries(svg, dataFiltered, xScale, yScale) {
  const selectedCntries = uniqueArray(dataFiltered, "region");
  const dim = generateMatrix(selectedCntries.length);
  const nCol = dim.nCol;
  const nRow = dim.nRow;

  dataFiltered.sort(function (x, y) {
    return d3.ascending(x.country, y.country);
  });

  dataFiltered = countryPosition(dataFiltered, nCol, nRow);

  xScale.domain([1, nCol]);
  yScale.domain([1, nRow]);

  svg.selectAll(".cntry-shape").remove();
  svg.selectAll(".cntry-name").remove();

  svg
    .selectAll("circle")
    .data(dataFiltered, function (d) {
      return d.iso3;
    })
    .enter()
    .append("circle")
    .attr("class", "cntry-shape")
    .attr("id", function (d) {
      return d.iso3;
    })
    .attr("cx", function (d) {
      return xScale(d.x);
    })
    .attr("cy", function (d) {
      return yScale(d.y);
    })
    .attr("r", 10)
    .attr("fill", "#FFFFFF");

  svg
    .selectAll("text")
    .data(dataFiltered)
    .enter()
    .append("text")
    .attr("class", "cntry-name")
    .attr("id", function (d) {
      return `name-${d.iso3}`;
    })
    .attr("x", function (d) {
      return xScale(d.x);
    })
    .attr("y", function (d) {
      return yScale(d.y) + 30;
    })
    .attr("fill", "#FFFFFF")
    .style("text-anchor", "middle")
    .text(function (d) {
      return d.region;
    })
    .call(wrap, 40);
}
