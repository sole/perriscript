var multiComment = false;

module.exports = function parse (line) {
    //replace docuperri y ventanuco always
    line = line.replace(/docuperri/g, 'document').replace(/ventanuco/g, 'window');

    var keys = line.match(/'[^']+'|\S+/g);
    var valid = ['vaya', 'guau', 'guau&', 'porfi', '.porfi', 'hace', 'muy', 'shh', 'callao', 'tronando', 'ke', 'pero', 'mogollon', 'mucho', 'hala', 'sargento'];
    var validKeys = {'es': ' === ', 'no': ' !== ', 'y':  ' && ', 'o':  ' || ', 'pasa':  '; ', 'como':  ' = ', 'mas':  ' += ', 'menos':  ' -= ', 'montones': ' *= ', 'pocos': ' /= ', 'muy': ' var ', 'menor': ' < ', 'mayor': ' > ', 'menorillo': ' <= ', 'mayorcillo': ' >= ', 'mentira': ' ! '};
    var statement = '';

    if (keys === null) return line + '\n';

    // no dogescript, vaya javascript
    if (valid.indexOf(keys[0]) === -1 && keys[1] !== 'es' && keys[1] !== 'hace' || multiComment && keys[0] !== 'tronando') return line + '\n';

    // sargento use strict
    if (keys[0] === 'sargento') {
        statement += '"use strict";\n';
    }

    // vaya function
    if (keys[0] === 'vaya') {
        statement += 'function ' + keys[1];
        if (keys[2] === 'mucho') {
            statement += ' (';
            for (var i = 3; i < keys.length; i++) {
                statement += keys[i];
                if (i !== keys.length - 1) statement += ', ';
            }
            statement += ') { \n';
        } else {
            statement += ' () { \n';
        }
    }

    // guau end function y return
    if (keys[0] === 'guau' || keys[0] === 'guau&') {
       if (typeof keys[1] !== 'undefined') {
            statement += 'return';
            for (var i = 1; i < keys.length; i++) {
                statement += ' ' + keys[i];
            }
            statement += ';\n';
            if (keys[0] === 'guau&') statement += '}) \n';
            else statement += '} \n';
        } else if (keys[0] === 'guau&') {
            statement += '}) \n';
        } else {
            statement += '} \n';
        }
    }

    // porfi execute function
    if (keys[0] === 'porfi' || keys[0] === '.porfi' || keys[0] === 'hace' || keys[1] === 'hace') {
        if (keys[1] === 'hace') statement += keys.shift();
        if (keys[0].charAt(0) === '.' || keys[0] === 'hace') statement += '.';
        if (keys[1] === 'consola.ladra' || keys[1] === 'ladra') keys[1] = 'console.log';
        if (keys[2] === 'con') {
            statement += keys[1] + '(';
            dupe = keys.slice(0);
            for (var i = 3; i < keys.length; i++) {
                if (keys[i] === ',' || keys[i] === '&') continue;
                if (keys[i] === 'mucho') { // lambda functions - thanks @00Davo!

                    statement += 'function (';
                    if (keys[i + 1]) {
                        for (var j = i + 1; j < keys.length; j++) {
                            statement += keys[j];
                            if (j !== keys.length - 1) statement += ', ';
                        }
                        statement += ') {\n';
                        return statement;
                    } else {
                        statement += ') {\n';
                        return statement;
                    }
                }
                if (keys[i].substr(-1) === '&' || keys[i].substr(-1) === ',') keys[i] = keys[i].slice(0, -1);
                statement += keys[i];
                if (keys[i].substr(-1) === ':') statement += ' ';
                if (i !== keys.length - 1 && keys[i].substr(-1) !== ':') statement += ', ';
            }
            if (statement.substr(-2) === ', ') statement = statement.slice(0, -2);
            if (statement.substr(-3) === ', ]' || statement.substr(-3) === ', }' ) statement = statement.replace(statement.substr(-3), statement.substr(-1));
            if (dupe[keys.length - 1].slice(-1) === '&') statement += ')\n';
            else statement += ');\n';
        } else {
            if (keys[1].slice(-1) === '&') {
                keys[1] = keys[1].slice(0, -1);
                statement += keys[1] + '()\n';
            } else {
                statement += keys[1] + '();\n';
            }
        }
    }

    // muy estrena variable
    if (keys[0] === 'muy') {
        statement += 'var ' + keys[1] + ' = ';
        if (keys[3] === 'estrena') {
            statement += 'estrena ' + keys[4] + '(';
            if (keys[5] === 'con') {
                for (var i = 6; i < keys.length; i++) {
                    if (keys[i] === ',') continue;
                    if (keys[i].substr(-1) === ',' && keys[i].charAt(keys[i].length - 2) !== '}') keys[i] = keys[i].slice(0, -1);
                    statement += keys[i];
                    if (i !== keys.length - 1) statement += ', ';
                }
            }
            statement += ');\n';
            return statement;
        }
        if (keys.length > 4) {
            var recurse = '';
            for (var i = 3; i < keys.length; i++) {
                if (keys[i].substr(-1) === ',' && keys[i].charAt(keys[i].length - 2) !== '}') keys[i] = keys[i].slice(0, -1);
                recurse += keys[i] + ' ';
            }
            if (valid.indexOf(keys[3]) !== -1) statement += parse(recurse);
            else statement += recurse + ';\n';
        } else {
            statement += keys[3] + ';\n';
        }
    }

    // es existing variable
    if (keys[1] === 'es') {
        statement += keys[0] + ' = ';
        if (keys[2] === 'estrena') {
            statement += 'estrena ' + keys[3] + '(';
            if (keys[4] === 'con') {
                for (var i = 5; i < keys.length; i++) {
                    if (keys[i] === ',') continue;
                    statement += keys[i];
                    if (i !== keys.length - 1) statement += ', ';
                }
            }
            statement += ');\n';
            return statement;
        }
        if (keys.length > 2) {
            var recurse = '';
            for (var i = 2; i < keys.length; i++) {
                recurse += keys[i] + ' ';
            }
            statement += parse(recurse);
        } else {
            statement += keys[2] + ';\n';
        }
    }

    // shh comment
    if (keys[0] === 'shh') {
        statement += '// ';
        for (var i = 1; i < keys.length; i++) {
            statement += keys[i] + ' ';
        }
        statement += '\n';
    }

    // callao start multi-line comment
    if (keys[0] === 'callao') {
        statement += '/* ';
        multiComment = true;
        for (var i = 1; i < keys.length; i++) {
            statement += keys[i] + ' ';
        }
        statement += '\n';
    }

    // tronando end multi-line comment
    if (keys[0] === 'tronando') {
        statement += '*/ ';
        multiComment = false;
        for (var i = 1; i < keys.length; i++) {
            statement += keys[i] + ' ';
        }
        statement += '\n';
    }

    var keyParser = function (key) {
        if (validKeys[key]) {
            statement += validKeys[key];
            return true;
        } else {
            return false;
        }
    }

    // ke if
    if (keys[0] === 'ke') {
        statement += 'if (';
        for (var i = 1; i < keys.length; i++) {
            var parsed = keyParser(keys[i]);
            if (parsed) continue;
            statement += keys[i] + ' ';
        }
        statement += ') {\n';
    }

    // pero else
    if (keys[0] === 'pero') {
        if (keys[1] === 'ke') {
          statement += '} else if (';
          for (var i = 2; i < keys.length; i++) {
              var parsed = keyParser(keys[i]);
              if (parsed) continue;
              statement += keys[i] + ' ';
          }
          statement += ') {\n';
        } else {
          statement += '} else {\n';
        }
    }

    // mogollon while
    if (keys[0] === 'mogollon') {
        statement += 'while (';
        for (var i = 1; i < keys.length; i++) {
            var parsed = keyParser(keys[i]);
            if (parsed) continue;
            statement += keys[i] + ' ';
        }
        statement += ') {\n';
    }

    // mucho for
    if (keys[0] === 'mucho') {
        statement += 'for (';
        for (var i = 1; i < keys.length; i++) {
            var parsed = keyParser(keys[i]);
            if (parsed) continue;
            statement += keys[i] + ' ';
        }
        statement += ') {\n';
    }

    // hala require (thanks @maxogden!)
    if (keys[0] === 'hala') {
        if (keys[2] === 'como') {
            statement += 'var ' + keys[3] + ' = require(\'' + keys[1] + '\');\n';
        } else {
            statement += 'var ' + keys[1] + ' = require(\'' + keys[1] + '\');\n';
        }
    }

    return statement;
}
