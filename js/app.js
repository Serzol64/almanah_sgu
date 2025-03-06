$(document).ready(function() {
    const $animatedElements = $('h2, .pageTitle, img, .page#matherials > ul, p, span, h3, h4, h5, h6');
  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const $target = $(entry.target);
            
            if ($target.is('h2') || $target.hasClass('pageTitle')) {
                $target.addClass('animate-title');
            } else if ($target.is('img') || $target.is('p') || $target.is('span') || $target.is('h3') || $target.is('h4') || $target.is('h5') || $target.is('h6')) {
                $target.addClass('animate-image');
            } else if ($target.is('.page#matherials')) {
                $target.addClass('animate-material-card');
            }
            observer.unobserve(entry.target);
        }
        });
    }, { threshold: 0.1 });
    $animatedElements.each(function() {
        observer.observe(this);
    });
    let $blocks = $('.pages'),
        lastScroll = 0;

    const defaultOffset = 200,
          $header = $('.header');

    function mobileMenuToggle() {
        $(".nav-links").css("display", function (index, value) {
            $('.nav-button').toggleClass('active-button');
            $('.nav-links').toggleClass('active-menu');
            return value === "none" ? "flex" : "none";
        });

        $('.nav-links a').click(function() {
            $(".nav-links").css("display", "none");
            $('.nav-button').removeClass('active-button');
            $('.nav-links').removeClass('active-menu');
        });
    }
    function checkBlocksVisibility() {
        let windowHeight = $(window).height(),
            scrollTop = $(window).scrollTop();
        $blocks.each(function() {
            let blockPosition = $(this).offset().top - $(window).scrollTop();
            if (blockPosition < windowHeight - 100) {
                $(this).css({
                    opacity: "1",
                    transform: "translateY(0)"
                });
            }
        });

        if (scrollTop > lastScroll && !$header.hasClass('hide') && scrollTop > defaultOffset) {
            // Прокрутка вниз
            $header.addClass('hide');
        } else if (scrollTop < lastScroll && $header.hasClass('hide')) {
            // Прокрутка вверх
            $header.removeClass('hide');
        }
        lastScroll = scrollTop;
    }
    checkBlocksVisibility();
    $(window).on('scroll', function() {
        checkBlocksVisibility();
    });
    $(".nav-button").on("click", mobileMenuToggle);
});