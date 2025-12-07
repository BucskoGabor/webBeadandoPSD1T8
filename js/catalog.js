

$(document).ready(function () {

    let allBooks = []; 

    
    function loadBooks() {
        $.ajax({
            url: 'data/books.json',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log('Könyvek sikeresen betöltve:', data);
                allBooks = data.library.books;
                displayBooks(allBooks);
            },
            error: function (xhr, status, error) {
                console.error('Hiba a könyvek betöltésekor:', error);
                $('#booksBody').html(
                    '<tr><td colspan="7" style="text-align: center; color: #e74c3c; padding: 2rem;">' +
                    'Hiba történt a könyvek betöltése közben. Kérjük, próbálja újra később.' +
                    '</td></tr>'
                );
            }
        });
    }

    
    function displayBooks(books) {
        
        $('#booksBody').empty();

        if (books.length === 0) {
            $('#no-results').show();
            $('#booksTable').hide();
            return;
        }

        $('#no-results').hide();
        $('#booksTable').show();

        
        books.forEach(function (book, index) {
            
            var $row = $('<tr>');

            
            $row.css('opacity', 0);

            
            var $titleCell = $('<td>').html('<strong>' + book.title + '</strong>');

            
            var authorFullName = book.author.firstName + ' ' + book.author.lastName;
            var $authorCell = $('<td>').text(authorFullName);

            
            var $categoryCell = $('<td>').html(
                '<span style="background: #3498db; color: white; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.85rem;">' +
                book.category +
                '</span>'
            );

            
            var $yearCell = $('<td>').text(book.publishYear);

            
            var $isbnCell = $('<td>').text(book.isbn);

            
            var statusText = book.available ?
                '<span style="color: #27ae60; font-weight: bold;">✓ Elérhető</span>' :
                '<span style="color: #e74c3c; font-weight: bold;">✗ Kölcsönzött</span>';
            var $statusCell = $('<td>').html(statusText);

            
            var stars = '⭐'.repeat(Math.floor(book.rating));
            var $ratingCell = $('<td>').html(stars + ' ' + book.rating);

            
            $row.append($titleCell, $authorCell, $categoryCell, $yearCell, $isbnCell, $statusCell, $ratingCell);

            
            $('#booksBody').append($row);

            
            $row.delay(50 * index).animate({
                opacity: 1
            }, 400);

            
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

    
    $('#searchInput').on('keyup', function () {
        var searchTerm = $(this).val().toLowerCase();

        
        var filteredBooks = allBooks.filter(function (book) {
            var titleMatch = book.title.toLowerCase().includes(searchTerm);
            var authorMatch = (book.author.firstName + ' ' + book.author.lastName).toLowerCase().includes(searchTerm);
            return titleMatch || authorMatch;
        });

        displayBooks(filteredBooks);

        
        $(this).css('border-color', filteredBooks.length > 0 ? '#27ae60' : '#e74c3c');
    });

    
    $('.filter-btn').on('click', function () {
        
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        var category = $(this).data('category');

        
        $('#searchInput').val('').css('border-color', '#3498db');

        if (category === 'all') {
            displayBooks(allBooks);
        } else {
            var filteredBooks = allBooks.filter(function (book) {
                return book.category === category;
            });
            displayBooks(filteredBooks);
        }

        
        $(this).animate({
            fontSize: '1.1em'
        }, 100).animate({
            fontSize: '1em'
        }, 100);
    });

    
    loadBooks();

    console.log('Catalog JavaScript betöltve - AJAX funkció aktív');
});
