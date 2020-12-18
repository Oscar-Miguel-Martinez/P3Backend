const jwt = require('jsonwebtoken');
const { generateJWT } = require('../helpers/jwt');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.json({
            status: false,
            message: 'No se enconcontro el token',
            data: null
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: 'El Token no es valido',
            data: null
        });
    }
}

const renovarJWT = async(req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.json({
            status: false,
            message: 'No se enconcontro el token',
            data: null
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        const newtoken = await generateJWT(id);
        return res.json({
            status: true,
            message: 'El Token se actualizo',
            data: newtoken
        });
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: 'El Token no es valido',
            data: null
        });
    }
}

module.exports = {
    validarJWT,
    renovarJWT
}