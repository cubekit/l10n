define([
    'intern!tdd',
    'intern/chai!assert',
    'cubekit-l10n/Lang'
], function (tdd, assert, Lang) {

    tdd.suite('Lang', function(){

        var lang = new Lang({
            messages: {
                greeting: 'Hello'
            },
            warning: 'Alert',
            apples: '{1} There is one apple|[2,Infinity] There are many apples',
            items: '{0} There is none|[1,3] Just a few|[4,Infinity] A bunch'
        })

        tdd.test('should return null when no arguments given', function() {
            assert.equal(lang.get(), null)
        })

        tdd.test('should return translation for given string', function() {
            assert.equal(lang.get('messages.greeting'), 'Hello')
        })

        tdd.test('should return key when no translation found', function() {
            assert.equal(lang.get('messages.alert'), 'messages.alert')
        })

        tdd.test('should return translation for single key', function() {
            assert.equal(lang.get('warning'), 'Alert')
        })

        tdd.test('should return single key when no translation found', function() {
            assert.equal(lang.get('text'), 'text')
        })

        tdd.test('should return plural form (english for default) of complex translation', function() {
            assert.equal(lang.choice('apple|apples', 100), 'apples')
        })

        tdd.test('should return russian plural form of complex translation', function() {
            assert.equal(lang.choice('товар|товара|товаров', 4, 'ru'), 'товара')
        })

        tdd.test('should return single form of simple translation', function() {
            assert.equal(lang.choice('apples', 1), 'There is one apple')
        })

        tdd.test('should return plural form of simple translation', function() {
            assert.equal(lang.choice('apples', 5), 'There are many apples')
        })

        tdd.test('should return plural form of complex translation #1', function() {
            assert.equal(lang.choice('items', 2), 'Just a few')
        })

        tdd.test('should return single form of complex translation #2', function() {
            assert.equal(lang.choice('items', 0), 'There is none')
        })

        tdd.test('should return plural form of complex translation #3', function() {
            assert.equal(lang.choice('items', 100), 'A bunch')
        })
    })
})