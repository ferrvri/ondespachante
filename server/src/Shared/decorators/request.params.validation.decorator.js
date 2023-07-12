module.exports = RequestParamsValidation = (fn, request, model) => {
    const props = Object.getOwnPropertyNames(model);

    let equality = true;

    for (let prop of props) {
        if (prop in request.params && !(request.params[prop].length < 1)) {
            equality = true
        } else {
            equality = false;
        }
    }

    if (!equality) {
        throw Error('Object failed on validation @RequestBodyValidation:' + propertyKey + ' contains, some body value');
    } else {
        fn();
    }
}