const Router = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { getUsuarios, getUsuario, addUsuario, updateUsuario, deleteUsuario, recuperarPassword } = require('../bml/controllers/usuarios')
const { validarJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();

router.get('/', getUsuarios);

router.get('/:id', validarJWT, getUsuario);

router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').not().isEmpty(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    addUsuario);

router.put('/', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').not().isEmpty(),
        check('password', 'El password es requerido').not().isEmpty(),
        check('picture', 'La imagen es requerida').not().isEmpty(),
        validarCampos
    ],
    updateUsuario);

router.delete('/:id', validarJWT, deleteUsuario);

router.put('/updatepassword', [
        check('email', 'El email es requerido').not().isEmpty(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    recuperarPassword);

module.exports = router;