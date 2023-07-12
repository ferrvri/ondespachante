const jwt = require('jsonwebtoken');

module.exports = class AuthenticationService {
    $mySQLService;

    constructor(
        mysqlService
    ) {
        this.$mySQLService = mysqlService;
    }

    authentiationSocketMiddleware() {
        return (socket, next) => {
            if (socket.handshake.query && socket.handshake.query.token) {
                jwt.verify(socket.handshake.query.token.toString(),
                    process.env.SECRET
                    , async (err, decoded) => {
                        if (err) return next(new Error('Authentication error'));
                        (socket).decoded = decoded;

                        if (this.$mySQLService) {
                            const user = (await this.$mySQLService.query(`
                                SELECT user_id, user_nome, user_email, user_login, user_cpf from usuario where user_id = ?
                            `, [(decoded).user_id]))[0];

                            if (!user) {
                                return next(new Error('User not found error'));
                            }

                            (socket).user = user;
                        }

                        next();
                    });
            }
            else {
                next(new Error('Authentication error'));
            }
        }
    }

    login(user_email, user_senha) {
        return new Promise((resolve, reject) => {
            this.$mySQLService.query(`
                select user_id, user_nome, user_email, user_login, user_cpf from usuario where user_login = ? and user_senha = md5(?)
            `,
                [user_email, user_senha]
            ).then((data) => {
                if (data.length < 1) {
                    resolve({ success: false, errorMessage: 'Usuário ou senha incorretos!' });
                } else {
                    const token = this.signSession(data[0].user_id, data[0].user_type);

                    resolve({ success: true, data: { user: data[0], token } });
                }
            }, err => reject(err));
        });
    }

    signSession(user_id, user_type) {
        const token = jwt.sign({
            user_id,
            user_type
        }, process.env.SECRET.toString(), {
            expiresIn: '9999 days'
        });

        return token;
    }
}