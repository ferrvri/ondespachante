const objectpropequal = require("../utils/objectpropequal");

module.exports = RequestBodyValidation = (fn, request, model) => {
    const props = Object.getOwnPropertyNames(model);

    let equality = true;

    for (let prop of props) {
        if (prop in request.body
            // && !(request.body[prop].length < 1)
            && objectpropequal(request.body, prop)) {
            equality = true
        } else {
            equality = false;
            break;
        }
    }

    if (!equality) {
        throw Error('Object failed on validation contains different expected body value');
    } else {
        fn();
    }
}