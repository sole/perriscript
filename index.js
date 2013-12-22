/**
 * perriscript - guau que sintaxis vaya lenguaje
 *
 * copyright? (ç) 2013 Soledad Penades
 *
 * Based on dogescript, copyright (c) 2013 Zach Bruggeman
 *
 */

var beautify = require('js-beautify').js_beautify;

var parser   = require('./lib/parser');

module.exports = function (file, beauty, perriMode) {
    if (perriMode) var lines = file.split(/ {3,}|\r?\n/);
    else var lines = file.split(/\r?\n/);
    var script = '';

    for (var i = 0; i < lines.length; i++) {
        script += parser(lines[i]);
    }

    if (beauty) return beautify(script)
    else return script;
}
