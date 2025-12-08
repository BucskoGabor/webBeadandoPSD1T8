/**
 * main.js - Fő JavaScript fájl
 * Általános animációk és interaktív funkciók az egész oldalon
 */

$(document).ready(function () {

    // ============================================================
    // BETÖLTÉSI ANIMÁCIÓK
    // ============================================================

    // Hero, article és card elemek fokozatos megjelenítése
    $('.hero, article, .card').each(function (index) {
        $(this).delay(100 * index).fadeIn(800);
    });

    // ============================================================
    // NAVIGÁCIÓ
    // ============================================================

    // Smooth scroll belső linkekhez (#id hivatkozások)
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if ($(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 100
            }, 600);
        }
    });

    // ============================================================
    // KÁRTYA HOVER EFFEKT
    // ============================================================

    // Kártyák emelkedés effektje hover-re
    $('.card').hover(
        function () {
            $(this).animate({
                marginTop: '-5px'
            }, 200);
        },
        function () {
            $(this).animate({
                marginTop: '0px'
            }, 200);
        }
    );

    // ============================================================
    // ÚJ KÖNYVEK DINAMIKUS GENERÁLÁSA
    // ============================================================

    // Ha létezik #new-books konténer, könyvkártyák generálása
    if ($('#new-books').length > 0) {
        // Könyv adatok tömbje
        const newBooks = [
            {
                title: "A szél neve",
                author: "Patrick Rothfuss",
                description: "Egy varázslatos történet egy legendás mágusról."
            },
            {
                title: "Sapiens",
                author: "Yuval Noah Harari",
                description: "Az emberiség rövid története innovatív megközelítésben."
            },
            {
                title: "1984",
                author: "George Orwell",
                description: "Disztópikus jövőkép egy totalitárius világról."
            }
        ];

        // Minden könyvhöz kártya létrehozása
        newBooks.forEach(function (book) {
            // Kártya konténer
            var $newCard = $('<div>', {
                class: 'card'
            });

            // Könyv címe
            var $title = $('<h3>').text(book.title);

            // Szerző neve
            var $author = $('<p>').html('<strong>Szerző:</strong> ' + book.author);

            // Rövid leírás
            var $description = $('<p>').text(book.description);

            // Részletek gomb
            var $button = $('<a>', {
                href: 'catalog.html',
                class: 'button button-primary',
                text: 'Részletek'
            });

            // Elemek összeállítása és hozzáadása
            $newCard.append($title, $author, $description, $button);
            $('#new-books').append($newCard);

            // Fade in animáció
            $newCard.hide().fadeIn(800);
        });
    }

    // ============================================================
    // HEADER SCROLL EFFEKT
    // ============================================================

    // Header háttérszín változtatása görgetéskor
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 100) {
            // Sötét header 100px görgetés után
            $('#header').css({
                'background': 'rgba(44, 62, 80, 0.98)',
                'box-shadow': '0 4px 20px rgba(0,0,0,0.2)'
            });
            $('#header h1').css('color', '#ffffff');
        } else {
            // Világos header felül
            $('#header').css({
                'background': 'rgba(255, 255, 255, 0.95)',
                'box-shadow': '0 2px 10px rgba(0,0,0,0.1)'
            });
            $('#header h1').css('color', '#2c3e50');
        }
    });

    // ============================================================
    // BEKEZDÉS KIEMELÉS
    // ============================================================

    // Bekezdésekre kattintva ideiglenes sárga háttér
    $('p').on('click', function () {
        $(this).css({
            'background-color': '#fffbcc',
            'transition': 'background-color 0.3s'
        });

        // 2 mp után visszaáll
        setTimeout(() => {
            $(this).css('background-color', 'transparent');
        }, 2000);
    });

    // ============================================================
    // GOMB HOVER EFFEKT
    // ============================================================

    // Gombok emelkedés és nagyítás effektje
    $('.button').hover(
        function () {
            $(this).css('transform', 'translateY(-3px) scale(1.05)');
        },
        function () {
            $(this).css('transform', 'translateY(0) scale(1)');
        }
    );

    // ============================================================
    // OLDALSÁV ANIMÁCIÓ
    // ============================================================

    // Aside elem lecsúsztatása betöltéskor
    $('aside').hide().slideDown(1000);

    // ============================================================
    // OLVASÁSI SEBESSÉG CSÚSZKA
    // ============================================================

    // Csúszka értékének megjelenítése változáskor
    $('#readingSpeed').on('input', function () {
        $('#speedValue').text($(this).val());
        $('#speedValue').hide().fadeIn(200);
    });

    // Debug info konzolba
    console.log('Könyvtár weboldal JavaScript betöltve!');
    console.log('jQuery verzió:', $.fn.jquery);

    // ============================================================
    // MOBIL MENÜ
    // ============================================================

    // Hamburger menü gomb mobil nézethez (768px alatt)
    if ($(window).width() < 768) {
        $('nav ul').hide();

        // Menü gomb létrehozása ha még nincs
        if ($('#mobile-menu-btn').length === 0) {
            var $menuBtn = $('<button>', {
                id: 'mobile-menu-btn',
                class: 'button',
                text: '☰ Menü',
                css: {
                    display: 'block',
                    margin: '0 auto 1rem'
                }
            });

            $('nav').prepend($menuBtn);

            // Kattintásra menü megjelenítés/elrejtés
            $menuBtn.on('click', function () {
                $('nav ul').slideToggle(400);
            });
        }
    }

    // ============================================================
    // TOVÁBBI ANIMÁCIÓK
    // ============================================================

    // Section címek lecsúsztatása
    $('section h2').hide().slideDown(800);

    // Article elemek fade in
    $('article').css('opacity', 0).animate({
        opacity: 1
    }, 1200);

});

// ============================================================
// LÁBLÉC ÉV FRISSÍTÉS (Vanilla JS)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    // Aktuális év beszúrása a lábléc szövegébe
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('#footer p');
    if (footerText && footerText.textContent.includes('2024')) {
        footerText.textContent = footerText.textContent.replace('2024', currentYear);
    }
});
