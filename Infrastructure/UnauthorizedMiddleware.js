module.exports = function(req, res, next) {
    if(req.header('Authorization') === '1') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}