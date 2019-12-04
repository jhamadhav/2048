//function to toggle navbar
function menu() {
    document.getElementsByClassName("nav-links")[0].classList.toggle("open");
    document.getElementsByClassName("burger")[0].classList.toggle("menuAnimate");
    window.scroll(0, 0);
}

// hide/show navbar when scrolled i.eevent listerner when scrolled
let prev, now;
window.onscroll = function () {
    now = window.pageYOffset;
    var btn = document.getElementsByTagName("nav")[0];
    var rect = document.getElementsByClassName("nav-links")[0].getBoundingClientRect();
    // console.log(rect.top, rect.right, rect.bottom, rect.left);
    if (now > 70 && rect.left < 0) {
        if (now - prev < 0) {
            btn.style.transform = "translateY(0)";
        } else {
            btn.style.transform = "translateY(-70px)";
        }
    } else {
        btn.style.transform = "translateY(0)";
    }
    prev = window.pageYOffset;
};