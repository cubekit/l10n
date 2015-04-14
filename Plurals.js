define(['dojo/_base/declare'], function(declare) {

    var Plurals = declare([], {

        langMappings: {
            ru: 'Russian',
            en : 'English'
        },

        /**
         *
         * @param {string} locale
         * @param {number} number
         * @returns {number}
         */
        getForm: function(locale, number) {
            var lang = this.langMappings[locale]
            return this['get' + lang + 'PluralForm'](number)
        },

        /**
         * <p>Get index of Russian plural choices.
         * Russian has three plural forms.</p>
         *
         * @param number
         * @returns {number} index
         */
        getRussianPluralForm: function(number) {
            return ((number % 10 == 1) && (number % 100 != 11))
                ? 0
                : (((number % 10 >= 2)
                    && (number % 10 <= 4)
                    && ((number % 100 < 10)
                    || (number % 100 >= 20)))
                        ? 1
                        : 2
            )
        },

        getEnglishPluralForm: function(number) {
            return number > 1? 1 : 0
        }
    })

    return Plurals
})