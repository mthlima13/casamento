module.exports = (req, res, next) => {
  const userUuid = req.headers['x-user-uuid'];
  
  if (!userUuid) {
    return res.status(401).json({ message: 'UUID do usuário não fornecido.' });
  }

  // Anexa o uuid à requisição para uso nos controllers
  req.userUuid = userUuid;
  next();
};
