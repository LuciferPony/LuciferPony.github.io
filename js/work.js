var toggleCell = function(x, y, name) {
    $('.item_' + x + '_' + y).toggleClass(name)
}

var toggleArrayCell = function(array, name, shift_x, shift_y, block_char = 1) {
for(i=0; i < array.length; i++) {
    for(j=0; j < array[0].length; j++) {
        if(array[i][j] == block_char) {
            toggleCell(shift_x + i, shift_y + j, name);
        }
    }
}
}