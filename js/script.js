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

            countryMenu(dataFiltered, "#countries");

        });
    });
});
