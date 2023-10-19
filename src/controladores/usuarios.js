const fs = require('fs');                                                     // Importando el modulo de nodejs para trabajar con archivos binarios
const controlador = {};                                                       // Creando mi objeto controlador que me servira para exportar mis funciones

controlador.crearUsuario = (req, res) => {                                    // Creando mi funcion para crear usuarios
  const data = req.body;                                                      // Recuperando la data que viene del cliente, recuperamos la data que viene en el body de la peticion

  if (fs.existsSync('usuarios.bin')) {                                        // Validar si ya existe el archivo binario llamadao usuarios.bin
    const buffer = fs.readFileSync('usuarios.bin');                           // Si exista ya el archivo binario, leer el archivo binario
    const dataAnterior = JSON.parse(buffer.toString());

    dataAnterior.push(data);                                                  // Agregar la nueva data al arreglo
    const bufferNuevo = Buffer.from(JSON.stringify(dataAnterior));            // Ingresando mi arreglo en un archivo binario
    
    fs.writeFileSync('usuarios.bin', bufferNuevo);
    return res.send('Creando usuarios desde el controlador si existe');
  }

  const arreglo = [];                                                         
  arreglo.push(data);                                                         // Ingresando la data en un arreglo

  const buffer = Buffer.from(JSON.stringify(arreglo));                        // Ingresando mi arreglo en un archivo binario
  fs.writeFileSync('usuarios.bin', buffer);

  return res.send('Creando usuarios desde el controlador');                   // Esto se envia cada vez que se crea un usuario
}



controlador.leerUsuarios = (req, res) => {                                    // Creando mi funcion para leer usuarios desde el archivo binario
  const buffer = fs.readFileSync('usuarios.bin');                             // Leyendo el archivo binario
  const data = JSON.parse(buffer.toString());                                 // Convirtiendo el archivo binario a un objeto de javascript
  res.send(data);
}



controlador.eliminarUsuario = (req, res) => {
  const usuarioId = req.params.id;                                                    // Recuperando el id del usuario que se va a eliminar
  
  if (fs.existsSync('usuarios.bin')) {                                                // Validar si ya existe el archivo binario llamadao usuarios.bin
    const buffer = fs.readFileSync('usuarios.bin');                                   // Si existe, leer el archivo binario
    const dataAnterior = JSON.parse(buffer.toString());                               // Convirtiendo el archivo binario a un objeto de javascript
    const dataNueva = dataAnterior.filter((usuario) => usuario.id != usuarioId);      // Eliminar el usuario

    const bufferNuevo = Buffer.from(JSON.stringify(dataNueva));                       // Ingresando mi arreglo en un archivo binario
    fs.writeFileSync('usuarios.bin', bufferNuevo);
    return res.send('Eliminando usuarios desde el controlador si existe');
  }
  
  return res.send('No existe el archivo');                                            // Esto se envia si y solo si no existe el archivo binario
}



controlador.actualizarUsuario = (req, res) => {                                    // Creando mi funcion para actualizar usuarios
  const data = req.body;                                                           // Recuperando la data que viene del cliente, recuperamos la data que viene en el body de la peticion
  const usuarioId = req.params.id;
  
  if (fs.existsSync('usuarios.bin')) {                                              // Validar si ya existe el archivo binario llamadao usuarios.bin
    const buffer = fs.readFileSync('usuarios.bin');                                 // Si existe, leer el archivo binario
    const dataAnterior = JSON.parse(buffer.toString());

    const dataNueva = dataAnterior.map((usuario) => {                               // Actualizamo el usuario al recorrer el arreglo y encontrar el usuario que se va a actualizar para luego actualizarlo
      if (usuario.id == usuarioId) {                          
        return data;
      }
      return usuario;
    });

    const bufferNuevo = Buffer.from(JSON.stringify(dataNueva));                     // Ingresando mi arreglo en un archivo binario
    fs.writeFileSync('usuarios.bin', bufferNuevo);
    return res.send('Actualizando usuarios desde el controlador si existe');
  }

  return res.send('No existe el archivo');                                          // Esto se envia si y solo si no existe el archivo binario
}


module.exports = controlador;                                                       // Exportando mi objeto controlador para poder usarlo en otros archivos