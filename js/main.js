
$(document).ready(function () {

    $('.hero, article, .card').each(function (index) {
        $(this).delay(100 * index).fadeIn(800);
    });

    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if ($(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 100
            }, 600);
        }
    });

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


    if ($('#new-books').length > 0) {
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

        newBooks.forEach(function (book) {
            var $newCard = $('<div>', {
                class: 'card'
            });

            var $title = $('<h3>').text(book.title);

            var $author = $('<p>').html('<strong>Szerző:</strong> ' + book.author);

            var $description = $('<p>').text(book.description);

            var $button = $('<a>', {
                href: 'catalog.html',
                class: 'button button-primary',
                text: 'Részletek'
            });

            $newCard.append($title, $author, $description, $button);

            $('#new-books').append($newCard);

            $newCard.hide().fadeIn(800);
        });
    }


    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 100) {
            $('#header').css({
                'background': 'rgba(44, 62, 80, 0.98)',
                'box-shadow': '0 4px 20px rgba(0,0,0,0.2)'
            });
            $('#header h1').css('color', '#ffffff');
        } else {
            $('#header').css({
                'background': 'rgba(255, 255, 255, 0.95)',
                'box-shadow': '0 2px 10px rgba(0,0,0,0.1)'
            });
            $('#header h1').css('color', '#2c3e50');
        }
    });


    $('p').on('click', function () {
        $(this).css({
            'background-color': '#fffbcc',
            'transition': 'background-color 0.3s'
        });

        setTimeout(() => {
            $(this).css('background-color', 'transparent');
        }, 2000);
    });


    $('.button').hover(
        function () {
            $(this).css('transform', 'translateY(-3px) scale(1.05)');
        },
        function () {
            $(this).css('transform', 'translateY(0) scale(1)');
        }
    );


    $('aside').hide().slideDown(1000);


    $('#readingSpeed').on('input', function () {
        $('#speedValue').text($(this).val());
        $('#speedValue').hide().fadeIn(200);
    });


    console.log('Könyvtár weboldal JavaScript betöltve!');
    console.log('jQuery verzió:', $.fn.jquery);


    if ($(window).width() < 768) {
        $('nav ul').hide();

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

            $menuBtn.on('click', function () {
                $('nav ul').slideToggle(400);
            });
        }
    }


    $('section h2').hide().slideDown(800);

    $('article').css('opacity', 0).animate({
        opacity: 1
    }, 1200);

});


document.addEventListener('DOMContentLoaded', function () {

    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('#footer p');
    if (footerText && footerText.textContent.includes('2024')) {
        footerText.textContent = footerText.textContent.replace('2024', currentYear);
    }

});
