export default class Plurals {

    constructor() {
        this._langMappings = {
            ru: 'Russian',
            en: 'English'
        }
    }

    /**
     *
     * @param {String} locale
     * @param {Number} number
     * @returns {Number}
     */
    getForm(locale, number) {
        const lang = this._langMappings[locale]

        return this['get' + lang + 'PluralForm'](number)
    }

    /**
     * Get index of Russian plural choices.
     * Russian has three plural forms.
     *
     * @param {Number} number
     * @returns {Number} index
     */
    getRussianPluralForm(number) {
        return ((number % 10 == 1) && (number % 100 != 11))
            ? 0
            : (((number % 10 >= 2)
            && (number % 10 <= 4)
            && ((number % 100 < 10)
            || (number % 100 >= 20)))
                ? 1
                : 2
        )
    }

    getEnglishPluralForm(number) {
        return number > 1 ? 1 : 0
    }
}