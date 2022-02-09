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

        if (i === 0) {
            text += `<input type="radio" id="cntry-input-${allISO3[i]}" class="country--option" name="cntry" value="${allISO3[i]}" checked>
        <label for="cntry-input-${allISO3[i]}">${allCountry[i]}</label><br>`;
        } else {
            text += `<input type="radio" id="cntry-input-${allISO3[i]}" class="country--option" name="cntry" value="${allISO3[i]}">
        <label for="cntry-input-${allISO3[i]}">${allCountry[i]}</label><br>`;
        }
    }

    document.getElementById("cntry-input").innerHTML = text;

    let selectedCntry = document.querySelector('input[name="cntry"]:checked').value;
});