/*---------------Up button all pages-----------------*/
$('body').append('<div class="upbtn"></div>');
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.upbtn').css({bottom: '15px'});
    } else {
        $('.upbtn').css({bottom: '-80px'});
    }});
$('.upbtn').on('click',function() {
    $('html, body').animate({
        scrollTop: 0
    }, 500);
    return false;
});
/*---------------Up button all pages-----------------*/

/*---------------SLIDESHOW index.html-----------------*/
let slideIndex = 0;
showSlides();
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 2500);
}
/*---------------SLIDESHOW index.html-----------------*/
