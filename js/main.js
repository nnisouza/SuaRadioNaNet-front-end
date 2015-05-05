$(document).ready(function() {


//    funções do player
    var audio = new Audio();
    audio.source = 'http://50.7.66.10:10342/stream';
    audio.controls = false;
    audio.loop = true;
    audio.autoplay = true;
    var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
    initPlayer();

    function initPlayer(){
        document.getElementById('audio_box').appendChild(audio);
        context = new AudioContext();
        analyser = context.createAnalyser();
        canvas = document.getElementById('analyser_render');
        ctx = canvas.getContext('2d');
        source = context.createMediaElementSource(audio);
        console.log(source);
        source.connect(analyser);
        analyser.connect(context.destination);
        frameLooper();
    }
    function frameLooper(){
        var barColor;
        if($('body').hasClass('dark')){
            barColor = '#21252b';
        } else {
            barColor = '#ffffff';
        }
        window.requestAnimationFrame(frameLooper);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = barColor;
        bars = 7;
        for (var i = 0; i < bars; i++) {
            bar_x = i * 45;
            bar_width = 28;
            bar_height = -(fbc_array[i] / 10 * 5.3);
            ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
        }
    }

    $('.header button.play').click(function() {
        $(this).find('i').each(function() {
            if($(this).hasClass('fa-play')) {
                $(this).removeClass('fa-play').addClass('fa-pause');
//                $('#bars').addClass('playing');
                audio.play();
            } else {
                $(this).removeClass('fa-pause').addClass('fa-play');
//                $('#bars').removeClass('playing');
                audio.pause();
            }
        });
    });

    $('button#changeRadio').click(function() {
        $('.choiseRadio .contenido').toggleClass('show');
    });

    $('.choiseRadio .contenido a').click(function() {
        var musicName = $(this).data('sound'),
            radioName = $(this).data('name');

        audio.setAttribute('src', musicName);
        $('.header .wichStation p span').text(radioName);
        $('.header button.play').find('i').each(function() {
            $(this).removeClass('fa-play').addClass('fa-pause');
//            $('#bars').removeClass('playing');
            audio.play();
        });

    });

//    Previsão do tempo
    var cidade = $('#weather').data('cidade'),
        estado = $('#weather').data('estado');
    $.simpleWeather({
        woeid: '2357536', //2357536
        location: cidade + ', ' + estado,
        unit: 'c',
        success: function(weather) {
            html = '<ul>';
            html += '<li>Hoje em </li>';
            html += '<li class="region customColor">'+weather.city+', '+weather.region+'</li>';
            html += '<li> <i class="customColor icon-'+weather.code+'"></i></li>';
            html += '<li class="temp customColor">'+weather.temp+'&deg;</li>';
            html += '</ul>';


            $("#weather").html(html);
        },
        error: function(error) {
          $("#weather").html('<p>'+error+'</p>');
        }
      });
    
    
//    Ação de páginas do menu
    
    $('.menu a').click(function() {
        var eq = $(this).parent().index();
        
        $('.pages .page').stop().slideUp('fast');
            $('.pages .page').eq(eq).slideDown();
    });
    $('.pages .page').each(function() {
        var closeBt = '<a href="javascript:void(0);" class="closeBt"><i class="fa fa-times customColor"></i></a>'
        $(this).prepend(closeBt);
    });
    $('.pages .page .closeBt').click(function() {
        $(this).parent('.page').slideUp();
    });


//    Sliders por toda a page, o lot of slider
    var sync1 = $("#mainSlider");
    var sync2 = $("#thumbSlider");

    sync1.owlCarousel({
        singleItem : true,
        slideSpeed : 200,
        navigation: false,
        mouseDrag: false,
        pagination:false,
        afterAction : syncPosition,
        responsiveRefreshRate : 200,
    });

    sync2.owlCarousel({
        pagination:false,
        singleItem: false,
        responsiveRefreshRate : 100,
        afterInit : function(el){
            var items = el.find(".owl-item"),
                length = items.length,
                theWidth = length * items.width();

            $('#thumbSlider').width(theWidth + 'px');
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el){
        var current = this.currentItem;

        $("#thumbSlider")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced");

        if($("#thumbSlider").data("owlCarousel") !== undefined){
            center(current)
        }
    }

    $("#thumbSlider").on("click", ".owl-item", function(e){
        e.preventDefault();
        var number = $(this).data("owlItem");

        sync1.trigger("owl.goTo",number);
    });

    function center(number){
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;

        for(var i in sync2visible){
            if(num === sync2visible[i]){
                var found = true;
            }
        }

        if(found===false){
            if(num>sync2visible[sync2visible.length-1]){
                sync2.trigger("owl.goTo", num - sync2visible.length+2)
            }else{
                if(num - 1 === -1){
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if(num === sync2visible[sync2visible.length-1]){
            sync2.trigger("owl.goTo", sync2visible[1]);
        } else if(num === sync2visible[0]){
            sync2.trigger("owl.goTo", num-1);
        }
    }

    $("#novidadeSlider").owlCarousel({
        singleItem : true,
        slideSpeed : 200,
        navigation: false,
        pagination:false,
    });

    var newSlider = $("#novidadeSlider").data('owlCarousel');

    $('#nPrev').click(function() {
        newSlider.prev();
    })

    $('#nNext').click(function() {
        newSlider.next();
    })

    $('#bannerPrev').click(function() {
        banner.prev();
    })
    $('#bannerNext').click(function() {
        banner.next();
    })

    $('#signos').owlCarousel({
        singleItem : true,
        navigation: false,
        pagination: false
    });

    var horoscopo = $("#signos").data('owlCarousel');

    $('#signoPrev').click(function() {
        horoscopo.prev();
    })

    $('#signoNext').click(function() {
        horoscopo.next();
    })

//    Moda de Novidades
    $('#novidadeSlider a').click(function(e) {
        e.preventDefault;
        var image = $(this).data('image'),
            title = $(this).data('title'),
            text = $(this).data('text'),
            novidadeId = $(this).attr('id');

        $('.modal .imageHolder').attr('style', 'background-image: url(' + image + ')');
        $('.modal .contentHolder h2').text(title).data('novidadeid', novidadeId);
        $('.modal .contentHolder p.text').text(text).data('novidadeid', novidadeId);


        $('.modal').fadeIn('fast', function() {
            $('.modal .imageHolder').addClass('animated fadeInLeft faster');
            $('.modal .contentHolder').removeClass('hidden');
            $('.modal .contentHolder').addClass('animated fadeInRight faster');
        });
    });

    $('#closeModal, .layer').click(function() {
        $('.modal').fadeOut('fast', function() {
            $('.modal .imageHolder').addClass('animated fadeInLeft faster');
            $('.modal .contentHolder').addClass('animated fadeInRight faster');
        });
    });

//    Galeria de fotos/vídeos
    $('.galleryImage').smoothZoom({
        zoominSpeed: '100',
        zoomoutSpeed: '100',
        closeButton: true,
        showCaption: false
    });

//    Plugin de animação do RSS
    $('#js-news').ticker();
    
    smoothScroll();
    

});
