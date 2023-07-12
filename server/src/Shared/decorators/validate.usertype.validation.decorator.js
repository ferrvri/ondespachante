const jwt = require('jsonwebtoken');

module.exports = ValidateUserType = (type, fn, request) => {
    const token = request.headers['x-access-token'];
    
    if (!token) {
        throw Error('No token provided');
    }

    const data = jwt.decode(token.toString());

    if (data.user_type && data.user_type == type) {
        fn();
    }
}