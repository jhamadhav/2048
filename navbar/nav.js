//function to toggle navbar
function menu() {
    document.getElementsByClassName("nav-links")[0].classList.toggle("open");
    document.getElementsByClassName("burger")[0].classList.toggle("menuAnimate");
}

// hide/show navbar when scrolled i.eevent listerner when scrolled
window.onscroll = function () {
    now = window.pageYOffset;
    var btn = document.getElementsByTagName("nav")[0];
    if (now > 70) {
        if (now - prev < 0) {
            btn.style.transform = "translateY(0)";
        } else {
            btn.style.transform = "translateY(-70px)";
        }
    }
    prev = window.pageYOffset;
};