$(window).load(function () {

    // TOPPER STUFF
    fillTopper();
    var topperHeight = $(window).height()
    var scrollProgress = 5;
    var topperScrollMagicController = new ScrollMagic({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });
    function getTopperHeight() {
        return topperHeight / 1.5;
    }
    $(window).resize(function () {
        topperHeight = $(window).height();
        $('#topper').height($(window).height());

        // Force better DOM repainting hack. Helps on mobile
        $('html').addClass('force-gpu').removeClass('force-gpu');
    });
    var topperTextTween = TweenMax.staggerFromTo('#topper h1 span', 0.5,
        {
            y: 25,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1
        },
        0.075
    );
    var starScene = new ScrollScene({
        triggerElement: '#topper',
        duration: getTopperHeight,
        offset: 0
    })
        .addTo(topperScrollMagicController)
        .setTween(topperTextTween)
        //.setPin('#topper')
        .on('progress', function (e) {
            scrollProgress = e.progress * 100 * 2;
            if (scrollProgress <= 5) {
                scrollProgress = 5;
            }
        })
        .on('start', function (e) {
            $('body').addClass('hide-those-particles');
        });
    var topperScene = new ScrollScene({
        triggerElement: '#topper',
        offset: 150,
        loglevel: 3,
    })
        .on('leave', function (e) {

            $('.hover-block.k').trigger("mouseover");

            setTimeout(function () {
                $('.hover-block.k').trigger("mouseout");
            }, 700);


            $('.hover-block.a-1').trigger("mouseover");
            setTimeout(function () {
                $('.hover-block.a-1').trigger("mouseout");
            }, 700);

            $('.hover-block.s-1').trigger("mouseover");
            setTimeout(function () {
                $('.hover-block.s-1').trigger("mouseout");
            }, 700);


            $('.hover-block.s-2').trigger("mouseover");
            setTimeout(function () {
                $('.hover-block.s-2').trigger("mouseout");
            }, 700);

            $('.hover-block.a-2').trigger("mouseover");
            setTimeout(function () {
                $('.hover-block.a-2').trigger("mouseout");
            }, 700);

            $('.hover-block.b').trigger("mouseover");
            setTimeout(function () {
                $('.hover-block.b').trigger("mouseout");
            }, 700);
        })
        .addTo(topperScrollMagicController);

    var camera, scene, renderer, mouseX = 0, mouseY = 0, particles = [];
    initStars();
    function initStars() {
        camera = new THREE.PerspectiveCamera(80, $('#topper').width() / $('#topper').height(), 1, 4000);
        camera.position.z = 1000;
        scene = new THREE.Scene();
        scene.add(camera);
        renderer = new THREE.CanvasRenderer();
        renderer.setSize($('#topper').width(), $('#topper').height());
        document.getElementById('topper').appendChild(renderer.domElement);
        makeParticles();
        document.addEventListener('mousemove', onMouseMove, false);
        setInterval(update, 1000 / 30);
    }
    function update() {
        updateParticles();
        renderer.render(scene, camera);
    }
    function makeParticles() {
        var particle, material;
        for (var zpos = -1000; zpos < 1000; zpos += 5) {
            material = new THREE.ParticleCanvasMaterial({ color: 0x81dbeb, program: particleRender });
            particle = new THREE.Particle(material);
            particle.position.x = Math.random() * 1000 - 500;
            particle.position.y = Math.random() * 1000 - 500;
            particle.position.z = zpos;
            particle.scale.x = particle.scale.y = 1;
            scene.add(particle);
            particles.push(particle);
        }
    }
    function particleRender(context) {
        context.beginPath();
        context.arc(0, 0, 1, 0, Math.PI * 2, true);
        context.fill();
    };
    function updateParticles() {
        for (var i = 0; i < particles.length; i++) {
            particle = particles[i];
            particle.position.z += scrollProgress * 0.1;
            if (particle.position.z > 1000) particle.position.z -= 2000;
        }
    }
    function onMouseMove(event) {
        // Do nothing, based on scroll
    }
    $('.hover-block').hover(
        function () {
            explodeLetter($(this).parents('section').attr('id'), $(this).data('letter'), $(this).data('color'));
        }, function () {
            implodeLetter($(this).parents('section').attr('id'), $(this).data('letter'), $(this).data('color'));
        }
    );
    introStuff();


    //CONTACT STUFF
    $('#contactForm').submit(function (e) {
        e.preventDefault();
        $("#message").text("Thank you! I'll get in touch");
        $("#contactSubmit").css("display", "none");
        $.ajax({
            type: 'POST',
            url: '/contact',
            data: $(this).serialize(),

        });


    })

    // BLURB STUFF
    var scrollMagicController = new ScrollMagic();
    var blurbTween = TweenMax.staggerFromTo('#blurb .item', 0.5,
        {
            y: 50,
            x: -50,
            opacity: 0
        },
        {
            y: 0,
            x: 0,
            opacity: 1
        },
        0.2
    );
    var blurbScene = new ScrollScene({
        triggerElement: '#blurb .item',
        duration: 500,
        offset: -200
    })
        .setTween(blurbTween)
        .addTo(scrollMagicController);


    // FOOTER STUFF
    var footerScene = new ScrollScene({
        triggerElement: '#footer',
        offset: -200
    })
        .on('enter', function (e) {

            $('.hover-block.k').trigger("mouseover");

            setTimeout(function () {
                $('.hover-block.k').trigger("mouseout");
            }, 700);


            $('.hover-block.a-1').trigger("mouseover");
            setTimeout(function () {
                $('.hover-block.a-1').trigger("mouseout");
            }, 700);

            $('.hover-block.s-1').trigger("mouseover");
            setTimeout(function () {
                $('.hover-block.s-1').trigger("mouseout");
            }, 700);


            $('.hover-block.s-2').trigger("mouseover");
            setTimeout(function () {
                $('.hover-block.s-2').trigger("mouseout");
            }, 700);

            $('.hover-block.a-2').trigger("mouseover");
            setTimeout(function () {
                $('.hover-block.a-2').trigger("mouseout");
            }, 700);

            $('.hover-block.b').trigger("mouseover");
            setTimeout(function () {
                $('.hover-block.b').trigger("mouseout");
            }, 700);
        })
        .addTo(scrollMagicController);





});


