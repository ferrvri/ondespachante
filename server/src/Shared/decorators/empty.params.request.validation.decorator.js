module.exports = EmptyRequestValidation = (fn, request) => {
    let haveSomeItem = Object.keys(request.params).length > 0 || Object.keys(request.query).length > 0 ||
        Object.keys(request.body).length > 0;

    if (haveSomeItem) {
        throw Error('Error have item on request');
    } else {
        fn();
    }
}