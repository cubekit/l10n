# Cubekit localization package for Dojo

## Usage

```javascript
var lang = new Lang({
    messages: {
        greeting: 'Hello',
        cucumbers: '{1} огурец|[2,4] огурца|[5,20] огурцов'
    }
})
lang.get('messages.greeting')
lang.choice('cucumbers', 3)
lang.choice('товар|товара|товаров', 4)
```