const width = 1200;
const height = 300;
const margin = {top: 25, left: 100, right: 100, bottom: 125};

const svgCountry = d3.select("#countries")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const xScale = d3.scaleLinear()
    .domain([1, 1])
    .range([margin.left, width-margin.right]);

const yScale = d3.scaleLinear()
    .domain([1, 1])
    .range([height-margin.bottom, margin.top]);


const files = ["./data/cit_long.csv", "./data/xwalk_region.csv"];

const promises = [];

files.forEach(function(url) {

    let ext = url.split('.').pop();

    if (ext === "csv") {
        promises.push(d3.csv(url))
    } else {
        promises.push(d3.json(url))
    }
});

Promise.all(promises).then(function(data) {

    let citLong = data[0];
    let xwalkRegion = data[1];
    const allSubregion = uniqueArray(xwalkRegion, "subregion");
    const allSubregionCode = uniqueArray(xwalkRegion, "subregion_code");

    autoLi(allSubregion, allSubregionCode, "region-input");

    dropdown()

    // Filter the data according to the users input
    d3.selectAll(".dropdown-menu li").on("click", function() {

        let selectedRegion = d3.select(this).property("id");

        let dataFiltered = xwalkRegion.filter(function(d) {
            return d.subregion_code === selectedRegion;
        });

        showCountries(svgCountry, dataFiltered, xScale, yScale);

        d3.selectAll(".cntry-shape").on("click", function() {

            let selectedCntry = d3.select(this).property("id");

            cntryFiltered = dataFiltered.filter(function(d) {
                return d.iso3 === selectedCntry;
            })

            document.getElementById("selectedCountry").innerHTML = cntryFiltered[0].region;
            document.getElementById("path-sentence").style["visibility"] = "visible";
        });

    });
});
