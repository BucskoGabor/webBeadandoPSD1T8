/**
 * catalog.js - Könyvkatalógus kezelő szkript
 * Könyvek betöltése JSON-ból, keresés és szűrés
 */

$(document).ready(function () {

    // Összes könyv tárolása (szűréshez szükséges)
    let allBooks = [];

    // ============================================================
    // KÖNYVEK BETÖLTÉSE AJAX-SZAL
    // ============================================================

    function loadBooks() {
        $.ajax({
            url: 'data/books.json',       // JSON fájl elérési útja
            method: 'GET',                 // HTTP metódus
            dataType: 'json',              // Várt válasz típus
            success: function (data) {
                // Sikeres betöltés
                console.log('Könyvek sikeresen betöltve:', data);
                allBooks = data.library.books;
                displayBooks(allBooks);
            },
            error: function (xhr, status, error) {
                // Hiba esetén üzenet a táblázatban
                console.error('Hiba a könyvek betöltésekor:', error);
                $('#booksBody').html(
                    '<tr><td colspan="7" style="text-align: center; color: #e74c3c; padding: 2rem;">' +
                    'Hiba történt a könyvek betöltése közben. Kérjük, próbálja újra később.' +
                    '</td></tr>'
                );
            }
        });
    }

    // ============================================================
    // KÖNYVEK MEGJELENÍTÉSE TÁBLÁZATBAN
    // ============================================================

    function displayBooks(books) {
        // Táblázat törzsének kiürítése
        $('#booksBody').empty();

        // Ha nincs találat
        if (books.length === 0) {
            $('#no-results').show();
            $('#booksTable').hide();
            return;
        }

        $('#no-results').hide();
        $('#booksTable').show();

        // Minden könyvhöz sor generálása
        books.forEach(function (book, index) {
            // Új sor létrehozása
            var $row = $('<tr>');

            // Kezdeti átlátszóság (animációhoz)
            $row.css('opacity', 0);

            // Cím cella (félkövér)
            var $titleCell = $('<td>').html('<strong>' + book.title + '</strong>');

            // Szerző cella (vezeték+keresztnév)
            var authorFullName = book.author.firstName + ' ' + book.author.lastName;
            var $authorCell = $('<td>').text(authorFullName);

            // Kategória cella (badge stílusú)
            var $categoryCell = $('<td>').html(
                '<span style="background: #3498db; color: white; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.85rem;">' +
                book.category +
                '</span>'
            );

            // Kiadási év cella
            var $yearCell = $('<td>').text(book.publishYear);

            // ISBN cella
            var $isbnCell = $('<td>').text(book.isbn);

            // Elérhetőség cella (zöld/piros)
            var statusText = book.available ?
                '<span style="color: #27ae60; font-weight: bold;">✓ Elérhető</span>' :
                '<span style="color: #e74c3c; font-weight: bold;">✗ Kölcsönzött</span>';
            var $statusCell = $('<td>').html(statusText);

            // Értékelés cella (csillagok + szám)
            var stars = '⭐'.repeat(Math.floor(book.rating));
            var $ratingCell = $('<td>').html(stars + ' ' + book.rating);

            // Cellák hozzáadása a sorhoz
            $row.append($titleCell, $authorCell, $categoryCell, $yearCell, $isbnCell, $statusCell, $ratingCell);

            // Sor hozzáadása a táblázathoz
            $('#booksBody').append($row);

            // Fokozatos fade in animáció
            $row.delay(50 * index).animate({
                opacity: 1
            }, 400);

            // Hover effekt a sorokhoz
            $row.hover(
                function () {
                    $(this).css({
                        'background-color': '#e8f4f8',
                        'transform': 'scale(1.01)',
                        'box-shadow': '0 2px 8px rgba(0,0,0,0.1)'
                    });
                },
                function () {
                    $(this).css({
                        'background-color': '',
                        'transform': 'scale(1)',
                        'box-shadow': 'none'
                    });
                }
            );

            // Kattintásra könyv részletek popup
            $row.on('click', function () {
                alert(
                    'Könyv részletei:\n\n' +
                    'Cím: ' + book.title + '\n' +
                    'Szerző: ' + authorFullName + '\n' +
                    'Kategória: ' + book.category + '\n' +
                    'Kiadás éve: ' + book.publishYear + '\n' +
                    'ISBN: ' + book.isbn + '\n' +
                    'Leírás: ' + book.description + '\n' +
                    'Értékelés: ' + book.rating + '/5\n' +
                    'Státusz: ' + (book.available ? 'Elérhető' : 'Kölcsönzött')
                );
            });
        });
    }

    // ============================================================
    // KERESÉS FUNKCIÓ
    // ============================================================

    // Valós idejű keresés gépelés közben
    $('#searchInput').on('keyup', function () {
        var searchTerm = $(this).val().toLowerCase();

        // Szűrés cím és szerző alapján
        var filteredBooks = allBooks.filter(function (book) {
            var titleMatch = book.title.toLowerCase().includes(searchTerm);
            var authorMatch = (book.author.firstName + ' ' + book.author.lastName).toLowerCase().includes(searchTerm);
            return titleMatch || authorMatch;
        });

        displayBooks(filteredBooks);

        // Border szín: zöld ha van találat, piros ha nincs
        $(this).css('border-color', filteredBooks.length > 0 ? '#27ae60' : '#e74c3c');
    });

    // ============================================================
    // KATEGÓRIA SZŰRÉS
    // ============================================================

    // Szűrő gombok kezelése
    $('.filter-btn').on('click', function () {
        // Aktív gomb frissítése
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        var category = $(this).data('category');

        // Keresőmező törlése
        $('#searchInput').val('').css('border-color', '#3498db');

        // Szűrés kategória alapján
        if (category === 'all') {
            displayBooks(allBooks);
        } else {
            var filteredBooks = allBooks.filter(function (book) {
                return book.category === category;
            });
            displayBooks(filteredBooks);
        }

        // Gomb kattintás animáció
        $(this).animate({
            fontSize: '1.1em'
        }, 100).animate({
            fontSize: '1em'
        }, 100);
    });

    // ============================================================
    // INICIALIZÁLÁS
    // ============================================================

    // Könyvek betöltése oldal betöltésekor
    loadBooks();

    console.log('Catalog JavaScript betöltve - AJAX funkció aktív');
});
