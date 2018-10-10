exports.home = (req, res, next) => {
    const data = {
        labels: [
            { name: 'inicio', url: 'localhost:3000/' }
        ]
    }
    res.render('index', data);
}