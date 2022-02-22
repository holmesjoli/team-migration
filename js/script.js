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


const files = {citLong: {
                        pth: "./data/cit_long.csv",
                        parse: null
                        }, 
                xwalkRegion: {
                        pth: "./data/xwalk_region.csv",
                        parse: null
                        }, 
                regionFlow: {
                        pth: "./data/region_flows.csv",
                        parse: function (d) {
                            return {
                                dest_loc: d.dest_loc,
                                orig_loc: d.orig_loc,
                                value: +d.value
                            }
                        }
                }, 
                regionGeo: {
                        pth: "./data/region_geo.geojson",
                        parse: null
                        }
                };

const promises = [];

for (var key of Object.keys(files)) {

    var fl = files[key]
    read(fl.pth, fl.parse, promises);
}

Promise.all(promises).then(function(data) {

    let citLong = data[0];
    let xwalkRegion = data[1];
    let regionFlow = data[2];
    let regionGeo = data[3];

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
