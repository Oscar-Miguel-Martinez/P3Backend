const Router = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { getAlumnos, getAlumno, addAlumno, updateAlumno, deleteAlumno } = require('../bml/controllers/alumnos');
const { validarJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getAlumnos);

router.get('/:id', validarJWT, getAlumno);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'La edad es requerida').not().isEmpty(),
        check('sexo', 'El sexo es requerido').not().isEmpty(),
        check('semestre', 'El semestre es requerido').not().isEmpty(),
        check('carrera', 'La carrera es requerida').not().isEmpty(),
        validarCampos
    ],
    addAlumno);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'La edad es requerida').not().isEmpty(),
        check('sexo', 'El sexo es requerido').not().isEmpty(),
        check('semestre', 'El semestre es requerido').not().isEmpty(),
        check('carrera', 'La carrera  es requerida').not().isEmpty(),
        validarCampos
    ],
    updateAlumno);

router.delete('/:id', validarJWT, deleteAlumno);

module.exports = router;