## perricript spec (0.0.1)

### notes

* perriscript uses single quotes for strings. Double quotes are not supported.
* perriscript uses 4 space characters for indentation. Tabs are not supported.
* perriscript separates statements by newlines by default. In true-perri mode, they are separated by 3 spaces.

### files

perriscript files are `.pjs`. Should perriscript be ported to other languages, the `js` portion may be changed to reflect the new language. (perriby => `.prb`)

### language

* `shh [comment]` - `// [comment]`
* `quieto [multiline comment] tronando` - `/* [multiline comment] */`
* `muy [var] es [value]` - `var [var] = [value]`
* `[var] es [value]` - `[var] = [value]`
* `vaya [name] mucho [variables]` - `function [name] ([variables])`
* `guau` - `}`
* `guau&` - `})`
* `porfi [function] con [variables]` - `[function]([variables])`
* `porfi [function] con [variables..] mucho [arguments]` - `[function]([variables..], function ([arguments]) {})`
* `ke [params]` - `if ([params])`
* `pero ke [params]` - `else if ([params])`
* `pero` - `else`
* `mentira [params]` - `if (! [params])`
* `mogollon [params]` - `while ([params])`
* `mucho [params]` - `for ([params])`
* `hala [module]` - `var [module] = require([module])`
* `hala [module] como [name]` - `var [name] = require([module])`
* `hace` - `.` (example: `console hace loge con 'vaya dot notation => console.log('vaya dot notation')`)
* `sargento` - `"use strict"`

### operators

Used in `mogollon`, `mucho` y `ke`.

* `no` - `!==`
* `es` - `===`
* `y` - `&&`
* `o` - `||`
* `pasa` - `; `
* `como` - `=`
* `mas` - `+=`
* `menos` - `-=`
* `montones` - `*=`
* `pocos` - `/=`
* `mayor` - `>`
* `menor` - `<`
* `mayorcillo` - `>=`
* `menorillo` - `<=`

### standard objects

* `consola.ladra` - `console.log`
* `docuperri` - 'document'
* `ventanuco` - `window`
