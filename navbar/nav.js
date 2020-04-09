let preState = 0;
window.onload = function () {
    let tab = document.getElementsByClassName('tab');
    let page = document.getElementsByClassName('page');
    for (let i = 0; i < tab.length; i++) {

        tab[i].addEventListener('click', () => {
            to_page(i);
        });
        page[i].style.transform = "scale(0)";
        page[i].style.animation = "";
    }
    page[0].style.transform = "scale(1)";
}
window.onpopstate = function (event) {
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    let count = this.Number(history.state) - 1;
    if (count >= 0) {
        to_page(count, true);
    }
};
//function to toggle navbar
function menu() {
    document.getElementsByClassName("nav-links")[0].classList.toggle("open");
    document.getElementsByClassName("burger")[0].classList.toggle("menuAnimate");
    window.scroll(0, 0);
}

// hide/show navbar when scrolled i.event listener when scrolled
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

//
function to_page(x, isBack = false) {

    let stateDiff = preState - x;
    preState = x;

    let multi = 0
    if (stateDiff > 0) {
        multi = -1;
    } else if (stateDiff < 0) {
        multi = 1;
    } else if (stateDiff === 0) {
        multi = 0;
    };
    console.log(multi);

    let tab = document.getElementsByClassName('tab');
    let page = document.getElementsByClassName('page');
    for (let i = 0; i < tab.length; i++) {
        tab[i].style.color = 'white';
        tab[i].style.borderBottom = '4px solid transparent';
        // page[i].style.transform = "scale(0)";
    }
    tab[x].style.color = '#262626';
    tab[x].style.borderBottom = '4px solid #262626';
    page[x].style.zIndex = 1;
    page[x].style.transform = "scale(1) translate(" + multi * 100 + "%)";
    page[x].style.animation = "showup 350ms linear";
    page[x].addEventListener("animationend", () => {

        page[x].style.animation = "";
        for (let i = 0; i < tab.length; i++) {
            page[i].style.transform = "scale(0)";
        }
        page[x].style.transform = "scale(1) translate(0)";
        page[x].style.zIndex = 0;

    });
    // console.log(x);
    if (window.innerWidth <= 770 && !isBack) {
        menu();
    }
    if (!isBack) {
        history.pushState((x + 1), "title " + (x + 1), "?page=" + (x + 1));
    }
}