d3.csv("./data/cit_long.csv").then(function(data) {

    console.log(data);

    let allCountry = data.map(function(d) {
        return d.country;
    })

    const uniqueCountry = [...new Set(allCountry)];

});