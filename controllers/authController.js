const Usuario = require('../controllers/User');  // Asegúrate de que la ruta sea correcta según tu estructura de directorios
const jwt = require('jsonwebtoken'); // Asegúrate de importar la librería

const register = async (req, res) => {
const { user, password, email } = req.body;

  // Validar que los campos no estén vacíos
  if (!user || !password || !email) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ user });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear el nuevo usuario
    const nuevoUsuario = new Usuario({ user, password, email });

    // Guardar el nuevo usuario
    const usuarioGuardado = await nuevoUsuario.save();

    // Responder al cliente
    res.status(201).json({ message: 'Usuario registrado correctamente', usuario: usuarioGuardado });
  } catch (err) {
    console.error('Error al registrar el usuario:', err);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

// Inicio de sesión
const login = async (req, res) => {
  const { user, password } = req.body;

  try {
    if (!user || !password) {
      return res.status(400).json({
        status: 'Error',
        message: 'Usuario y contraseña son requeridos',
      });
    }

    const existingUser = await Usuario.findOne({ user });
    if (!existingUser) {
      return res.status(404).json({
        status: 'Error',
        message: 'Usuario no encontrado',
      });
    }

    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'Error',
        message: 'Contraseña incorrecta',
      });
    }

    const token = jwt.sign(
      { id: existingUser._id, user: existingUser.user },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      status: 'Success',
      message: 'Inicio de sesión exitoso',
      token,
    });
  } catch (err) {
    console.error('Error en el inicio de sesión:', err);
    res.status(500).json({
      status: 'Error',
      message: 'Error interno del servidor',
    });
  }
};


module.exports = {
  register,
  login,
};