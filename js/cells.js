//colors
var tile_color = ['#cec0b5', '#eedfc8', '#f3b07b', '#fe9462', '#f87c60', '#f65d3b', '#edce73', '#edce73', '#ffeb3b', '#ffeb3b', '#ffeb3b'];

function Cells(i) {
    this.i = i;
    this.x = this.i % 4;
    this.y = Math.floor(i / 4);
    this.val = 0;

    this.draw = function () {
        if (this.val <= 4) {
            tile[this.i].style.color = '#262626';
        } else {
            tile[this.i].style.color = 'aliceblue';
        }
        if (this.val >= 2) {
            tile[this.i].innerText = this.val;
        } else {
            tile[this.i].innerText = '';
        }
        tile[this.i].style.background = tile_color[Math.log2(this.val)];
        if (this.val == 0) {
            tile[this.i].style.background = tile_color[0];
        }
    }
}


//actions performed on or by blocks

//a function to choose two cells at the beginning 
function choose2random(i = 0, v = 0) {

    let a = i;
    if (i == 0) {
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
        // tile_set[a].val = v;
        if (v == 0) {
            tile_set[a].val = 2;
        }
    } else if (empty_cell > 0 && tile_set[a].val != 0) {
        choose2random();
    }
    for (let i = 0; i < tile.length; i++) {
        tile_set[i].draw();
    }
}

//to move blocks
function move_block() {

    //for upward movement
    if (dir == 'up') {

        let vy = -1;

        for (let i = 0; i < tile.length; i++) {
            let temp = i;
            let ny = tile_set[i].y;
            let index = ny * 4 + tile_set[i].x;
            //console.log(index);

            while (ny != 0 && index >= 0) {
                ny += vy;
                index = ny * 4 + tile_set[temp].x;

                if (index >= 0 && tile_set[index].val == 0) {
                    tile_set[index].val = tile_set[temp].val;
                    tile_set[temp].val = 0;
                    temp = index;
                } else if (tile_set[index].val == tile_set[temp].val) {
                    tile_set[index].val = 2 * tile_set[temp].val;
                    tile_set[temp].val = 0;
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
                } else if (tile_set[index].val == tile_set[temp].val) {
                    tile_set[index].val = 2 * tile_set[temp].val;
                    tile_set[temp].val = 0;
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
                    } else if (tile_set[index].val == tile_set[temp].val) {
                        tile_set[index].val = 2 * tile_set[temp].val;
                        tile_set[temp].val = 0;
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
                    } else if (tile_set[index].val == tile_set[temp].val) {
                        tile_set[index].val = 2 * tile_set[temp].val;
                        tile_set[temp].val = 0;
                    }

                    nx += vx;
                    index = tile_set[i].y * 4 + nx;
                }
            }
        }
    }
    //draw all the blocks
    for (let i = 0; i < tile.length; i++) {
        tile_set[i].draw();
    }

    //once all blocks are moved another one will appear 
    setTimeout(choose2random, 160);

}
//function to produce random number
const ran = (min = 0, max = 1) => {
    return Math.random() * (max - min) + min;
}