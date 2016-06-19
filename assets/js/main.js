$(document).ready(function () {
    
    
    // Expandable sections
    $('.expand-1').click(function () {
     $('.content-1').slideToggle();
    }); 
    $('.expand-2').click(function () {
     $('.content-2').slideToggle();
    }); 
    $('.expand-3').click(function () {
     $('.content-3').slideToggle();
    });
    
    
    //    media query for map initialization
    if (window.matchMedia("(min-width: 64.063em)").matches) {
        $("#map-container").storeLocator({
            'maxDistance': true,
            'nameSearch': true,
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

        // Calculate the offset of the results section
        var resultPos = ($('.search-again-container').offset().top);
        
        //Desktop Scroll to the top of the results section when a list item is clicked
        $(document).on('click', '.list-details', function () {
            TweenMax.to(window, 1.5, {
                scrollTo: {
                    y: $('.search-again-container').offset().top
                },
                delay: 0.3,
                ease: Power2.easeInOut
            });
        });
        console.log('desktop');
    } else {
        
        $('.disappear-for-mobile').hide();
        $('.remove-pull-mobile').removeClass('pull-right pull-left');
//        init map
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
                navigationControl: false,
                draggable: true
            }
        });
        //MOBILE Scroll to the top of the map when a list item is clicked
        $(document).on('click', '.list-details', function () {
            var mapHeightOffset = $('#bh-sl-map').offset().top;
            TweenMax.to(window, 1.5, {
                scrollTo: {
                    y: mapHeightOffset - 1
                },
                delay: 0.3,
                ease: Power2.easeInOut
            });
        });
        // Calculate the height of these element if mobile
        var parallaxParentHeight = $('.parallaxParent').height();
        var navbarHeight = $('.navbar').height();
        var resultPos = (parallaxParentHeight + navbarHeight);
        
        $('#map-container').removeClass('container-map');

        console.log('mobile');
    } // end else

    //    toggle hide filter list
    $('.bh-sl-filters-container').hide();
    $('.filter-service').click(function () {
        $('.bh-sl-filters-container').toggle(1000);
    });


    //    First SCROLL TO METHOD: including some other attempts
    //    var mapPos = $('#map-container').offset().top;
    //    var viewPortHeight = $(window).height();
    var parallaxParentHeight = $('.parallaxParent').height();
    var navbarHeight = $('.navbar').height();
    //    var resultPos = (parallaxParentHeight + navbarHeight);
    //    var resultPos = $('.search-again-container').offset().top;

    //  Init map height variable
    var mapHeightOffset = 0;

    //Function to Scroll to results and calculate the map offset after it has loaded in
    $('#bh-sl-submit').click(function () {
        TweenMax.to(window, 1.5, {
            scrollTo: {
                y: resultPos
            },
            delay: 0.8,
            ease: Power2.easeInOut
        });

        //        Calculate the map offset after it has loaded in
        setTimeout(function () {
            mapHeightOffset = $('#bh-sl-map').offset().top;
        }, 2000);
    });

    //    TweenMax Timeline that tweens in the header-content on load
    var loadTl = new TimelineMax();
    loadTl
        .staggerFrom($('.header-content'), 0.7, {
            x: '-10%',
            y: '20%',
            opacity: 0
        }, 0.1);


    //Make features into list (in the infowindow template)
    Handlebars.registerHelper('breaklines', function (text) {
        text = Handlebars.Utils.escapeExpression(text);
        text = text.replace(/,/g, '<br>');
        return new Handlebars.SafeString(text);
    });

    // init parallax controller
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: "onEnter",
            duration: "200%"
        }
    });

    // Scroll Magic Parallax effect inside media query to disable for mobile
    if (window.matchMedia("(min-width:64.063em)").matches) {

        // build scenes
        new ScrollMagic.Scene({
                triggerElement: "#parallax1"
            })
            .setTween(".parallax-1", {
                y: "80%",
                ease: Linear.easeNone
            })
            .addTo(controller);
    } else {
        controller.enabled(false);
    }


    //    Scroll magic to Make arrow pin to screen  
    //    Init the contoller
    var controller = new ScrollMagic.Controller();
    //    Create the pin Scene
    var scenePin = new ScrollMagic.Scene({
            triggerElement: "#map-container",
            triggerHook: "onLeave",
            offset: 40
        })
        .setPin("#pin1")
        .addTo(controller);

    //Tween size of the button
    var buttonTween = TweenMax.to('#pin1', 1, {fontSize: '1.5em', backgroundColor: '#d2322d', borderColor: 'rgb(212, 63, 58)'});
    var scenePinScale = new ScrollMagic.Scene({
            triggerElement: "#map-container",
            triggerHook: "onLeave",
            duration: '100%'
        })
        .setTween(buttonTween)
        .addTo(controller);

    //this function triggers when there is a scroll event. It calculates the height of the div and scrolls to it if arrow is clicked 
    $(window).scroll(function () {
        if ($(window).scrollTop() < $('.search-again-container').offset().top + 50) {
            //            console.log($(window).scrollTop());
            $('#pin1').html('Back to Search');
            $('#pin1').click(function () {
                TweenMax.to(window, 1.5, {
                    scrollTo: {
                        y: 0
                    },
                    ease: Power2.easeInOut
                });
            });
        } else {
            $('#pin1').html('Back to Results');
            $('#pin1').click(function () {
                TweenMax.to(window, 1.5, {
                    scrollTo: {
                        y: $('.search-again-container').offset().top
                    },
                    ease: Power2.easeInOut
                });
            });
        }
    }); //end scrolling function
});