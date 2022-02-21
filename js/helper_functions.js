//Dropdown button
function dropdown() {
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
}

// Autopopulate a group of list elements
function autoLi(value, valueId, selectorId) {

    let text = "";

    for (let i = 0; i < value.length; i++) {
        text += `<li id="${valueId[i]}">${value[i]}</li>`;
    }

    document.getElementById(selectorId).innerHTML = text;
}

// Title Unique Array
// Returns the unique values of a variable in a dataset as an array
function uniqueArray(data, variable) {

    let all = data.map(function(d) {
        return d[variable];
    })

    return [...new Set(all)];
}

// Title Wrap text
// param text str 
// param width int
// Solution from https://stackoverflow.com/questions/24784302/wrapping-text-in-d3
function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}

// Title Read path
// param pth str. The path or url to read the data from
// param promises array. Empty array
function read(pth, promises) {
    let ext = pth.split('.').pop();

    if (ext === "csv") {
        promises.push(d3.csv(pth))
    } else if (ext === "json") {
        promises.push(d3.json(upthrl))
    } else {
        console.error("unknown file extension");
    }
}
