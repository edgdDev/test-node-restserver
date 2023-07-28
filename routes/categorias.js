
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const { crearCategorias, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');

const router = Router();

// * Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// * Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoria)

// * Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], crearCategorias )


// * Actualizar - privado - cualquier con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoria ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria)

// * Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoria ),
    esAdminRole,
    validarCampos
], borrarCategoria)


module.exports = router;