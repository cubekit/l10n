export default class Plurals {

    constructor() {
        this.langMappings = {
            ru: 'Russian',
            en: 'English'
        }
    }

    /**
     *
     * @param {string} locale
     * @param {number} number
     * @returns {number}
     */
    getForm(locale, number) {
        let lang = this.langMappings[locale]
        return this['get' + lang + 'PluralForm'](number)
    }

    /**
     * Get index of Russian plural choices.
     * Russian has three plural forms.
     *
     * @param number
     * @returns {number} index
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