/**
 * validation.js - Űrlap validációs szkript
 * A regisztrációs űrlap mezőinek ellenőrzése és hibajelzés
 */

$(document).ready(function () {

    // ============================================================
    // VALIDÁLÓ FÜGGVÉNYEK
    // ============================================================

    // Email cím ellenőrzése regex-szel
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Magyar telefonszám ellenőrzése (pl: +36 30 123 4567)
    function validatePhone(phone) {
        const phoneRegex = /^(\+36|06)?[\s-]?[0-9]{1,2}[\s-]?[0-9]{3}[\s-]?[0-9]{3,4}$/;
        return phoneRegex.test(phone.trim());
    }

    // Teljes név ellenőrzése (min. 3 karakter és szóköz kell)
    function validateFullName(name) {
        return name.trim().length >= 3 && name.trim().includes(' ');
    }

    // Születési dátum ellenőrzése (1900 és mai nap között)
    function validateBirthDate(date) {
        if (!date) return false;
        const selectedDate = new Date(date);
        const today = new Date();
        const minDate = new Date('1900-01-01');
        return selectedDate < today && selectedDate > minDate;
    }

    // Érdeklődési kör kiválasztásának ellenőrzése
    function validateInterests() {
        return $('#interests').val() !== '' && $('#interests').val() !== null;
    }

    // ============================================================
    // HIBAJELZŐ FÜGGVÉNYEK
    // ============================================================

    // Hiba megjelenítése egy mezőnél (piros border + hibaüzenet + rázás animáció)
    function showError(fieldId, message) {
        const $field = $('#' + fieldId);
        const $error = $('#' + fieldId + 'Error');

        // Piros border hozzáadása
        $field.addClass('error');

        // Hibaüzenet megjelenítése
        $error.text(message).show();

        // Rázás animáció jQuery-vel
        $field.animate({ marginLeft: '-10px' }, 50)
            .animate({ marginLeft: '10px' }, 50)
            .animate({ marginLeft: '-10px' }, 50)
            .animate({ marginLeft: '0px' }, 50);
    }

    // Hiba eltávolítása (zöld border átmenetileg)
    function clearError(fieldId) {
        const $field = $('#' + fieldId);
        const $error = $('#' + fieldId + 'Error');

        // Hiba osztály eltávolítása
        $field.removeClass('error');

        // Hibaüzenet elrejtése
        $error.text('').hide();

        // Átmeneti zöld border a sikerhez
        $field.css('border-color', '#27ae60');

        // 2 mp után visszaáll az eredeti szín
        setTimeout(function () {
            $field.css('border-color', '');
        }, 2000);
    }

    // ============================================================
    // VALÓS IDEJŰ VALIDÁCIÓ (blur eseményre)
    // ============================================================

    // Teljes név ellenőrzése elhagyáskor
    $('#fullName').on('blur', function () {
        const name = $(this).val();
        if (!validateFullName(name)) {
            showError('fullName', 'Kérjük, adja meg teljes nevét (vezetéknév és keresztnév)!');
        } else {
            clearError('fullName');
        }
    });

    // Email ellenőrzése elhagyáskor
    $('#email').on('blur', function () {
        const email = $(this).val();
        if (!validateEmail(email)) {
            showError('email', 'Kérjük, adjon meg egy érvényes email címet!');
        } else {
            clearError('email');
        }
    });

    // Telefonszám ellenőrzése elhagyáskor
    $('#phone').on('blur', function () {
        const phone = $(this).val();
        if (!validatePhone(phone)) {
            showError('phone', 'Kérjük, adjon meg egy érvényes magyar telefonszámot!');
        } else {
            clearError('phone');
        }
    });

    // Születési dátum ellenőrzése változáskor
    $('#birthDate').on('change', function () {
        const date = $(this).val();
        if (!validateBirthDate(date)) {
            showError('birthDate', 'Kérjük, adjon meg egy érvényes születési dátumot!');
        } else {
            clearError('birthDate');
        }
    });

    // Látogatási gyakoriság ellenőrzése (0-30 között)
    $('#visitFrequency').on('blur', function () {
        const freq = parseInt($(this).val());
        if (isNaN(freq) || freq < 0 || freq > 30) {
            showError('visitFrequency', 'Kérjük, 0 és 30 közötti számot adjon meg!');
        } else {
            clearError('visitFrequency');
        }
    });

    // ============================================================
    // ŰRLAP BEKÜLDÉS KEZELÉSE
    // ============================================================

    $('#membershipForm').on('submit', function (e) {
        // Alapértelmezett form beküldés megakadályozása
        e.preventDefault();

        let isValid = true;

        // --- Minden mező ellenőrzése beküldéskor ---

        // Név validáció
        const fullName = $('#fullName').val();
        if (!validateFullName(fullName)) {
            showError('fullName', 'Kérjük, adja meg teljes nevét!');
            isValid = false;
        } else {
            clearError('fullName');
        }

        // Email validáció
        const email = $('#email').val();
        if (!validateEmail(email)) {
            showError('email', 'Kérjük, adjon meg érvényes email címet!');
            isValid = false;
        } else {
            clearError('email');
        }

        // Telefon validáció
        const phone = $('#phone').val();
        if (!validatePhone(phone)) {
            showError('phone', 'Kérjük, adjon meg érvényes telefonszámot!');
            isValid = false;
        } else {
            clearError('phone');
        }

        // Születési dátum validáció
        const birthDate = $('#birthDate').val();
        if (!validateBirthDate(birthDate)) {
            showError('birthDate', 'Kérjük, adjon meg érvényes születési dátumot!');
            isValid = false;
        } else {
            clearError('birthDate');
        }

        // Érdeklődési kör validáció
        if (!validateInterests()) {
            showError('interests', 'Kérjük, válasszon legalább egy érdeklődési kört!');
            isValid = false;
        } else {
            clearError('interests');
        }

        // Látogatási gyakoriság validáció
        const visitFreq = parseInt($('#visitFrequency').val());
        if (isNaN(visitFreq) || visitFreq < 0 || visitFreq > 30) {
            showError('visitFrequency', 'Kérjük, 0 és 30 közötti számot adjon meg!');
            isValid = false;
        } else {
            clearError('visitFrequency');
        }

        // ÁSZF elfogadás ellenőrzése
        if (!$('#acceptTerms').is(':checked')) {
            showError('acceptTerms', 'Az ÁSZF elfogadása kötelező!');
            isValid = false;
        } else {
            clearError('acceptTerms');
        }

        // --- Sikeres/sikertelen beküldés kezelése ---

        if (isValid) {
            // Sikeres üzenet megjelenítése
            $('#successMessage').addClass('show').slideDown(600);

            // Form elrejtése
            $('#membershipForm').slideUp(600);

            // Görgetés a siker üzenethez
            $('html, body').animate({
                scrollTop: $('#successMessage').offset().top - 100
            }, 600);

            // Konzol log a beküldött adatokkal
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
            // Hibadoboz létrehozása ha még nincs
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

                // Hibadoboz beszúrása a form elejére
                $('#membershipForm').prepend($errorBox);

                // Fade in animáció
                $errorBox.hide().fadeIn(400);

                // Görgetés a formhoz
                $('html, body').animate({
                    scrollTop: $('#membershipForm').offset().top - 150
                }, 400);

                // 5 mp után eltűnik a hibadoboz
                setTimeout(function () {
                    $errorBox.fadeOut(400, function () {
                        $(this).remove();
                    });
                }, 5000);
            }
        }
    });

    // ============================================================
    // SZÍN VÁLASZTÓ KEZELÉSE
    // ============================================================

    // Kedvenc szín változásakor előnézet és kód frissítése
    $('#favoriteColor').on('input change', function () {
        const color = $(this).val();
        $('#colorPreview').css('background', color);
        $('#colorCode').text(color.toUpperCase());
    });

    console.log('Form validation JavaScript betöltve');
});
