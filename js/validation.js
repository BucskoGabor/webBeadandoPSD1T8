

$(document).ready(function () {




    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    function validatePhone(phone) {

        const phoneRegex = /^(\+36|06)?[\s-]?[0-9]{1,2}[\s-]?[0-9]{3}[\s-]?[0-9]{3,4}$/;
        return phoneRegex.test(phone.trim());
    }


    function validateFullName(name) {

        return name.trim().length >= 3 && name.trim().includes(' ');
    }


    function validateBirthDate(date) {
        if (!date) return false;
        const selectedDate = new Date(date);
        const today = new Date();
        const minDate = new Date('1900-01-01');
        return selectedDate < today && selectedDate > minDate;
    }


    function validateCheckboxes() {
        return $('input[name="interests"]:checked').length > 0;
    }


    function showError(fieldId, message) {

        const $field = $('#' + fieldId);
        const $error = $('#' + fieldId + 'Error');


        $field.addClass('error');


        $error.text(message).show();


        $field.animate({ marginLeft: '-10px' }, 50)
            .animate({ marginLeft: '10px' }, 50)
            .animate({ marginLeft: '-10px' }, 50)
            .animate({ marginLeft: '0px' }, 50);
    }


    function clearError(fieldId) {
        const $field = $('#' + fieldId);
        const $error = $('#' + fieldId + 'Error');


        $field.removeClass('error');


        $error.text('').hide();


        $field.css('border-color', '#27ae60');


        setTimeout(function () {
            $field.css('border-color', '');
        }, 2000);
    }




    $('#fullName').on('blur', function () {
        const name = $(this).val();
        if (!validateFullName(name)) {
            showError('fullName', 'Kérjük, adja meg teljes nevét (vezetéknév és keresztnév)!');
        } else {
            clearError('fullName');
        }
    });


    $('#email').on('blur', function () {
        const email = $(this).val();
        if (!validateEmail(email)) {
            showError('email', 'Kérjük, adjon meg egy érvényes email címet!');
        } else {
            clearError('email');
        }
    });


    $('#phone').on('blur', function () {
        const phone = $(this).val();
        if (!validatePhone(phone)) {
            showError('phone', 'Kérjük, adjon meg egy érvényes magyar telefonszámot!');
        } else {
            clearError('phone');
        }
    });


    $('#birthDate').on('change', function () {
        const date = $(this).val();
        if (!validateBirthDate(date)) {
            showError('birthDate', 'Kérjük, adjon meg egy érvényes születési dátumot!');
        } else {
            clearError('birthDate');
        }
    });


    $('#visitFrequency').on('blur', function () {
        const freq = parseInt($(this).val());
        if (isNaN(freq) || freq < 0 || freq > 30) {
            showError('visitFrequency', 'Kérjük, 0 és 30 közötti számot adjon meg!');
        } else {
            clearError('visitFrequency');
        }
    });


    $('#membershipForm').on('submit', function (e) {
        e.preventDefault();

        let isValid = true;




        const fullName = $('#fullName').val();
        if (!validateFullName(fullName)) {
            showError('fullName', 'Kérjük, adja meg teljes nevét!');
            isValid = false;
        } else {
            clearError('fullName');
        }


        const email = $('#email').val();
        if (!validateEmail(email)) {
            showError('email', 'Kérjük, adjon meg érvényes email címet!');
            isValid = false;
        } else {
            clearError('email');
        }


        const phone = $('#phone').val();
        if (!validatePhone(phone)) {
            showError('phone', 'Kérjük, adjon meg érvényes telefonszámot!');
            isValid = false;
        } else {
            clearError('phone');
        }


        const birthDate = $('#birthDate').val();
        if (!validateBirthDate(birthDate)) {
            showError('birthDate', 'Kérjük, adjon meg érvényes születési dátumot!');
            isValid = false;
        } else {
            clearError('birthDate');
        }


        if (!validateCheckboxes()) {
            showError('interests', 'Kérjük, válasszon legalább egy érdeklődési kört!');
            isValid = false;
        } else {
            clearError('interests');
        }


        const visitFreq = parseInt($('#visitFrequency').val());
        if (isNaN(visitFreq) || visitFreq < 0 || visitFreq > 30) {
            showError('visitFrequency', 'Kérjük, 0 és 30 közötti számot adjon meg!');
            isValid = false;
        } else {
            clearError('visitFrequency');
        }


        if (!$('#acceptTerms').is(':checked')) {
            showError('acceptTerms', 'Az ÁSZF elfogadása kötelező!');
            isValid = false;
        } else {
            clearError('acceptTerms');
        }


        if (isValid) {

            $('#successMessage').addClass('show').slideDown(600);


            $('#membershipForm').slideUp(600);


            $('html, body').animate({
                scrollTop: $('#successMessage').offset().top - 100
            }, 600);


            console.log('Form sikeresen elküldve!');
            console.log('Adatok:', {
                fullName: fullName,
                email: email,
                phone: phone,
                birthDate: birthDate,
                membershipType: $('input[name="membershipType"]:checked').val(),
                interests: $('input[name="interests"]:checked').map(function () {
                    return $(this).val();
                }).get(),
                visitFrequency: visitFreq,
                readingSpeed: $('#readingSpeed').val(),
                favoriteColor: $('#favoriteColor').val(),
                comments: $('#comments').val()
            });

        } else {

            if ($('#validation-error').length === 0) {
                const $errorBox = $('<div>', {
                    id: 'validation-error',
                    css: {
                        background: '#e74c3c',
                        color: 'white',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    },
                    html: '<strong>⚠️ Kérjük, javítsa ki a hibásan kitöltött mezőket!</strong>'
                });

                $('#membershipForm').prepend($errorBox);


                $errorBox.hide().fadeIn(400);


                $('html, body').animate({
                    scrollTop: $('#membershipForm').offset().top - 150
                }, 400);


                setTimeout(function () {
                    $errorBox.fadeOut(400, function () {
                        $(this).remove();
                    });
                }, 5000);
            }
        }
    });

    $('#favoriteColor').on('input change', function () {
        const color = $(this).val();
        $('#colorPreview').css('background', color);
        $('#colorCode').text(color.toUpperCase());
    });

    console.log('Form validation JavaScript betöltve');
});

