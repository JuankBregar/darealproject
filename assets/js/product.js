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

    //TODO: Add sub-object based on table before submit
    $('#new_product').submit(function() {
        generateObjects();
        return validateForm();
    });

    generateObjects = () => {
        objects = [];
        table = $(this).find('#table_tallas').find('tbody');
        table.find('tr').each(function() {
            objects.push({
                name: $(this).find('td:first').html(),
                cantidad: $(this).find('td:last').html()
            });
        })
        $('#sub_objects').val(JSON.stringify(objects));
    }

    validateForm = () => {
        //Remove wrong class
        $('.wrong').removeClass('wrong');
        //Validating inputs
        if ($('input[name=name]').val() == "" || !$('input[name=name]').val().match(/^[a-zA-Z0-9_]*$/))
            $('input[name=name]').addClass('wrong');
        if ($('input[name=quantity]').val() == 0)
            $('input[name=quantity]').addClass('wrong');
        if ($('input[name=acquisition_price]').val() == 0)
            $('input[name=acquisition_price').addClass('wrong');
        if ($('input[name=tranport_price_per_unit]').val() == 0)
            $('input[name=tranport_price_per_unit]').addClass('wrong');
        if ($('input[name=sell_price]').val() == 0)
            $('input[name=sell_price]').addClass('wrong');
        if ($('input[name=IVA]').val() == 0)
            $('input[name=IVA]').addClass('wrong');
        if ($('input[name=final_price]').val() == 0)
            $('input[name=final_price').addClass('wrong');

        //Validating table
        let sum = 0;
        const table = $(this).find('#table_tallas').find('tbody');
        table.find('tr').each(function() {
            if ($(this).find('td:first').html() == "")
                $(this).find('td:first').addClass('wrong');
            if ($(this).find('td:last').html() != "") {
                try {
                    sum += Number($(this).find('td:last').html());
                } catch (err) {
                    $(this).find('td:last').addClass('wrong');
                }
            } else {
                $(this).find('td:last').addClass('wrong');
            }
        });
        if (sum != $('input[name=quantity]').val()) {
            //Fire modal
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'La cantidad de productos no coincide',
                allowOutsideClick: false,
                showCloseButton: true,
                showCancelButton: false,
                customClass: 'custom_modal'
            })
            $('#table_tallas').addClass('wrong')
        }

        return $('.wrong').lenght != 0;
    }

    $('.price_unit input.pu').on('change', () => {
        $('input[name=IVA]').val(Number($('input[name=sell_price]').val()) * 0.13)
        $('input#ganancia_unit').val(
            ((Number($('input[name=sell_price]').val()) /
                Number($('input[name=acquisition_price]').val()) * 100)).toFixed(2))
        $('input[name=final_price]').val((Number($('input[name=sell_price]').val()) + Number($('input[name=IVA]').val())).toFixed(2));
    });
});