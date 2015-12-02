'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _LangJs = require('./Lang.js');

var _LangJs2 = _interopRequireDefault(_LangJs);

describe('Lang', function () {

    var lang = new _LangJs2['default']({
        messages: {
            greeting: 'Hello',
            cucumbers: '{1} огурец|[2,4] огурца|[5,20] огурцов'
        },
        warning: 'Alert',
        apples: '{1} There is one apple|[2,Infinity] There are many apples',
        items: '{0} There is none|[1,3] Just a few|[4,Infinity] A bunch'
    });

    it('should return null when no arguments given', function () {
        assert.equal(lang.get(), null);
    });

    it('should return translation for given string', function () {
        assert.equal(lang.get('messages.greeting'), 'Hello');
    });

    it('should return key when no translation found', function () {
        assert.equal(lang.get('messages.alert'), 'messages.alert');
    });

    it('should return translation for single key', function () {
        assert.equal(lang.get('warning'), 'Alert');
    });

    it('should return single key when no translation found', function () {
        assert.equal(lang.get('text'), 'text');
    });

    it('should return plural form (english for default) of complex translation', function () {
        assert.equal(lang.choice('apple|apples', 100), 'apples');
    });

    it('should return russian plural form of complex translation', function () {
        assert.equal(lang.choice('товар|товара|товаров', 4, 'ru'), 'товара');
    });

    it('should return single form of simple translation', function () {
        assert.equal(lang.choice('apples', 1), 'There is one apple');
    });

    it('should return plural form of simple translation', function () {
        assert.equal(lang.choice('apples', 5), 'There are many apples');
    });

    it('should return plural form of complex translation #1', function () {
        assert.equal(lang.choice('items', 2), 'Just a few');
    });

    it('should return single form of complex translation #2', function () {
        assert.equal(lang.choice('items', 0), 'There is none');
    });

    it('should return plural form of complex translation #3', function () {
        assert.equal(lang.choice('items', 100), 'A bunch');
    });

    it('should return single form of russian word cucumber', function () {
        assert.equal(lang.choice('messages.cucumbers', 3), 'огурца');
    });

    it('should return plural form of english word orange', function () {
        assert.equal(lang.choice('orange|oranges', 100, 'en'), 'oranges');
    });
});