$(document).ready(function () {
    //    media query for map initialization
    if (window.matchMedia("(min-width: 64.063em)").matches) {
        $("#map-container").storeLocator({
            'maxDistance': true,
            'taxonomyFilters': {
                'features': 'category-filters-container2'
            },
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

    $('.bh-sl-filters-container').hide();
    $('.filter-service').click(function () {
        $('.bh-sl-filters-container').toggle(1000);
    });

    //    scroll to method
    var mapPos = $('.bh-sl-map-container').offset().top;

    $('#bh-sl-submit').click(function () {
        TweenMax.to(window, 1.5, {
            scrollTo: mapPos,
            delay: 0.2,
            ease: Power2.easeInOut
        });
    });

    //    TweenMax Timeline
    var loadTl = new TimelineMax();
    loadTl

        .staggerFrom($('.header-content'), 0.7, {
        x: '-10%',
        y: '20%',
        opacity: 0
    }, 0.3)

    ;
    // init controller
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: "onEnter",
            duration: "200%"
        }
    });


    // Scroll Magic
    if (window.matchMedia("(min-width:64.063em)").matches) {



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
    } else {
        controller.enabled(false);
    }
});