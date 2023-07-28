const { request, response } = require('express');
const { Categoria } = require('../models');


const obtenerCategorias = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true })
            .skip( Number( desde ) )
            .limit( Number( limite ) )
            .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        categorias
    });

}

const obtenerCategoria = async (req = request, res = response) => {
    
    const { id } = req.params;

    const categoria = await Categoria.findById( id )

    res.json( categoria );

}

const crearCategorias = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    
    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }

    // * Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria( data );

    // * Guardar
    await categoria.save();

    res.status(201).json( categoria );

}

const actualizarCategoria = async (req = request, res = response) => {
    
    const { id } = req.params;
    const { _id, usuario, estado, ...resto } = req.body;

    const categoria = await Categoria.findByIdAndUpdate( id, resto, { new: true } );

    res.json( categoria );

}

const borrarCategoria = async (req = request, res = response) => {
    
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json( categoria );

}



module.exports = {
    crearCategorias,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}