'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _PluralsJs = require('./Plurals.js');

var _PluralsJs2 = _interopRequireDefault(_PluralsJs);

var Lang = (function () {
    function Lang(config) {
        _classCallCheck(this, Lang);

        this._lang = config;
        this._parsed = {};
        this._locale = 'en';
        this._plurals = new _PluralsJs2['default']();
    }

    /**
     * @param   {String} key
     * @returns {String|null}
     */

    _createClass(Lang, [{
        key: 'get',
        value: function get(key) {
            if (!key) {
                return key;
            }

            var parsed = this._parse(key);

            return this._getLine(parsed) || key;
        }

        /**
         *
         * @param   {String} key
         * @param   {Number} number
         * @param   {String} locale
         * @returns {String}
         */
    }, {
        key: 'choice',
        value: function choice(key, number, locale) {
            if (locale) {
                this._locale = locale;
            }

            return this._makeReplacements(this.get(key), number);
        }

        /**
         *
         * @param   {Array} parsed
         * @returns {String}
         * @private
         */
    }, {
        key: '_getLine',
        value: function _getLine(parsed) {
            var group = parsed[0];
            var item = parsed[1];
            var line = null;

            if (!this._lang[group]) {
                return line;
            }

            return item ? this._lang[group][item] : this._lang[group];
        }

        /**
         *
         * @param   {String} key
         * @returns {Array}
         * @private
         */
    }, {
        key: '_parse',
        value: function _parse(key) {
            if (this._parsed[key]) {
                return this._parsed[key];
            }

            var segments = key.split('.');
            var group = segments[0];
            var parsed = [];

            if (segments.length == 1) {
                parsed = [group, null];
            } else {
                var rest = segments.slice(1).join('.');

                parsed = [group, rest];
            }

            this._parsed[key] = parsed;
            return this._parsed[key];
        }
    }, {
        key: '_makeReplacements',
        value: function _makeReplacements(line, number) {

            // basic translation message
            var form = this._plurals.getForm(this._locale, number);
            var lines = line.split('|');

            var matched = null,
                result = null;

            // complex translation message
            _lodash2['default'].find(lines, function (item) {

                // parse single number
                matched = item.match(/^{(\d+)}\s(.+)$/);

                if (matched) {
                    if (number == matched[1]) {
                        result = matched[2];
                        return true;
                    }
                }

                // parse range
                matched = item.match(/^\[(.+)\]\s(.+)$/);

                if (matched) {
                    var range = matched[1];
                    var array = range.split(',').map(Number);

                    if (array[0] <= number && number <= array[1]) {
                        result = matched[2];
                        return true;
                    }
                }
            });

            return result || lines[form];
        }
    }]);

    return Lang;
})();

exports['default'] = Lang;
module.exports = exports['default'];