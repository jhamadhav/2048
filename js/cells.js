//colors
var tile_color =
    ['#cec0b5', '#eedfc8', '#f3b07b', '#fe9462',
        '#f87c60', '#f65d3b', '#edce73', '#edce73',
        '#edce73', '#edce73', '#edce73', '#f87c60'
    ];
var row = 4;

function Cells(i) {
    this.i = i;
    this.x = this.i % row;
    this.y = Math.floor(i / row);
    this.val = 0;
    this.pop = false;

    this.draw = function () {
        if (this.val < 4) {
            tile[this.i].style.color = '#262626';
        } else {
            tile[this.i].style.color = 'white';

        }
        if (this.val >= 2) {
            tile[this.i].innerText = this.val;
        } else {
            tile[this.i].innerText = '';
        }
        if (tile_color[Math.log2(this.val)]) {
            tile[this.i].style.background = tile_color[Math.log2(this.val)];
        } else {
            tile[this.i].style.background = "#edce73";
        }
        if (this.val == 0) {
            tile[this.i].style.background = tile_color[0];
        }
        //for the pop effect
        if (this.pop && this.val >= 2) {
            tile[this.i].classList.add('pop');
            tile[this.i].addEventListener('animationend', () => {
                tile[this.i].classList.remove('pop');
                this.pop = false;
            })
        }
    }
}

/*
actions performed on or by blocks
a function to choose two cells at the beginning 
*/
function choose2random(i = null, v = 0) {
    let a = i;
    if (i == null) {
        a = Math.floor(ran(0, (tile.length)));
    }

    //check no. of empty cells
    let empty_cell = 0;
    for (let i = 0; i < tile.length; i++) {
        if (tile_set[i].val == 0) {
            empty_cell++;
        }
    }

    //assign value if empty
    if (tile_set[a].val == 0) {
        tile_set[a].val = ran() > 0.9 ? 4 : 2;
        if (v != 0) {
            tile_set[a].val = v;
        }
        tile_set[a].pop = true;
        // console.log(tile_set[a].pop);
    } else if (empty_cell > 0 && tile_set[a].val != 0) {
        choose2random();
    }
    for (let i = 0; i < tile.length; i++) {
        tile_set[i].draw();
    }
}

//to move blocks
function draw_block() {
    //draw all the blocks
    for (let i = 0; i < tile.length; i++) {
        tile_set[i].draw();
        if (tile_set[i].val == 2048) {
            //if 2048 is reached
            show_msg('Congratulation!!!');
        }
    }
    //changing score board
    document.getElementById('score').innerText = score;
    if (best < score) {
        best = score;
        document.getElementById('best').innerText = best;
        if (typeof (Storage) !== undefined) {
            localStorage.best_score = '' + best + '';
        }
    }
    //once all blocks are moved another one will appear 
    setTimeout(choose2random, 160);
}
function move_block() {
    let count = 0;
    if (dir == 'up') {

        let vy = -1;

        for (let i = 0; i < tile.length; i++) {
            let temp = i;
            let ny = tile_set[i].y;
            let index = ny * row + tile_set[i].x;
            //console.log(index);

            while (ny != 0 && index >= 0) {
                ny += vy;
                index = ny * row + tile_set[temp].x;

                if (index >= 0 && tile_set[index].val == 0) {
                    tile_set[index].val = tile_set[temp].val;
                    tile_set[temp].val = 0;
                    temp = index;
                    count++;
                } else if (tile_set[index].val == tile_set[temp].val) {
                    comb_val(index, temp);
                    count++;
                } else {
                    break;
                }

            }
        }
    }

    //to move down
    if (dir == 'down') {
        let vy = 1;

        //loop
        for (let i = tile.length - 1; i >= 0; i--) {
            let temp = i;
            let ny = tile_set[i].y + vy;
            let index = ny * 4 + tile_set[i].x;

            //while
            while (ny < 4) {

                if (index >= 0 && tile_set[index].val == 0) {
                    tile_set[index].val = tile_set[temp].val;
                    tile_set[temp].val = 0;
                    temp = index;
                    count++;
                } else if (tile_set[index].val == tile_set[temp].val) {
                    comb_val(index, temp);
                    count++;
                } else {
                    break;
                }
                ny += vy;
                index = ny * 4 + tile_set[temp].x;
            }
        }
    }

    //for movement in right
    if (dir == 'right') {
        let vx = 1;

        //for loop
        for (let k = 0; k < 4; k++) {

            for (j = 3; j >= 0; j--) {

                let i = k * 4 + j;
                let temp = i;
                let nx = tile_set[i].x + vx;
                let index = tile_set[i].y * 4 + nx;
                //console.log(index);

                //while loop
                while (nx <= 3) {

                    if (nx <= 3 && tile_set[index].val == 0) {
                        tile_set[index].val = tile_set[temp].val;
                        tile_set[temp].val = 0;
                        temp = index;
                        count++;
                    } else if (tile_set[index].val == tile_set[temp].val) {
                        comb_val(index, temp);
                        count++;
                    } else {
                        break;
                    }

                    nx += vx;
                    index = tile_set[i].y * 4 + nx;
                }
            }
        }

    }

    if (dir == 'left') {
        let vx = -1;

        //loop
        for (let k = 0; k < 4; k++) {

            for (j = 0; j < 4; j++) {

                let i = k * 4 + j;
                let temp = i;
                let nx = tile_set[i].x + vx;
                let index = tile_set[i].y * 4 + nx;

                //while loop
                while (nx >= 0) {

                    if (nx <= 3 && tile_set[index].val == 0) {
                        tile_set[index].val = tile_set[temp].val;
                        tile_set[temp].val = 0;
                        temp = index;
                        count++;
                    } else if (tile_set[index].val == tile_set[temp].val) {
                        comb_val(index, temp);
                        count++;
                    } else {
                        break;
                    }

                    nx += vx;
                    index = tile_set[i].y * 4 + nx;
                }
            }
        }
    }

    //function that combines the value
    function comb_val(index, temp) {
        tile_set[index].val = 2 * tile_set[temp].val;
        score += 2 * tile_set[temp].val;
        show_animation(tile_set[index].val);
        tile_set[temp].val = 0;
        tile[index].classList.add('bubble');
        tile[index].addEventListener('animationend', () => {
            tile[index].classList.remove('bubble');
        });
    }
    //draw all the blocks
    draw_block();

    //to show indicative moves
    if (count == 0) {
        show_msg('No moves left here! Try another:)');
    }

}
//function to produce random number
const ran = (min = 0, max = 1) => {
    return Math.random() * (max - min) + min;
}

//function to show number animation
function show_animation(val) {
    let cont = document.getElementsByClassName('show_anim')[0];
    let div = document.createElement('div');
    cont.append(div);
    div.innerText = '+' + val;
    div.classList.add('anim');

    div.addEventListener('animationend', function () {
        cont.removeChild(div);
    })
}