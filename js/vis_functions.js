// Country Position on a grid
function countryPosition(data, nCol, nRow) {

    const xPos = xPosition(nCol, nRow);
    const yPos = yPosition(nCol, nRow);

    data.forEach(function(d, i) {
        d.x = xPos[i];
        d.y = yPos[i];
    });

    return data;
}


// Generates the Country selection menu
function showCountries(dataFiltered, xScale, yScale, svg) {

    let c = svg.selectAll("circle")
                .data(dataFiltered, function(d) {return d.iso3;});

    c
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(d.x); })
        .attr("cy", function(d) { return yScale(d.y); })
        .attr("r", 0)
    .merge(c)
        .transition()
        .duration(1000)
        .delay(1000)
        .attr("cx", function(d) { return xScale(d.x); })
        .attr("cy", function(d) { return yScale(d.y); })
        .attr("r", 10);

    c.exit()
        .transition()
        .duration(1000)
        .delay(1000)
        .attr("r", 0)
        .remove();

    // svg.selectAll("text")
    //     .data(dataFiltered)
    //     .enter()
    //     .append("text")
    //         .attr("id", function(d) {return `name-${d.iso3}`;})
    //         .attr("x", function(d) { return xScale(d.x); })
    //         .attr("y", function(d) { return yScale(d.y) + 30; })
    //         .style("text-anchor", "middle")
    //         .text(function(d) {return d.region;})
    //         .call(wrap, 40);
}