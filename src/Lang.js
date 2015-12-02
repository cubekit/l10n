import _ from 'lodash'
import Plurals from './Plurals.js'

export default class Lang {

    constructor(config) {
        this._lang = config
        this._parsed = {}
        this._locale = 'en'
        this._plurals = new Plurals()
    }

    /**
     * @param   {String} key
     * @returns {String|null}
     */
    'get'(key) {
        if (!key) {
            return key
        }

        const parsed = this._parse(key)

        return this._getLine(parsed) || key
    }

    /**
     *
     * @param   {String} key
     * @param   {Number} number
     * @param   {String} locale
     * @returns {String}
     */
    choice(key, number, locale) {
        if (locale) {
            this._locale = locale
        }

        return this._makeReplacements(this.get(key), number)
    }

    /**
     *
     * @param   {Array} parsed
     * @returns {String}
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
     * @param   {String} key
     * @returns {Array}
     * @private
     */
    _parse(key) {
        if (this._parsed[key]) {
            return this._parsed[key]
        }

        const segments = key.split('.')
        const group = segments[0]
        let parsed = []

        if (segments.length == 1) {
            parsed = [ group, null ]
        } else {
            const rest = (segments.slice(1)).join('.')

            parsed = [ group, rest ]
        }

        this._parsed[key] = parsed
        return this._parsed[key]
    }

    _makeReplacements(line, number) {

        // basic translation message
        const form = this._plurals.getForm(this._locale, number)
        const lines = line.split('|')

        let matched = null,
            result = null

        // complex translation message
        _.find(lines, function(item) {

            // parse single number
            matched = item.match(/^{(\d+)}\s(.+)$/)

            if (matched) {
                if (number == matched[1]) {
                    result = matched[2]
                    return true
                }
            }

            // parse range
            matched = item.match(/^\[(.+)\]\s(.+)$/)

            if (matched) {
                const range = matched[1]
                const array = range.split(',').map(Number)

                if (array[0] <= number && number <= array[1]) {
                    result = matched[2]
                    return true
                }
            }
        })

        return result || lines[form]
    }
}