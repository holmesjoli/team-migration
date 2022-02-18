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

        let allCountry = uniqueArray(citLong, "country");
        let allCountryCode = uniqueArray(citLong, "iso3");
        let allSubregion = uniqueArray(xwalkRegion, "subregion");
        let allSubregionCode = uniqueArray(xwalkRegion, "subregion_code");

        let text = "";

        for (let i = 0; i < allSubregion.length; i++) {
            text += `<li id="${allSubregionCode[i]}">${allSubregion[i]}</li>`;
        }

        // Auto-populate a set of radio buttons using the country data
        document.getElementById("region-input").innerHTML = text;

        //Dropdown Menu
        dropdown()

        //End Dropdown Menu

        // // Filter the data according to the users input
        d3.selectAll(".dropdown-menu li").on("click", function() {

            let selectedRegion = d3.select(this)["_groups"][0][0].innerHTML;

            let dataFiltered = xwalkRegion.filter(function(d) {
                return d.subregion === selectedRegion;
            });

            // Set the number of paths to citizenship
            document.getElementById("nPaths").innerHTML = uniqueArray(dataFiltered, "region").length;
            document.getElementById("path-sentence").style["visibility"] = "visible";
        });
    });
});
