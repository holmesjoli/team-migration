// Generates the Country selection menu
function countryMenu(dataFiltered, id) {

    const width = 1200;
    const height = 300;
    const margin = {top: 50, left: 100, right: 150, bottom: 125};

    const selectedCntries = uniqueArray(dataFiltered, "region");
    const dim = generateMatrix(selectedCntries.length);
    const nCol = dim.nCol;
    const nRow = dim.nRow;

    const xPos = xPosition(nCol, nRow);
    const yPos = yPosition(nCol, nRow);

    dataFiltered.forEach(function(d, i) {
        d.x = xPos[i];
        d.y = yPos[i];
    });

    
    const svg = d3.select(id)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const xScale = d3.scaleLinear()
        .domain([1, nCol])
        .range([margin.left, width-margin.right]);

    const yScale = d3.scaleLinear()
        .domain([1, nRow])
        .range([height-margin.bottom, margin.top]);

    svg.selectAll("circle")
        .data(dataFiltered)
        .enter()
        .append("circle")
            .attr("id", function(d) {return d.iso3;})
            .attr("class", "selectRegion")
            .attr("cx", function(d) { return xScale(d.x); })
            .attr("cy", function(d) { return yScale(d.y); })
            .attr("r", 10);

    svg.selectAll("text")
        .data(dataFiltered)
        .enter()
        .append("text")
            .attr("id", function(d) {return `name-${d.iso3}`;})
            .attr("x", function(d) { return xScale(d.x); })
            .attr("y", function(d) { return yScale(d.y) + 30; })
            .style("text-anchor", "middle")
            .text(function(d) {return d.region;});
}