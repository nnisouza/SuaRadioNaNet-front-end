$(document).ready(function() {
    var primalContent = null;

    function saveMe() {
        var currentContent = $(this).text();

        if(currentContent.length == '0') {
            alert('O campo não pode ficar vazio.');
            $(this).focus();
            return false;
        } else {
            if(primalContent == currentContent){
                console.log('Nâo salva o texto: ' + currentContent);
                return false;
            } else {
                console.log('Salva o texto: ' + currentContent);
                return true;
            }
        }
    }

    $('.liveT').each(function() {
        $(this).attr({
            'aria-label': 'Insira um texto',
            'contenteditable': true,
            'spellcheck': false
        });
    });

    $('.liveT').focus(function(e) {
        primalContent = $(this).text();
    })
    .on('blur', saveMe)
    .on('keydown', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code === 13) {
            return false;
        }
    })
    .on('keypress', function(e) {
        var code = (e.keyCode || e.which);
        if(code === 13) {
            return false;
        }
    })
    .on('keyup', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);

        if (code === 13) {
            $(this).blur();
            return false;
        }
    });

    function themer(hex) {
        $('.customBG').css({'background-color': hex});
        $('.customColor').css({'color': hex});
        $('.dcustomColor').css({'border-color': hex});
    }

    $('#gearStick').click(function() {
        $('#gearStick').removeClass('open');
        setTimeout(function(){
            $('#gearBox').addClass('open');
        }, 300);
    });

    $('#setStick').click(function() {
        $('#gearBox').removeClass('open');
        setTimeout(function(){
            $('#gearStick').addClass('open');
        }, 300);
    });

    $('#gearBox h3').click(function() {
        var id = $(this).data('tab');
        if($(this).hasClass('current')) {
            $(this).removeClass('current');
            $('.section#' + id).slideUp();
        } else {
            $(this).addClass('current');
            $('.section#' + id).slideDown();
        }
    });

    $('.colorPicker').minicolors({
        change: function(hex) {
            themer(hex);
        }
    });

    $('.colorPicker').focusin(function() {
        $(this).addClass('focused');
    });
    $('.colorPicker').focusout(function() {
        $(this).removeClass('focused');
    });

    $('.colorPalete li').each(function() {
        var bgColor = $(this).data('color');

        $(this).css({
            'background-color': bgColor
        });
    });

    $('.colorPalete li').click(function() {
        var hex = $(this).data('color');
        themer(hex);
    });

    $('.themeColor li').click(function() {
        var soul = $(this).data('soul');

        if(soul == 'dark') {
            $('body').removeClass('white').addClass('dark');
        } else if(soul == 'white') {
            $('body').removeClass('dark').addClass('white');
        }

        frameLooper();
    });

});
