const sequelize = require("../config/database");
const forge = require('node-forge');
require("dotenv").config();
const usuario = require("../models/usuario");
const nodemailer = require('nodemailer');
const jwt = require('../middlewares/jwt');

const registrarse = async (req, res) => {
  try {
    const data = req.body;
    if (data.password) {

      const usu = await usuario.findOne({
        attributes: ["cedula", "password"],
        where: { cedula: data.cedula },
      });
      if (usu) {
        return res.status(401).json({ message: "Cedula Existente" });
      } else {
        const nuevoUsu = await usuario.create({
          nombres: data.nombres,
          apellidos: data.apellidos,
          cedula: data.cedula,
          telefono: data.telefono,
          correo: data.correo,
          password: data.password,
        });
        return res
          .status(200)
          .json({
            message: "Registrado Correctamente",
            user: nuevoUsu.toJSON(),
          });
      }
    } else {
      res.status(402).send({ error: 'No se ingresó una contraseña' })
    }
  } catch (error) {
    return res.status(500).json(err)
  }
}
const ingresar = async (req, res) => {
  try {
    const data = req.body
    const ipAddress = req.ip;
    const usu = await usuario.findOne({
      attributes: ["correo", "password", "nombres", "apellidos", "telefono", "id", "cedula"],
      where: { cedula: data.cedula },
    });
    if (usu) {
      if (usu.password == data.password) {
        const user_data = {
          id: usu.id,
          nombres: usu.nombres,
          apellidos: usu.apellidos,
          cedula: usu.cedula,
          telefono: usu.telefono,
          correo: usu.correo,
          ip: ipAddress
        };
        if (data.gettoken) {
          const token = jwt.createToken(user_data);
          res.status(200).send({
            jwt: token,
            user: user_data,
          });
          console.log(jwt);
        } else {
          res.status(200).send({
            user: user_data,
            message: 'no token',
            jwt: jwt.createToken(user_data),
          });
        }
      } else {
        return res.status(402).json({ message: "Las credenciales no coinciden" });
      }
    } else {
      return res.status(401).json({ message: "La Cédula no existe" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
var trasnportador = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

const obtenerUsuario = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const usuarioObtenido = await usuario.findByPk(usuarioId);
    if (!usuarioObtenido) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json(usuarioObtenido);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener el usuario por ID" });
  }
}

const olvidarContrasena = async (req, res) => {
  try {
    const data = req.body;
    const usu = await usuario.findOne({
      attributes: ["correo", "cedula", "password"],
      where: { correo: data.correo },
    });
    if (usu) {
      var opcionCorreo = {
        from: process.env.EMAIL,
        to: usu.correo,
        subject: "Olvido su contraseña?:",
        html: '<p><b> Sus credenciales para ingresar son:</b><br><b>Cedula:</b>' + usu.cedula + '<br><b>Contraseña:</b>' + usu.password + '<br><a href="http://localhost:4200">Click para ingresar</a> </p>'
      };
      trasnportador.sendMail(opcionCorreo, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email enviado " + info.response);
        }
      });
      return res.status(200).json({ message: "Contraseña enviada a tu correo" })
    } else {
      return res.status(401).json({ message: "Correo no existe" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
const actualizar = async (req, res) => {
  const usuarioId = req.params.id;
  const data = req.body;
  try {
    const usuarioedita = await usuario.findByPk(usuarioId);
    if (!usuarioedita) {
      return res.status(500).json({ error: 'El usuario no existe' });
    }
    usuarioedita.nombres = data.nombres;
    usuarioedita.apellidos = data.apellidos;
    usuarioedita.cedula = data.cedula;
    usuarioedita.telefono = data.telefono;
    usuarioedita.correo = data.correo;
    usuarioedita.password = data.password;
    await usuarioedita.save();
    return res.status(200).json({
      message: "Usuario atualizado correctamente",
      user: usuarioedita,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al actualizar el usuario por ID' });
  }
}

module.exports = {
  registrarse,
  ingresar,
  olvidarContrasena,
  actualizar,
  obtenerUsuario
};
