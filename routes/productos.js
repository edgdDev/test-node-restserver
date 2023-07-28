
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');

const router = Router();

// * Obtener todas las categorias - publico
router.get('/', obtenerProductos);

// * Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], obtenerProducto)

// * Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validarCampos,
], crearProducto )


// * Actualizar - privado - cualquier con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], actualizarProducto)

// * Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProducto ),
    esAdminRole,
    validarCampos
], borrarProducto)


module.exports = router;