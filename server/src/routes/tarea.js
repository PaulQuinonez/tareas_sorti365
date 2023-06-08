const express=require('express');
const tareaController=require('../controllers/tareaController')
const router = express.Router();

router.post('/crear',tareaController.crear)
router.get('/buscarTareas',tareaController.buscarTareas)
router.get('/BuscarTareasUsuario/:id',tareaController.BuscarTareasUser )
router.post('/filtroDashboard/:id',tareaController.BuscarTareasUserFilter )
router.post('/filtroTasks/:id',tareaController.tareasFiltro )
router.post('/filtroTrash/:id',tareaController.basuraFiltro )
router.get('/BuscarTareasId/:id',tareaController.BuscarTareasId)
router.put('/editar/:id',tareaController.editar)
router.put('/editarEstado/:id',tareaController.editarEstado)
router.delete('/eliminar/:id',tareaController.eliminar)
router.get('/basura/:id',tareaController.basura )
router.get('/:id',tareaController.tareas)
module.exports=router