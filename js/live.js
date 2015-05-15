$(document).ready(function() {
    var primalContent = null;

    $('body').addClass('live');
    
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
    
    
    $('.menu li div').click(function() {
        if ($('body').hasClass('live')){
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
        
        var layerDense = '';
        
        layerDense = '<div class="imageUploadHolder"></div>';
        layerDense += '<div class="editLayer">';
            layerDense += '<div>';
                layerDense += '<ul class="clearfix">';
                    layerDense += '<li class="image">';
                        layerDense += '<a href="javascript:void(0);"><i class="fa fa-cloud-upload fa-2x"></i><span>Enviar IMG</span></a>';
                        layerDense += '<div class="toltip customBG hidden">';
                            layerDense += sizeText;
                            layerDense += ' ';
                            layerDense += adWidth;
                            layerDense += 'x';
                            layerDense += adHeight;
                        layerDense += '</div>';
                    layerDense += '</li>';

                    layerDense += '<li class="link">';
                        layerDense += '<a href="javascript:void(0);"><i class="fa fa-link fa-2x"></i><span>Link</span></a>';
                        layerDense += '<div class="toltip customBG hidden">';
                            layerDense += '<input type="text" placeholder="http://"/>';
                        layerDense += '</div>';
                    layerDense += '</li>';
        
                    layerDense += '<li class="delete">';
                        layerDense += '<a href="javascript:void(0);"><i class="fa fa-trash-o fa-2x"></i><span>Excluir</span></a>';
                    layerDense += '</li>';
                layerDense += '</ul>';
            layerDense += '</div>';
        layerDense += '</div>';
        layerDense += '';
        $(this).prepend(layerDense);
    });
    
    $('.editLayer li>a').click(function() {
        if($(this).hasClass('customColor')){
            
            $(this).removeClass('customColor');
            $('.toltip').addClass('hidden');
            $('.dense').removeClass('uploading');
            
        } else {
            $('.editLayer li a').removeClass('customColor');
            $('.toltip').addClass('hidden');
            $('.dense').removeClass('uploading');
            $(this).addClass('customColor');
            $(this).parent('li').find('.toltip').removeClass('hidden');
        }
    });
    $('.editLayer li.delete').click(function() {
        if (confirm('Tem certeza que deseja excluir este item?')) {
            alert('Deletado com sucesso');
        } else {
            return false;
        }
    });
    
    
    Dropzone.autoDiscover = false;
            
    $('.editLayer li.image').click(function() {
        $parents = $(this).parents('.dense');
        $parents.prepend('<form method="post" class="dropzone"></form>');
        var whereToPut = $(this).parents('.dense').find('.imageUploadHolder');
        var dataW = $(this).parents('.dense').data('adwidth');
        var dataH = $(this).parents('.dense').data('adheight');
        
        $element = $(this);
        $parent = $(this).parents('.dense').find('.dz-preview');
        $parents.addClass('uploading');
        
        var myDrop = $(this).parents('.dense').find('.dropzone');
        
        var myDropzone = new Dropzone('.dropzone', {
            url: "upload.php",
            thumbnailWidth: dataW,
            thumbnailHeight: dataH,
            maxFiles: 1,
            previewsContainer: whereToPut,
            success: function(elem) {
                $element.parents('.dense').find('.dz-preview').addClass('dz-success');
                $('.editLayer li a').removeClass('customColor');
                $('.toltip').addClass('hidden');
                
                
                setTimeout(function(){
                    $parents.removeClass('uploading');
                    myDropzone.removeAllFiles();
                }, 1500);
            },
            error: function() {
                $parents.find('form').remove();
//                $element.parents('.dense').find('.dz-preview:last-child').remove();
                $element.parents('.dense').find('.dz-preview').addClass('dz-error');
                setTimeout(function(){
                    Dropzone.removeAllFiles();
                    $element.parents('.dense').find('.dz-preview').slideUp();
                    $parents.removeClass('uploading');
                }, 1500);
            }
        });
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
