//function to toggle navbar
function menu() {
    document.getElementsByClassName("nav-links")[0].classList.toggle("open");
    document.getElementsByClassName("burger")[0].classList.toggle("menuAnimate");
    window.scroll(0, 0);
}

//to get to pages 
let preState = 0;
window.onload = function () {
    let tab = document.getElementsByClassName('tab');
    for (let i = 0; i < tab.length; i++) {
        tab[i].addEventListener('click', () => {
            to_page(i);
        });
    }

    //to get to the initial page via 
    let num = getParameterByName('page');
    if (num != null && num < tab.length) {
        to_page(num);
    } else {
        to_page(0);
    }
    if (window.innerWidth <= 770) {
        menu();
    }
}

//when back or forward button is clicked 
window.onpopstate = function (event) {
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    let count = Number(history.state);
    if (count >= 0) {
        to_page(count, true);
    }
};


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
            btn.style.transform = "translateY(-80px)";
        }
    } else {
        btn.style.transform = "translateY(0)";
    }
    prev = window.pageYOffset;
};

// actual function to show animation and show the requested page
function to_page(x, isBack = false) {

    let tab = document.getElementsByClassName('tab');
    let page = document.getElementsByClassName('page');

    for (let i = 0; i < tab.length; i++) {
        tab[i].style.color = 'white';
        tab[i].style.borderBottom = '4px solid transparent';
        page[i].style.transform = "scale(0)";
        page[i].style.animation = "";
    }

    //assigning newly found data results
    tab[x].style.color = '#262626';
    tab[x].style.borderBottom = '4px solid #262626';
    page[x].style.transform = "scale(1)";

    let diff = preState - x;
    // console.log(diff);
    preState = x;
    if (diff == 0) {
        page[x].style.animation = '';
    } else if (diff > 0) {
        page[x].style.animation = "from_left 350ms linear";
    } else if (diff < 0) {
        page[x].style.animation = "from_right 350ms linear";
    }

    page[x].addEventListener('animationend', () => {
        page[x].style.animation = "";
        page[x].style.left = 0;
    });
    //opening and closing of the menu bar depending upon the window size
    if (window.innerWidth <= 770 && !isBack) {
        menu();
    }
    //do not push state into history when back button is clicked
    if (!isBack) {
        history.pushState(x, "title " + x, "?page=" + x);
    }
}

//to get the page number when entered manually
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}