var perriscript = require('../../');

var input  = document.getElementsByClassName('perriscript')[0];
var output = document.getElementsByClassName('javascript')[0];

input.addEventListener('keyup', function () {
    output.value = perriscript(input.value, true);
});

output.value = perriscript(input.value, true);
