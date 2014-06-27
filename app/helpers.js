/*!
 * node.extend
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * @fileoverview
 * Port of jQuery.extend that is an object prototype
 */

var is = require('is');

String.prototype.proper = function () {
    return this.substring(0,1).toUpperCase() + this.substring(1);
};

String.prototype.camelCase = function (separator) {
    var sep = separator || ' ';

    var str = this.split(sep);
    var returnStr = str[0].toLowerCase();
    for (var i = 1; str[i]; i++)
        returnStr += str[i].proper();

    return returnStr;
}

String.prototype.str_finish = function (chr) {
    return this.slice(-1) == chr ? this.toString() : this + chr;
}

String.prototype.extension = function () {
    return this.indexOf('.') == -1 ? 'No File Extension' : this.split('.').slice(-1)[0];
}

String.prototype.remove_extension = function () {
    var str = this.split('.');
    str.pop();
    return str.join('.');
}

Object.defineProperty(Object.prototype, "jqextend", {
    enumerable: false,
    value: function jqextend() {
        var target = arguments[0] || {};
        var i = 1;
        var length = arguments.length;
        var deep = false;
        var options, name, src, copy, copy_is_array, clone;

        // Handle a deep copy situation
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== 'object' && !is.fn(target)) {
            target = {};
        }

        if (length === i) {
            target = this;
            --i;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            options = arguments[i]
            if (options != null) {
                if (typeof options === 'string') {
                    options = options.split('');
                }
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (is.hash(copy) || (copy_is_array = is.array(copy)))) {
                        if (copy_is_array) {
                            copy_is_array = false;
                            clone = src && is.array(src) ? src : [];
                        } else {
                            clone = src && is.hash(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = Object.prototype.jqextend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (typeof copy !== 'undefined') {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    }
});