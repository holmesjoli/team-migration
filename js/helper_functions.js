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

//Title Generate Matrix
//Description Geneates the number of columns and number of rows
//Which depend on the number of countries
function generateMatrix(nCntry) {

    let nRow;

    if (nCntry > 16) {
        nRow = 2;
    } else {
        nRow = 1;
    }

    return {
        nCol: Math.ceil(nCntry/nRow),
        nRow: nRow
    }
}

// Title Create an array one through n
function arrayOneN(n) {
    var foo = [];
    for (var i = 1; i <= n; i++) {
        foo.push(i);
    }

    return(foo);
}

//Title xPosition
//Description creates an array which can be used to set x
function xPosition(nCol, nRow) {

    const nArray = arrayOneN(nCol);
    return [].concat.apply([], Array(nRow).fill(nArray));
}

//Title yPosition
//Description creates an array which can be used to set y
function yPosition(nCol, nRow) {

    var foo = [];
    for (var i = 1; i <= nRow; i++) {
        for (var j = 1; j <= nCol; j++) {
            foo.push(i);
        }
    }

    return foo;
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
