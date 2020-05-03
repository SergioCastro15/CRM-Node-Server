const Pedidos = require('../models/Pedidos');

exports.postPedido = async (req, res, next) => {
  const pedido = new Pedidos(req.body);
  try {
    await pedido.save();
    res.json({ mensaje: 'Se guardo correctamente el pedido' });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.getPedidos = async (req, res, next) => {
  try{
    const pedidos = await Pedidos.find({}).populate('cliente').populate({
      // path busca la referencia del modelo actual si tiene mas de un nivel
      path: 'pedido.producto',
      // el modelo del que va a traer los datos
      model: 'Productos'
    });
    res.json(pedidos);
  } catch(error) {
    console.log(error);
    next();
  }
};

exports.getPedido = async (req, res, next) => {
  const pedido = await Pedidos.findById(req.params.id).populate('cliente').populate({
    // path busca la referencia del modelo actual si tiene mas de un nivel
    path: 'pedido.producto',
    // el modelo del que va a traer los datos
    model: 'Productos'
  });
  if(!pedido) {
    res.json({ mensaje: 'No existe este pedido '});
    return next();
  }
  res.json(pedido);
};

exports.putPedido = async (req, res, next) => {
  try {
    const pedido = await Pedidos.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    })
    .populate('cliente')
    .populate({
      path: 'pedido.producto',
      model: 'Productos'
    });
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.deletePedido = async (req, res, next) => {
  try {
    await Pedidos.findOneAndDelete({ _id: req.params.id });
    res.json({ mensaje: 'Se ha eliminado correctamente el pedido '});
  } catch (error) {
    console.log(error);
    next();
  }
};