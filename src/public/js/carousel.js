const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    speed: 500,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});
