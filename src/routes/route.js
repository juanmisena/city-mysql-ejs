// imports modules
const router = require('express').Router();
const cityController = require('../controller/cityController');
const depController = require('../controller/depController');
const userController = require('../controller/userController');

// get city
router.get('/', cityController.list);
router.get('/addCity', cityController.add);
router.get('/deletecity/:id', cityController.delete);
router.get('/editcity/:id', cityController.edit);
router.get('/searchcity', cityController.search);
router.get('/getcity', cityController.searchcity);

// get departament
router.get('/indexdep', depController.listdep);
router.get('/addepartament', depController.addep);
router.get('/deletedep/:id', depController.deletedep);
router.get('/editdep/:id', depController.editdep);
router.get('/searchdep', depController.searchd);
router.get('/getdep', depController.searchdep);

// get user
router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/logout', userController.logout);
router.get('/passreset', userController.passreset);
router.get('/passresetuni/:id_user', userController.passresetuni);

// post city
router.post('/addcity' , cityController.save);
router.post('/updatecity/:id', cityController.update);

// post departament
router.post('/addep', depController.savedep);
router.post('/updatedep/:id', depController.updatedep);

// post user
router.post('/login', userController.saveuser);
router.post('/passreset', userController.passresetsave);
router.post('/register', userController.registersave);
// exports module
module.exports = router;