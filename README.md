## perriscript [![NPM version](https://badge.fury.io/js/perriscript.png)](http://badge.fury.io/js/perriscript)

Learn broken Spanish with Perriscript (AKA why not?)

This is a reimplementation of the best new compile-to-JS language, [Dogescript](https://github.com/remixz/dogescript) by Zach Bruggeman, in Spanish. Guau.

```
    guau
         vaya perriscript
     muy compilado
                  nueva-onda
       npm guau
```


### Installation

`npm install -g perriscript`

### Usage

#### Command Line

`perriscript` without a file launches a REPL.

`perriscript location/to/perriscript.pjs` pipes the result to stdout. Use a command like `perriscript perriscript.pjs > compiled.js` to save to a file.

Options:

* `--beautify` - Runs the code through a beautifier.
* `--true-perri` - Implements "true perri" mode, which splits lines by 3 spaces, instead of by newlines. This stays behind a flag until the spacing it exports is identical to non-true-doge mode.

#### Javascript

`perriscript(file, beauty, truePerri)`
* `file` - A string of Perriscript.
* `beauty` - A boolean, set to true if you want the output to be ran through a beautifier.
* `truePerri` - A boolean, set to true if you want to enable true-perri mode.

### Language

Check out `LANGUAGE.md` for some documentation. Otherwise, look at the example files in this repo.


