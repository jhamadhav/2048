// global variables
var tile, dir = null;
var tile_set = [];

/* Controls */
//with keyboard
window.addEventListener('keydown', function (e) {
    //to reset the game
    if (e.key == ' ') {
        init();
    } else {
        //to move blocks
        if (e.key == 'ArrowUp' || e.key == 'w') {
            dir = 'up';
        } else if (e.key == 'ArrowRight' || e.key == 'd') {
            dir = 'right';
        } else if (e.key == 'ArrowDown' || e.key == 's') {
            dir = 'down';
        } else if (e.key == 'ArrowLeft' || e.key == 'a') {
            dir = 'left';
        }
        //console.log(dir);
        move_block();
    }
});

//with swipe
/*  actual swipe capture */
window.addEventListener('touchstart', handleTouchStart, false);

window.addEventListener('touchmove', handleTouchMove, false);

var xDown = null, yDown = null;

function getTouches(evt) {
    return evt.touches ||
        evt.originalEvent.touches;
}

function handleTouchStart(evt) {
    preventDefault();
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    preventDefault();
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

window.addEventListener('load', init);
window.addEventListener('dblclick', init);
/* end */

function init() {
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
