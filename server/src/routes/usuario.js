const express=require('express');
const userController=require('../controllers/usuarioController')
const router = express.Router();
router.post('/registrarse',userController.registrarse)
router.get('/:id',userController.obtenerUsuario)
router.post('/ingresar',userController.ingresar)
router.post('/olvidarContrasena',userController.olvidarContrasena)
router.put('/actualizar/:id',userController.actualizar)

module.exports=router