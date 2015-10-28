$(document).ready(function () {
    //    media query for map initialization
    if (window.matchMedia("(min-width:400px)").matches) {
        $("#map-container").storeLocator({
            "mapSettings": {
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDoubleClickZoom: false,
                scrollwheel: true,
                navigationControl: true,
                draggable: true
            }
        });

        console.log('desktop');
    } else {
        $("#map-container").storeLocator({
            "mapSettings": {
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDoubleClickZoom: false,
                scrollwheel: false,
                navigationControl: false,
                draggable: false
            }
        });
        console.log('mobile');
    }

    //    scroll to method
    var mapPos = $('.bh-sl-map-container').offset().top;

    $('.btn').click(function () {
        TweenMax.to(window, 1.5, {
            scrollTo: mapPos,
            delay: 0.2,
            ease: Power2.easeInOut
        });
    });

    //    TweenMax Timeline
    var loadTl = new TimelineMax();
    loadTl.staggerFrom($('.header-content'), 0.7, {
        x: '-10%',
        y: '20%',
        opacity: 0
    }, 0.3);

    // Scroll Magic

    // init controller
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: "onEnter",
            duration: "200%"
        }
    });

    // build scenes
    new ScrollMagic.Scene({
            triggerElement: "#parallax1"
        })
        .setTween(".parallax-1", {
            y: "80%",
            ease: Linear.easeNone
        })
        //        .addIndicators()
        .addTo(controller);
});