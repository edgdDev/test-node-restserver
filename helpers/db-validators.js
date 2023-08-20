const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const existeEmail = async ( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}

const existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error(`El id ${ id } no existe`);
    }
}

const existeCategoria = async ( id ) => {
    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria ) {
        throw new Error(`La categoria no existe con el id: ${ id }`)
    }
}

const existeProducto = async ( id ) => {
    const existeProducto = await Producto.findById( id );
    if ( !existeProducto ) {
        throw new Error(`El producto no existe con el id: ${ id }`)
    }
}

// Validar colecciones permitidas
const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );

    if ( !incluida ) {
        throw new Error(`La coleccion ${ coleccion } no es permitida, ${ colecciones }`);
    }

    return true;

}


module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}