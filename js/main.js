$(document).ready(function() {
    var audio = new Audio();
    audio.src = 'sound/gravity.m4a';
    audio.controls = false;
    audio.loop = true;
    audio.autoplay = true;
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
                $('#bars').addClass('playing');
                audioElement.play();
            } else {
                $(this).removeClass('fa-pause').addClass('fa-play');
                $('#bars').removeClass('playing');
                audioElement.pause();
            }
        });
    });

    $('button#changeRadio').click(function() {
        $('.choiseRadio .contenido').toggleClass('show');
    });

    $('.choiseRadio .contenido a').click(function() {
        var musicName = $(this).data('sound'),
            radioName = $(this).data('name');
        audio.setAttribute('src', 'sound/' + musicName + '.m4a');

        $('.header .wichStation p span').text(radioName);
    });
});
