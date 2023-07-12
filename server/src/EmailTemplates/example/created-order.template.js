const fs = require('fs');

module.exports = {
    "admin": {
        "file": (params) => {
            let content = fs.readFileSync(__dirname + '/created-order.template-admin.html').toString();

            Object.keys(params).forEach(key => {
                const item = params[key];
                content = content.replace(key, item);
            });

            return content;
        }
    },
    "user": {
        "file": (params) => {
            let content = fs.readFileSync(__dirname + '/created-order.template.html').toString();

            Object.keys(params).forEach(key => {
                const item = params[key];
                content = content.replace(key, item);
            });

            return content;
        }
    }
}