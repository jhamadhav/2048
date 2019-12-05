// global variables
var tile, dir = null;
var tile_set = [];
var score, best = 0, count_hint = 0;

//some in game tips
const hints = [
    'Click best to reset it !',
    'Keep blocks in a corner',
    'use strategy other than random moves !',
    'Don\'t chase large tiles',
    'Plan ahead',
    'Slow down and think',
    'try merging multiple tiles at once',
    'Avoid checkerboarding'
];

//onload function
window.addEventListener('load', () => {

    //for opening the navbar
    let bg = document.getElementsByClassName('bg')[0];
    bg.addEventListener('swiped-right', menu);
    //for closing the navbar
    document.getElementsByClassName('nav-links')[0].addEventListener('swiped-left', menu);


    //setting i.e adding swipe events
    let container = document.getElementsByClassName('touch')[0];
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    //some text msg
    show_msg('use arrow-key/Swipe to make 2048 !');
    init();
});

/* end */

function init() {
    score = 0;
    best = Number(localStorage.best_score) | 0;
    document.getElementById('score').innerText = score;
    document.getElementById('best').innerText = best;

    tile_set = [];
    tile = document.getElementsByClassName('cell');

    for (let i = 0; i < tile.length; i++) {
        tile_set[i] = new Cells(i);
    }

    choose2random();
    choose2random();
    for (let i = 0; i < tile.length; i++) {

        // let index = tile_set[i].y * 4 + tile_set[i].x;
        // console.log('x:' + tile_set[i].x + ', y:' + tile_set[i].y + ' index: ' + index + '\n');
        tile_set[i].draw();
    }
}

//for a new game and new hint
function new_game() {
    show_msg('New Game !');
    setTimeout(init, 200);
}
function new_hint() {
    show_msg('Hint: ' + hints[count_hint % (hints.length)]);
    count_hint++;
}

//reset best
function rest_best() {
    localStorage.best_score = '0';
    best = Number(localStorage.best_score) | 0;
    document.getElementById('best').innerText = best;
    show_msg('Best score reset complete !');

}
/* Controls */
//with keyboard
window.addEventListener('keyup', function (e) {
    e.preventDefault();
    //to move blocks
    if (e.key == 'ArrowUp' || e.key == 'w') {
        dir = 'up';
        move_block();
    } else if (e.key == 'ArrowRight' || e.key == 'd') {
        dir = 'right'; move_block();
    } else if (e.key == 'ArrowDown' || e.key == 's') {
        dir = 'down';
        move_block();
    } else if (e.key == 'ArrowLeft' || e.key == 'a') {
        dir = 'left'; move_block();
    }
    //console.log(dir);
}, { passive: false });

//to show a message on screen
function show_msg(txt) {
    let holder = document.getElementById('msg');
    msg.innerText = txt;
    msg.classList.add('show-msg');
    msg.addEventListener('animationend', function () {
        msg.classList.remove('show-msg');
    })
}


//with swipe
/*  actual swipe capture */
var xDown = null, yDown = null;
function getTouches(evt) {
    return evt.touches ||
        evt.originalEvent.touches;
}
function handleTouchStart(evt) {
    evt.preventDefault();
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};
function handleTouchMove(evt) {
    evt.preventDefault();
    if (!xDown || !yDown) { return; }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*Response part*/
        if (xDiff > 0) {
            /* right swipe */
            dir = 'left';
            move_block();
        } else {
            /* right swipe */
            dir = 'right';
            move_block();
        }
    }
    else {
        if (yDiff > 0) {
            /* up swipe */
            dir = 'up';
            move_block();
        } else {
            /* down swipe */
            dir = 'down';
            move_block();
        }
    }
    /* reset values */
    xDown = null; yDown = null;
};