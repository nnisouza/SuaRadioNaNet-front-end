$(document).ready(function() {
    var audio = new Audio();
    audio.src = 'http://suaradio2.dyndns.ws:10342/stream';
    audio.controls = false;
    audio.loop = true;
    audio.autoplay = false;
    var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
    window.addEventListener("load", initPlayer, false);

    function initPlayer(){
        document.getElementById('audio_box').appendChild(audio);
        context = new AudioContext();
        analyser = context.createAnalyser();
        canvas = document.getElementById('analyser_render');
        ctx = canvas.getContext('2d');
        source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
        frameLooper();
    }
    function frameLooper(){
        window.requestAnimationFrame(frameLooper);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        bars = 7;
        for (var i = 0; i < bars; i++) {
            bar_x = i * 45;
            bar_width = 28;
            bar_height = -(fbc_array[i] / 10 * 5.3);
            ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
        }
    }



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
      .addClass("synced")
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
      sync2.trigger("owl.goTo", sync2visible[1])
    } else if(num === sync2visible[0]){
      sync2.trigger("owl.goTo", num-1)
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

    $.simpleWeather({
        woeid: '2357536', //2357536
        location: 'Pelotas, RS',
        unit: 'c',
        success: function(weather) {
          html = '<ul>';
          html += '<li>Hoje em </li>';
          html += '<li class="region">'+weather.city+', '+weather.region+'</li>';
          html += '<li> <i class="icon-'+weather.code+'"></i></li>';
          html += '<li class="temp">'+weather.temp+'&deg;</li>';
          html += '</ul>';

          $("#weather").html(html);
        },
        error: function(error) {
          $("#weather").html('<p>'+error+'</p>');
        }
      });

    $('#novidadeSlider a').click(function() {
        var image = $(this).data('image'),
            title = $(this).data('title'),
            text = $(this).data('text');

        $('.modal .imageHolder').attr('style', 'background-image: url(' + image + ')');
        $('.modal .contentHolder h2').text(title);
        $('.modal .contentHolder p.text').text(text);


        $('.modal').fadeIn('fast', function() {
            $('.modal .imageHolder').addClass('animated fadeInLeft faster');
            $('.modal .contentHolder').addClass('animated fadeInRight faster');
        });
//        $('.modal').addClass('open');
    });
    $('#closeModal, .layer').click(function() {
        $('.modal').fadeOut('fast', function() {
            $('.modal .imageHolder').addClass('animated fadeInLeft faster');
            $('.modal .contentHolder').addClass('animated fadeInRight faster');
        });
    });
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

    $('.galleryImage').smoothZoom({
        zoominSpeed: '100',
        zoomoutSpeed: '100',
        closeButton: true,
        showCaption: false
    });
    $('.colorPicker').minicolors({
        change: function(hex) {
            $('.header,.container .wrapper .gallery a.icon,.container .wrapper .news,.choiseRadio .contenido,.horoscopo,.container .wrapper .novidades h2 span.effect,.container .wrapper .novidades .newControls span.effect,.container .wrapper .mostPopularArtist .popHead,.ticker-wrapper.has-js,.ticker-title,.ticker-content,.ticker-swipe,.ticker-swipe span,.voting #voteMe span.effect,.voting .radio-listing span.effect,.sz-left,.sz-right,#tenList li>span').css({
                'background-color': hex
            });
            $('.dense,.container .menu').css({
                'border-color': hex
            });
            $('.footer .content p,.container .menu ul li a,.container .wrapper .novidades #novidadeSlider .item p,.footer .content .socialIcons li a:hover i,#weather ul li i,#weather ul li i,#weather ul li.region,#weather ul li.temp,.container .heading .sec3 .socialIcons li a,.dense p,.modal .container .content .contentHolder button#closeModal,.modal .container .content .contentHolder h2,.modal .container .content .contentHolder .sharing p,.container .wrapper .galleryTitle h3').css({
                'color': hex
            });
        }
    });
    $('#js-news').ticker();
});

$(window).load( function() {
    $('.wrapper').fadeIn('slow')
});
