define([
    'lodash',
    'dojo/_base/declare',
    'Plurals'
], function (_, declare, Plurals) {

    var plurals = new Plurals()

    var Lang = declare([], {

        constructor: function(params) {
            this._lang = params
            this._parsed = {}
        },

        /**
         *
         * @param   {string} key
         * @returns {string|null}
         */
        'get': function(key) {
            if (!key) {
                return key
            }

            var parsed = this._parse(key),
                line = this._getLine(parsed)

            return line || key
        },

        /**
         *
         * @param   {string} key
         * @param   {number} number
         * @param   {array}  replace
         * @param   {string} locale
         * @returns {string}
         */
        choice: function(key, number, replace, locale) {
            var line = this.get(key)
            return this._makeReplacements(line, number)
        },

        /**
         *
         * @param   {array} parsed
         * @returns {string}
         * @private
         */
        _getLine: function(parsed) {
            var group = parsed[0],
                item = parsed[1],
                line = null

            if (!this._lang[group]) {
                return line
            }

            return item? this._lang[group][item] : this._lang[group]
        },

        /**
         *
         * @param   {string} key
         * @returns {array}
         * @private
         */
        _parse: function(key) {
            if (this._parsed[key]) {
                return this._parsed[key]
            }

            var segments = key.split('.'),
                group = segments[0],
                parsed = []

            if (segments.length == 1) {
                parsed = [ group, null ]
            } else {
                var rest = (segments.slice(1)).join('.')
                parsed = [ group, rest ]
            }

            return this._parsed[key] = parsed
        },

        _makeReplacements: function(line, number) {
            // todo: replace with placeholders

            var lines = line.split('|'),
                matched = null,
                result = null

            // complex translation message
            _.find(lines, function(line) {
                // parse single number
                if (matched = line.match(/^{(\d+)}\s(.+)$/)) {
                    if (number == matched[1]) {
                        result = matched[2]
                        return true
                    }
                } else if (matched = line.match(/^\[(.+)\]\s(.+)$/)) {
                    // parse range
                    var range = matched[1],
                        array = range.split(',').map(Number)

                    if (array[0] <= number && number <= array[1]) {
                        result = matched[2]
                        return true
                    }
                }
            })

            // basic translation message
            var form = plurals.getForm('ru', number)

            return result || lines[form]
        },

        /**
         * @type {object}
         */
        _lang: null,

        /**
         * @type {object}
         */
        _parsed: null
    })

    return Lang
})