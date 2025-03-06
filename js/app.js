$(document).ready(function() {
    let $blocks = $('.pages'),
        lastScroll = 0;

    const defaultOffset = 200,
          $header = $('.header');
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
});