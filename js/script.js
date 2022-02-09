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

    let text = "";

    for (let i = 0; i < allCountry.length; i++) {
        console.log(allCountry[i]);
        text += `<input type="radio" id="cntry-input-${allISO3[i]}" name="cntry" value="cntry">
        <label for="cntry-input-${allISO3[i]}">${allCountry[i]}</label><br>`;
    }

    document.getElementById("cntry-input").innerHTML = text;

});