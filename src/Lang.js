import _ from 'lodash'
import Plurals from './Plurals.js'

let plurals = new Plurals()

export default class Lang {

    constructor(config) {
        this._lang = config
        this._parsed = {}
        this._locale = 'en'
    }

    /**
     *
     * @param   {string} key
     * @returns {string|null}
     */
    'get'(key) {
        if (!key) {
            return key
        }

        let parsed = this._parse(key),
            line = this._getLine(parsed)

        return line || key
    }

    /**
     *
     * @param   {string} key
     * @param   {number} number
     * @param   {string} locale
     * @returns {string}
     */
    choice(key, number, locale) {
        let line = this.get(key)

        if (locale) {
            this._locale = locale
        }

        return this._makeReplacements(line, number)
    }

    /**
     *
     * @param   {array} parsed
     * @returns {string}
     * @private
     */
    _getLine(parsed) {
        const group = parsed[0]
        const item = parsed[1]
        const line = null

        if (!this._lang[group]) {
            return line
        }

        return item ? this._lang[group][item] : this._lang[group]
    }

    /**
     *
     * @param   {string} key
     * @returns {array}
     * @private
     */
    _parse(key) {
        if (this._parsed[key]) {
            return this._parsed[key]
        }

        var segments = key.split('.'),
            group = segments[0],
            parsed = []

        if (segments.length == 1) {
            parsed = [ group, null ]
        } else {
            let rest = (segments.slice(1)).join('.')

            parsed = [ group, rest ]
        }

        return this._parsed[key] = parsed
    }

    _makeReplacements(line, number) {

        let lines = line.split('|'),
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
                let range = matched[1],
                    array = range.split(',').map(Number)

                if (array[0] <= number && number <= array[1]) {
                    result = matched[2]
                    return true
                }
            }
        })

        // basic translation message
        let form = plurals.getForm(this._locale, number)

        return result || lines[form]
    }
}