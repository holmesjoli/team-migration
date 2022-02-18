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