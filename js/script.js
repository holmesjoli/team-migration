// Title Unique Array
// Returns the unique values of a variable in a dataset as an array
function uniqueArray(data, variable) {

    let all = data.map(function(d) {
        return d[variable];
    })

    return [...new Set(all)];
}

d3.csv("./data/cit_long.csv").then(function(data) {

    console.log(data);

    let allCountry = uniqueArray(data, "country");
    let allISO3 = uniqueArray(data, "iso3");

});