# Localization package

## Usage

```javascript
import Lang from 'cubekit-l10n'

var lang = new Lang({
    messages: {
        greeting: 'Hello',
        cucumbers: '{1} огурец|[2,4] огурца|[5,20] огурцов'
    }
})

lang.get('messages.greeting') // Hello

lang.choice('messages.cucumbers', 3) // огурца
lang.choice('товар|товара|товаров', 4, 'ru') // товара
lang.choice('orange|oranges', 100, 'en') // oranges
```

## License

[MIT](http://www.opensource.org/licenses/mit-license.php)