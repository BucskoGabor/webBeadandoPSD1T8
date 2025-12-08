/**
 * video.js - Egyedi videó lejátszó vezérlő
 * Lejátszás, hangerő, fullscreen és billentyűzet vezérlés
 */

$(document).ready(function () {

    // ============================================================
    // VIDEÓ ELEM REFERENCIA
    // ============================================================

    const video = document.getElementById('libraryVideo');

    // Ha nincs videó elem az oldalon, kilépés
    if (!video) {
        console.log('Videó elem nem található az oldalon');
        return;
    }

    // ============================================================
    // KONTROL ELEMEK REFERENCIÁI
    // ============================================================

    const $playPauseBtn = $('#playPauseBtn');      // Play/Pause gomb
    const $stopBtn = $('#stopBtn');                 // Stop gomb
    const $volumeControl = $('#volumeControl');     // Hangerő csúszka
    const $progressBar = $('#progressBar');         // Időcsúszka
    const $fullscreenBtn = $('#fullscreenBtn');     // Teljes képernyő gomb

    // ============================================================
    // PLAY/PAUSE GOMB
    // ============================================================

    $playPauseBtn.on('click', function () {
        if (video.paused) {
            // Ha áll, indítás
            video.play();
            $(this).html('⏸ Szünet');
            $(this).removeClass('button-primary').addClass('button-secondary');
        } else {
            // Ha megy, megállítás
            video.pause();
            $(this).html('▶ Lejátszás');
            $(this).removeClass('button-secondary').addClass('button-primary');
        }
    });

    // ============================================================
    // STOP GOMB
    // ============================================================

    $stopBtn.on('click', function () {
        video.pause();                          // Megállítás
        video.currentTime = 0;                  // Visszaugrás az elejére
        $playPauseBtn.html('▶ Lejátszás');
        $playPauseBtn.removeClass('button-secondary').addClass('button-primary');
        $progressBar.val(0);
    });

    // ============================================================
    // HANGERŐ VEZÉRLÉS
    // ============================================================

    $volumeControl.on('input', function () {
        // Hangerő 0-100 -> 0-1 konverzió
        const volume = $(this).val() / 100;
        video.volume = volume;

        // Kijelző frissítése
        $('#volumeValue').text($(this).val());
    });

    // ============================================================
    // IDŐCSÚSZKA FRISSÍTÉSE
    // ============================================================

    // Lejátszás közben folyamatosan frissül
    video.addEventListener('timeupdate', function () {
        if (video.duration) {
            // Százalékos pozíció kiszámítása
            const progress = (video.currentTime / video.duration) * 100;
            $progressBar.val(progress);

            // Idő kijelzés formázása
            const current = formatTime(video.currentTime);
            const total = formatTime(video.duration);

            $('#currentTime').text(current);
            $('#duration').text(total);
        }
    });

    // Csúszka húzása: pozíció állítás
    $progressBar.on('input', function () {
        const time = ($(this).val() / 100) * video.duration;
        video.currentTime = time;
    });

    // ============================================================
    // TELJES KÉPERNYŐ
    // ============================================================

    $fullscreenBtn.on('click', function () {
        if (!document.fullscreenElement) {
            // Belépés fullscreen módba (böngésző-kompatibilis)
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
            $(this).html('⛶ Kilépés');
        } else {
            // Kilépés fullscreen módból
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            $(this).html('⛶ Teljes képernyő');
        }
    });

    // Fullscreen változás figyelése (pl. ESC billentyűre)
    document.addEventListener('fullscreenchange', function () {
        if (!document.fullscreenElement) {
            $fullscreenBtn.html('⛶ Teljes képernyő');
        }
    });

    // ============================================================
    // IDŐ FORMÁZÓ SEGÉDFÜGGVÉNY
    // ============================================================

    // Másodpercek -> perc:másodperc formátum
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';

        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return minutes + ':' + (secs < 10 ? '0' : '') + secs;
    }

    // ============================================================
    // VIDEÓ METAADAT BETÖLTÉS
    // ============================================================

    // Videó teljes hosszának kijelzése betöltés után
    video.addEventListener('loadedmetadata', function () {
        $('#duration').text(formatTime(video.duration));
        console.log('Videó metaadatok betöltve. Időtartam:', formatTime(video.duration));
    });

    // ============================================================
    // VIDEÓ VÉGE ESEMÉNY
    // ============================================================

    video.addEventListener('ended', function () {
        // Gombok visszaállítása
        $playPauseBtn.html('▶ Lejátszás');
        $playPauseBtn.removeClass('button-secondary').addClass('button-primary');
        $progressBar.val(0);

        // Befejezés üzenet megjelenítése
        const $message = $('<div>', {
            css: {
                background: '#27ae60',
                color: 'white',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center',
                marginTop: '1rem'
            },
            html: '✅ Videó lejátszás befejeződött!'
        });

        $('.video-container').after($message);

        // 3 mp után eltűnik az üzenet
        $message.hide().fadeIn(400).delay(3000).fadeOut(400, function () {
            $(this).remove();
        });
    });

    // ============================================================
    // BILLENTYŰZET VEZÉRLÉS
    // ============================================================

    $(document).on('keydown', function (e) {
        // Csak ha a videó látható
        if ($('#libraryVideo:visible').length > 0) {
            switch (e.key) {
                case ' ':           // SZÓKÖZ: play/pause
                    e.preventDefault();
                    $playPauseBtn.click();
                    break;
                case 'ArrowRight':  // JOBBRA: +5 mp
                    e.preventDefault();
                    video.currentTime += 5;
                    break;
                case 'ArrowLeft':   // BALRA: -5 mp
                    e.preventDefault();
                    video.currentTime -= 5;
                    break;
                case 'ArrowUp':     // FEL: hangerő +10%
                    e.preventDefault();
                    const newVolumeUp = Math.min(100, parseInt($volumeControl.val()) + 10);
                    $volumeControl.val(newVolumeUp).trigger('input');
                    break;
                case 'ArrowDown':   // LE: hangerő -10%
                    e.preventDefault();
                    const newVolumeDown = Math.max(0, parseInt($volumeControl.val()) - 10);
                    $volumeControl.val(newVolumeDown).trigger('input');
                    break;
                case 'f':           // F: fullscreen
                case 'F':
                    e.preventDefault();
                    $fullscreenBtn.click();
                    break;
            }
        }
    });

    // ============================================================
    // KONTROL GOMBOK HOVER EFFEKT
    // ============================================================

    $('.video-controls button').hover(
        function () {
            $(this).css({
                'transform': 'scale(1.05)',
                'box-shadow': '0 4px 15px rgba(0,0,0,0.2)'
            });
        },
        function () {
            $(this).css({
                'transform': 'scale(1)',
                'box-shadow': ''
            });
        }
    );

    // Debug info konzolba
    console.log('Video controls JavaScript betöltve');
    console.log('Billentyűzet vezérlés: Szóköz (play/pause), Nyilak (navigáció, hangerő), F (fullscreen)');
});
