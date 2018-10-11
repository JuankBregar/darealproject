$(function() {
    //Add a row
    $('.table-add').on('click', function() {
        target = $(this).data('target');
        table = $(target).find('tbody');
        table.append('<tr><td contenteditable></td><td contenteditable></td></tr>')
        table.find('tr:last').find('td:first').focus();
    });

    //Remove the last row
    $('.table-remove').on('click', function() {
        target = $(this).data('target');
        table = $(target).find('tbody');
        table.find('tr:last').remove();
    });
});