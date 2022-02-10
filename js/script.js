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
        text += `<li id="${allISO3[i]}">${allCountry[i]}</li>`;
    }

    // Auto-populate a set of radio buttons using the country data
    document.getElementById("cntry-input").innerHTML = text;

    //Dropdown Menu
    $('.dropdown').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });
    $('.dropdown .dropdown-menu li').click(function () {
        $(this).parents('.dropdown').find('span').text($(this).text());
        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
    });

    //End Dropdown Menu

    // // Filter the data according to the users input
    d3.selectAll(".dropdown-menu li").on("click", function() {

        let selectedCntry = d3.select(this)["_groups"][0][0].innerHTML;

        console.log(selectedCntry);

        let dataFiltered = data.filter(function(d) {
            return d.country === selectedCntry & d.bin ==="TRUE";
        });

        // Set the number of paths to citizenship
        document.getElementById("nPaths").innerHTML = uniqueArray(dataFiltered, "mode_id").length;
    });

});