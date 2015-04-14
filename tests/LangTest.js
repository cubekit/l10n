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

        assert.equal(lang.get(), null)
        assert.equal(lang.get('messages.greeting'), 'Hello')
        assert.equal(lang.get('messages.alert'), 'messages.alert')
        assert.equal(lang.get('warning'), 'Alert')
        assert.equal(lang.get('text'), 'text')

        assert.equal(lang.choice('товар|товара|товаров', 4), 'товара')

        assert.equal(lang.choice('apples', 1), 'There is one apple')
        assert.equal(lang.choice('apples', 5), 'There are many apples')
        assert.equal(lang.choice('items', 2), 'Just a few')
        assert.equal(lang.choice('items', 0), 'There is none')
        assert.equal(lang.choice('items', 100), 'A bunch')
    })
})