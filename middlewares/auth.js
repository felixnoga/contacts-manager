const jwt = require('jsonwebtoken');

const authMidleware = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Sin autorización para acceder. No hay token.' });
  }
  try {
    //Payload of token is asigned to decoded
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({ msg: 'Token no valido' });
  }
};

module.exports = authMidleware;
