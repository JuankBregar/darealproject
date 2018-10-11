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

    $('#image_picker').on('change', function(event) {
        src = URL.createObjectURL(event.target.files[0]);
        $(this).parent().find('i').remove();
        $(this).parent().find('.image-inside').remove();
        $(this).parent().prepend(`<img src="${src}" class="image-inside"/>`);
    });

    $('.img-upload-btn').on('click', function() {
        $(this).find('input[type=file]')[0].click();
    });
});