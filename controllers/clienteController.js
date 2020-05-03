const Clientes = require('../models/Clientes');

// agrega un nuevo cliente
exports.postCliente = async (req, res, next) => {
  // se puede ver el body en postman
  console.log(req.body);

  const cliente = new Clientes(req.body);

  try{
    await cliente.save();
    res.json({ mensaje: 'Se guardo el cliente satisfactoriamente '});
  } catch(error) {
    console.log(error);
    next();
  }
};

// mostrar todos los clientes
exports.getClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch(error) {
    console.log(error);
    next();
  }
};

// mostrar un cliente
exports.getCliente = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.id);
    if(!cliente) {
      res.json({ mensaje: 'El cliente no existe'});
      next();
    }
    res.json(cliente);
};

// actualizar un cliente
exports.putCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.deleteCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndDelete({ _id: req.params.id });
    res.json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};