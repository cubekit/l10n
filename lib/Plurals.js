'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Plurals = (function () {
    function Plurals() {
        _classCallCheck(this, Plurals);

        this._langMappings = {
            ru: 'Russian',
            en: 'English'
        };
    }

    /**
     *
     * @param {String} locale
     * @param {Number} number
     * @returns {Number}
     */

    _createClass(Plurals, [{
        key: 'getForm',
        value: function getForm(locale, number) {
            var lang = this._langMappings[locale];

            return this['get' + lang + 'PluralForm'](number);
        }

        /**
         * Get index of Russian plural choices.
         * Russian has three plural forms.
         *
         * @param {Number} number
         * @returns {Number} index
         */
    }, {
        key: 'getRussianPluralForm',
        value: function getRussianPluralForm(number) {
            return number % 10 == 1 && number % 100 != 11 ? 0 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2;
        }
    }, {
        key: 'getEnglishPluralForm',
        value: function getEnglishPluralForm(number) {
            return number > 1 ? 1 : 0;
        }
    }]);

    return Plurals;
})();

exports['default'] = Plurals;
module.exports = exports['default'];