/*========================================
=            CUSTOM FUNCTIONS            =
========================================*/
function explodeLetter(parentID, letter, fillColor) {
    $('#' + parentID + '  .letter.' + letter).find('rect').each(function () {
        $(this).css({
            'fill': fillColor,
            '-webkit-transform': 'translate3d(' + randomIntFromInterval(-49, 49) + 'px, ' + randomIntFromInterval(-49, 49) + 'px, 0)',
            '-moz-transform': 'translate3d(' + randomIntFromInterval(-49, 49) + 'px, ' + randomIntFromInterval(-49, 49) + 'px, 0)',
            '-ms-transform': 'translate3d(' + randomIntFromInterval(-49, 49) + 'px, ' + randomIntFromInterval(-49, 49) + 'px, 0)',
            '-o-transform': 'translate3d(' + randomIntFromInterval(-49, 49) + 'px, ' + randomIntFromInterval(-49, 49) + 'px, 0)',
            'transform': 'translate3d(' + randomIntFromInterval(-49, 49) + 'px, ' + randomIntFromInterval(-49, 49) + 'px, 0)'
        });
    });
}
function implodeLetter(parentID, letter) {
    $('#' + parentID + '  .letter.' + letter).find('rect').css({
        'fill': '#fff',
        '-webkit-transform': 'translate3d(0, 0, 0)',
        '-moz-transform': 'translate3d(0, 0, 0)',
        '-ms-transform': 'translate3d(0, 0, 0)',
        '-o-transform': 'translate3d(0, 0, 0)',
        'transform': 'translate3d(0, 0, 0)'
    });
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function introStuff() {
    $('body').addClass('show-background');
    setTimeout(function () {
        $('body').addClass('show-stars');

        $('.hover-block.k').trigger("mouseover");
        setTimeout(function () {
            $('.hover-block.k').trigger("mouseout");
        }, 700);


        $('.hover-block.a-1').trigger("mouseover");
        setTimeout(function () {
            $('.hover-block.a-1').trigger("mouseout");
        }, 700);

        $('.hover-block.s-1').trigger("mouseover");
        setTimeout(function () {
            $('.hover-block.s-1').trigger("mouseout");
        }, 700);


        $('.hover-block.s-2').trigger("mouseover");
        setTimeout(function () {
            $('.hover-block.s-2').trigger("mouseout");
        }, 700);

        $('.hover-block.a-2').trigger("mouseover");
        setTimeout(function () {
            $('.hover-block.a-2').trigger("mouseout");
        }, 700);

        $('.hover-block.b').trigger("mouseover");
        setTimeout(function () {
            $('.hover-block.b').trigger("mouseout");
        }, 700);

    }, 500);
}
function fillTopper() {
    $('#topper').height($(window).height());
}
function initParticles() {
    particlesJS('contact', {
        particles: {
            color: '#fff',
            shape: 'circle',
            opacity: 1,
            size: 2.5,
            size_random: true,
            nb: 75,
            line_linked: {
                enable_auto: true,
                distance: 250,
                color: '#fff',
                opacity: 0.5,
                width: 1,
                condensed_mode: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600
                }
            },
            anim: {
                enable: true,
                speed: 2.5
            }
        },
        interactivity: {
            enable: true,
            mouse: {
                distance: 250
            },
            detect_on: 'canvas',
            mode: 'grab',
            line_linked: {
                opacity: 0.5
            },
            events: {
                onclick: {
                    push_particles: {
                        enable: true,
                        nb: 4
                    }
                }
            }
        },
        retina_detect: true
    });
}


