

$(document).ready(function () {

    
    const video = document.getElementById('libraryVideo');

    if (!video) {
        console.log('Videó elem nem található az oldalon');
        return;
    }

    
    const $playPauseBtn = $('#playPauseBtn');
    const $stopBtn = $('#stopBtn');
    const $volumeControl = $('#volumeControl');
    const $progressBar = $('#progressBar');
    const $fullscreenBtn = $('#fullscreenBtn');

    
    $playPauseBtn.on('click', function () {
        if (video.paused) {
            video.play();
            
            $(this).html('⏸ Szünet');
            $(this).removeClass('button-primary').addClass('button-secondary');
        } else {
            video.pause();
            $(this).html('▶ Lejátszás');
            $(this).removeClass('button-secondary').addClass('button-primary');
        }
    });

    
    $stopBtn.on('click', function () {
        video.pause();
        video.currentTime = 0;
        $playPauseBtn.html('▶ Lejátszás');
        $playPauseBtn.removeClass('button-secondary').addClass('button-primary');
        $progressBar.val(0);
    });

    
    $volumeControl.on('input', function () {
        const volume = $(this).val() / 100;
        video.volume = volume;

        
        $('#volumeValue').text($(this).val());
    });

    
    video.addEventListener('timeupdate', function () {
        if (video.duration) {
            const progress = (video.currentTime / video.duration) * 100;
            $progressBar.val(progress);

            
            const current = formatTime(video.currentTime);
            const total = formatTime(video.duration);

            $('#currentTime').text(current);
            $('#duration').text(total);
        }
    });

    
    $progressBar.on('input', function () {
        const time = ($(this).val() / 100) * video.duration;
        video.currentTime = time;
    });

    
    $fullscreenBtn.on('click', function () {
        if (!document.fullscreenElement) {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
            $(this).html('⛶ Kilépés');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            $(this).html('⛶ Teljes képernyő');
        }
    });

    
    document.addEventListener('fullscreenchange', function () {
        if (!document.fullscreenElement) {
            $fullscreenBtn.html('⛶ Teljes képernyő');
        }
    });

    
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';

        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return minutes + ':' + (secs < 10 ? '0' : '') + secs;
    }

    
    video.addEventListener('loadedmetadata', function () {
        $('#duration').text(formatTime(video.duration));
        console.log('Videó metaadatok betöltve. Időtartam:', formatTime(video.duration));
    });

    
    video.addEventListener('ended', function () {
        $playPauseBtn.html('▶ Lejátszás');
        $playPauseBtn.removeClass('button-secondary').addClass('button-primary');
        $progressBar.val(0);

        
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

        
        $message.hide().fadeIn(400).delay(3000).fadeOut(400, function () {
            $(this).remove();
        });
    });

    
    $(document).on('keydown', function (e) {
        
        if ($('#libraryVideo:visible').length > 0) {
            switch (e.key) {
                case ' ': 
                    e.preventDefault();
                    $playPauseBtn.click();
                    break;
                case 'ArrowRight': 
                    e.preventDefault();
                    video.currentTime += 5;
                    break;
                case 'ArrowLeft': 
                    e.preventDefault();
                    video.currentTime -= 5;
                    break;
                case 'ArrowUp': 
                    e.preventDefault();
                    const newVolumeUp = Math.min(100, parseInt($volumeControl.val()) + 10);
                    $volumeControl.val(newVolumeUp).trigger('input');
                    break;
                case 'ArrowDown': 
                    e.preventDefault();
                    const newVolumeDown = Math.max(0, parseInt($volumeControl.val()) - 10);
                    $volumeControl.val(newVolumeDown).trigger('input');
                    break;
                case 'f': 
                case 'F':
                    e.preventDefault();
                    $fullscreenBtn.click();
                    break;
            }
        }
    });

    
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

    console.log('Video controls JavaScript betöltve');
    console.log('Billentyűzet vezérlés: Szóköz (play/pause), Nyilak (navigáció, hangerő), F (fullscreen)');
});
