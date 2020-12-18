const Router = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { getDocentes, getDocente, addDocente, updateDocente, deleteDocente } = require('../bml/controllers/docentes');
const { validarJWT } = require('../bml/middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getDocentes);

router.get('/:id', validarJWT, getDocente);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'La edad es requerida').not().isEmpty(),
        check('titulo', 'El titulo es requerido').not().isEmpty(),
        check('tipo', 'El tipo es requerido').not().isEmpty(),
        validarCampos
    ],
    addDocente);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'La edad es requerida').not().isEmpty(),
        check('titulo', 'El titulo es requerido').not().isEmpty(),
        check('tipo', 'El tipo es requerido').not().isEmpty(),
        validarCampos
    ],
    updateDocente);

router.delete('/:id', validarJWT, deleteDocente);

module.exports = router;