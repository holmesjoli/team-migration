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

        const allSubregion = uniqueArray(xwalkRegion, "subregion");
        const allSubregionCode = uniqueArray(xwalkRegion, "subregion_code");

        autoLi(allSubregion, allSubregionCode, "region-input");

        dropdown()

        let dataInit = xwalkRegion.filter(function(d) {
            return d.subregion_code === "913";
        });

        let initCntries = uniqueArray(dataInit, "region");

        const dim = generateMatrix(initCntries.length);
        const nCol = dim.nCol;
        const nRow = dim.nRow;

        dataInit = countryPosition(dataInit, nCol, nRow);

        const width = 1200;
        const height = 300;
        const margin = {top: 50, left: 100, right: 100, bottom: 125};

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
            .data(dataInit, function(d) { return d.iso3; })
            .enter()
            .append("circle")
                .attr("cx", function(d) { return xScale(d.x); })
                .attr("cy", function(d) { return yScale(d.y); })
                .attr("r", 10)
                .attr("fill", "black");

        // Filter the data according to the users input
        d3.selectAll(".dropdown-menu li").on("click", function() {

            let selectedRegion = d3.select(this).property("id");

            let dataFiltered = xwalkRegion.filter(function(d) {
                return d.subregion_code === selectedRegion;
            });

            const selectedCntries = uniqueArray(dataFiltered, "region");
            const dim = generateMatrix(selectedCntries.length);
            const nCol = dim.nCol;
            const nRow = dim.nRow;
            xScale.domain([1, nCol]);
            yScale.domain([1, nRow]);

            dataFiltered = countryPosition(dataFiltered, nCol, nRow);

            dataFiltered.sort(function(x, y){
                return d3.ascending(x.country, y.country);
            });

            showCountries(dataFiltered, xScale, yScale, svg)

            // d3.selectAll(".selectRegion").on("click", function() {

            //     let selectedCntry = d3.select(this).property("id");

            //     cntryFiltered = dataFiltered.filter(function(d) {
            //         return d.iso3 === selectedCntry;
            //     })

            //     document.getElementById("selectedCountry").innerHTML = cntryFiltered[0].region;
            //     document.getElementById("path-sentence").style["visibility"] = "visible";

            // });
        });
    });
});
