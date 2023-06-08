const sequelize = require("../config/database");
const { Op } = require('sequelize');
const tarea = require("../models/tarea");

const crear=async(req,res)=>{
  try {
    const data = req.body;
    const tare = await tarea.create({
      titulo:data.titulo,
      descripcion:data.descripcion,
      dificultad:data.dificultad,
      estado: "Pending",
      IdUsuario:data.IdUsuario
    });
    return res.status(200).json({
      message: "Registrado Correctamente",
      tarea: tare.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Id de usuario No valida",
      error: error,
    });
  }
}
const buscarTareas=async(req,res)=>{
  try {
    const tare=await tarea.findAll()
    return res.status(200).json({
      message: "tareas:",
      tarea: tare,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar las tareas:",
      error: error,
    });
  }
}
const BuscarTareasUser=async(req,res)=>{
  const idUsuario = req.params.id;
  try {
    const tare = await tarea.findAll({ where: { IdUsuario: idUsuario } });
    return res.status(200).json({
      message: "tareas:",
      tarea: tare,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar las tareas por ID de usuario",
      error: error,
    });
  }
}
const BuscarTareasUserFilter=async(req,res)=>{
  const idUsuario = req.params.id;
  const buscar = req.body
  try {
    const tare = await tarea.findAll({ where: { IdUsuario: idUsuario, titulo : {[Op.like]: `%${buscar.filtro}%`} } });
    return res.status(200).json({
      message: "tareas:",
      tarea: tare,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar las tareas por ID de usuario",
      error: error,
    });
  }
}
const BuscarTareasId=async(req,res)=>{
  const idTarea = req.params.id;
  try {
    const tare= await tarea.findByPk(idTarea);
    return res.status(200).json({
      message: "tarea:",
      tarea: tare,
    });
  } catch (error) {
    console.error('Error al consultar las tarea por ID:', error);
    return res.status(500).json({
      message: "Error al consultar las tareas por ID de usuario",
      error: error,
    });
  }
}
const editar=async(req,res)=>{
  const idTarea = req.params.id;
  const data = req.body;
  try {
    const tare = await tarea.findByPk(idTarea);
    if (!tare) {
      return res.status(500).json({ error: 'La tarea no existe' });
    }
    tare.titulo = data.titulo;
    tare.descripcion = data.descripcion;
    tare.dificultad = data.dificultad;
    await tare.save();
    return res.status(200).json({
      message: "Atualizado correctamente",
      tarea: tare,
    });
  } catch (error) {
    console.error('Error al actualizar la tarea por ID:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea por ID' });
  }
}
const editarEstado=async(req,res)=>{
  const idTarea = req.params.id;
  const data = req.body;
  try {
    const tare= await tarea.findByPk(idTarea);
    if (!tare) {
      return res.status(500).json({ error: 'La tarea no existe' });
    }
    tare.estado = data.estado;
    await tare.save();
    return res.status(200).json({
      message: "Estado Atualizado correctamente",
      tarea: tare,
    });
  } catch (error) {
    console.error('Error al actualizar el estado de la tarea por ID:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea por ID' });
  }
}
const eliminar=async(req,res)=>{
  const idTarea = req.params.id;
  try {
    const tare = await tarea.findByPk(idTarea);
    if (!tare) {
      return res.status(500).json({ error: 'La tarea no existe' });
    }
    await tare.destroy();
    return res.status(200).json({
      message: "Tarea Eliminada Correctamente",
    });
  } catch (error) {
    console.error('Error al eliminar la tarea por ID:', error);
    res.status(500).json({ error: 'Error al eliminar la tarea por ID' });
  }
}
const basura=async(req,res)=>{
  const idUsuario = req.params.id;
  try {
    const tare = await tarea.findAll({ where: { IdUsuario: idUsuario , estado:"Dashing"} });
    return res.status(200).json({
      message: "tareas:",
      tarea: tare,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar las tareas por ID de usuario",
      error: error,
    });
  }
}
const tareas=async(req,res)=>{
  const idUsuario = req.params.id;
  try {
    const tare = await tarea.findAll({ where: { IdUsuario: idUsuario , [Op.not]: [ { estado: 'Dashing' }] }});
    return res.status(200).json({
      message: "tareas:",
      tarea: tare,
    });
  } catch (error) {
    console.error('Error al consultar las tarea por ID:', error);
    return res.status(500).json({
      message: "Error al consultar las tareas por ID de usuario",
      error: error,
    });
  }
}

const basuraFiltro=async(req,res)=>{
  const idUsuario = req.params.id;
  const buscar = req.body
  try {
    const tare = await tarea.findAll({ where: { IdUsuario: idUsuario , estado:"Dashing", titulo : {[Op.like]: `%${buscar.filtro}%`}} });
    return res.status(200).json({
      message: "tareas:",
      tarea: tare,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar las tareas por ID de usuario",
      error: error,
    });
  }
}
const tareasFiltro=async(req,res)=>{
  const idUsuario = req.params.id;
  const buscar = req.body
  try {
    const tare = await tarea.findAll({ where: { IdUsuario: idUsuario , [Op.not]: [ { estado: 'Dashing' }], titulo : {[Op.like]: `%${buscar.filtro}%`} }});
    return res.status(200).json({
      message: "tareas:",
      tarea: tare,
    });
  } catch (error) {
    console.error('Error al consultar las tarea por ID:', error);
    return res.status(500).json({
      message: "Error al consultar las tareas por ID de usuario",
      error: error,
    });
  }
}

module.exports = {
  crear,
  buscarTareas,
  BuscarTareasUser,
  BuscarTareasId, 
  editar,
  editarEstado,
  eliminar,
  basura,
  tareas,
  BuscarTareasUserFilter,
  basuraFiltro,
  tareasFiltro
};
