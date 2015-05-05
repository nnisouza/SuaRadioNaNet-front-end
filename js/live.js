$(document).ready(function() {
    var primalContent = null;

    

    $('.liveT').dblclick(allowEdit);
    
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
    
    
    
    
    
    
    
//    Caixa de informações

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
    
    $('.dense').each(function() {
        var adWidth = $(this).data('adwidth'),
            adHeight = $(this).data('adheight'),
            sizeText;
        
        if($(this).hasClass('d468-60')){
            sizeText = '';
        } else {
            sizeText = 'Tamanho do banner';
        }
        
        var layerDense = '<div class="editLayer"><div><ul class="clearfix"><li class="image"><a href="javascript:void(0);"><i class="fa fa-cloud-upload fa-2x"></i><span>Enviar IMG</span></a><div class="toltip customBG hidden">' + sizeText + ' ' + adWidth + 'x' + adHeight + '</div></li><li class="link"><a href="javascript:void(0);"><i class="fa fa-link fa-2x"></i><span>Link</span></a><div class="toltip customBG hidden"><input type="text" placeholder="http://"/></div></li><li class="delete"><a href="javascript:void(0);"><i class="fa fa-trash-o fa-2x"></i><span>Excluir</span></a></li></ul></div></div>';
        $(this).prepend(layerDense);
    });
    
    $('.editLayer li>a').click(function() {
        if($(this).hasClass('customColor')){
            
            $(this).removeClass('customColor');
            $('.toltip').addClass('hidden');
            
        } else {
            $('.editLayer li a').removeClass('customColor');
            $('.toltip').addClass('hidden');
            $(this).addClass('customColor');
            $(this).parent('li').find('.toltip').removeClass('hidden');
        }
    });
    $('.editLayer li.delete').click(function() {
        if (confirm('Do you wanna die?')) {
            alert('Morreu!');
        } else {
            alert('Salvou-se!');
        }
    });
    
    
    
    
    
    
    
    function allowEdit() {
        $(this).attr({
            'aria-label': 'Insira um texto',
            'contenteditable': true,
            'spellcheck': false
        })
        .focus();
    }
    
    function saveMe() {
        var currentContent = $(this).text();
        
        if(currentContent.length == '0') {
            alert('O campo não pode ficar vazio.');
            $(this).focus();
            return false;
        } else {
            $(this).removeAttr('contenteditable');
            if(primalContent == currentContent){
                console.log('Nâo salva o texto: ' + currentContent);
                return false;
            } else {
                console.log('Salva o texto: ' + currentContent);
                
                
//                Se for dentro da modal
                if($(this).hasClass('innerModal')){
                    if($(this).prop("tagName") == 'H2'){
                        var novidadeId = $(this).data('novidadeid');
                        $('#novidadeSlider #' + novidadeId).data('title', currentContent).find('p').text(currentContent);
                    } else if($(this).prop("tagName") == 'P'){
                        var novidadeId = $(this).data('novidadeid');
                        $('#novidadeSlider #' + novidadeId).data('text', currentContent);
                    }
                }
                
                return true;
            }
        }
    }
    
    function themer(hex) {
        $('.customBG').css({'background-color': hex});
        $('.customColor').css({'color': hex});
        $('.dcustomColor').css({'border-color': hex});
    }
});
