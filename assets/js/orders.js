$(function() {

            /**************************
             *      /ventas           *
             **************************/
            $('.action-btn').on('click', function() {
                data = $(this).data('obj');
                name = $(this).data('name');
                swal({
                    title: name,
                    html: modal_html(data),
                    allowOutsideClick: false,
                    showCloseButton: true,
                    showCancelButton: false,
                    customClass: 'custom_modal',
                    showConfirmButton: false
                })
            });

            $(document).on('click', '.modal_ball', function() {
                $('.modal_ball.active').removeClass('active');
                $(this).addClass('active');
                $('#units').text('Unidades disponibles: ' + $(this).data('quantity'));
                $('input[name="quantity"]').attr('max', $(this).data('quantity'));
                $('input[name="name"]').val($(this).data('name'));
            })

            const modal_html = () => `<form action="/ventas/add_to_cart" method="POST">
            ${numbers(data)}<span id="units" class="mt-2">&nbsp;</span><hr>
            <div class="row"><div class="col-12">
            <label>Cantidad: </label>
            <input type="number" name="quantity" min="1" class="form-control form-control-success">
            <input type="hidden" name="name">
            </div>
            <button type="submit" class="btn btn-primary action-btn mt-2">Agregar</button>
            </div>
            </form>`;

            const numbers = (data) => `<div class="numbers">${data.map(val=>`<span class="number_ball modal_ball" data-name="${val.name}" data-quantity="${val.quantity}">${val.name.split('-')[1]}</span>`).join('')}</div>`;
});