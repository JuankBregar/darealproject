//Dependencies
const express = require('express');
const multer = require('multer');
const controller = require('../controllers/products');

//Multer config
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, `${new Date().toISOString()}_${file.originalname}`)
    }
});

const fileFilter = (req, file, callback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/x-png'];
    callback(null, allowedTypes.includes(file.mimetype));
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //5MB
    },
    fileFilter: fileFilter
})

const app = express();

//Routes
app.get('/', controller.get);
app.get('/add', controller.add_view);
app.post('/add', upload.single('images'), controller.add)
app.get('/:name', controller.getByName);
app.get('/add/:name', controller.getByName)
app.post('/update_inventory', upload.single('images'), controller.add_inventory);

module.exports = app;