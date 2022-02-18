// Title Unique Array
// Returns the unique values of a variable in a dataset as an array
function uniqueArray(data, variable) {

    let all = data.map(function(d) {
        return d[variable];
    })

    return [...new Set(all)];
}

d3.csv("./data/cit_long.csv").then(function(citLong) {
    d3.csv("./data/xwalk_region.csv").then(function(xwalkRegion) {

        const allCountry = uniqueArray(citLong, "country");
        const allCountryCode = uniqueArray(citLong, "iso3");
        const allSubregion = uniqueArray(xwalkRegion, "subregion");
        const allSubregionCode = uniqueArray(xwalkRegion, "subregion_code");

        autoLi(allSubregion, allSubregionCode, "region-input");

        dropdown()

        // Filter the data according to the users input
        d3.selectAll(".dropdown-menu li").on("click", function() {

            let selectedRegion = d3.select(this)["_groups"][0][0].innerHTML;

            let dataFiltered = xwalkRegion.filter(function(d) {
                return d.subregion === selectedRegion;
            });

            dataFiltered.sort(function(x, y){
                return d3.ascending(x.country, y.country);
            });

            let selectedCntries = uniqueArray(dataFiltered, "region");
            let nCntry = selectedCntries.length;

            let dim = generateMatrix(nCntry);
            let nCol = dim.nCol;
            let nRow = dim.nRow;

            let xPos = xPosition(nCol, nRow);
            let yPos = yPosition(nCol, nRow);

            dataFiltered.forEach(function(d, i) {
                d.x = xPos[i];
                d.y = yPos[i];
            });

            const width = 1200;
            const height = 300;

            const margin = {top: 50, left: 100, right: 150, bottom: 100};

            const svg = d3.select("#countries")
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

            // Set the number of paths to citizenship
            document.getElementById("nCountry").innerHTML = nCntry;
            document.getElementById("path-sentence").style["visibility"] = "visible";
        });
    });
});
