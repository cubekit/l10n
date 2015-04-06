define([], function(){

    // Disable the displaying of code coverage

    try {
        var _global = window
    } catch (e) {
        _global = global
    }

    _global.__internCoverage = undefined

})