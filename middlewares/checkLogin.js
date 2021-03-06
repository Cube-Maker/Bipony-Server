const jwt = require('jsonwebtoken');

exports.checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        // console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const { fullName, userId } = decoded;
        req.fullName = fullName;
        req.userId = userId;
        next();
    } catch(err) {
        console.error(err);
        next('authentication error');
    }
};

