const Productos = require('../models/Productos');

exports.postProducto = async (req, res, next) => {
    const producto = new Productos(req.body);
    try {
        await producto.save();
        res.json({mensaje : 'Se agrego un nuevo producto'})
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.getProductos = async (req, res, next) => {
  try {
      const productos = await Productos.find({});
      res.json(productos);
  } catch (error) {
      console.log(error);
      next();
  }
}

exports.getProducto = async (req, res, next) => {
  const producto = await Productos.findById(req.params.id);

  if(!producto) {
      res.json({mensaje : 'Ese Producto no existe'});
      return next();
  }

  res.json(producto);
}

exports.putProducto = async (req, res, next) => {
  try {
    const producto = await Productos.findOneAndUpdate({_id: req.params.id}, req.body, {
        new : true,
    });
    res.json(producto);
  } catch(error) {
    console.log(error);
    next();
  }
};

exports.deleteProducto = async (req, res, next) => {
  try {
    await Productos.findByIdAndDelete({ _id : req.params.id });
    res.json({mensaje : 'El Producto se ha eliminado'});
  } catch (error) {
    console.log(error);
    next();
  }
}

exports.buscarProducto = async (req, res, next) => {
  try{
    // obtener query
    const { query } = req.params;
    // con regex me reconoce las diferentes formas de escribir algo por ejemplo Vue.js vue.js VUE.JS
    const producto = await Productos.find({ nombre: new RegExp(query, 'i')});
    res.json(producto);
  } catch(error) {
    console.log(error);
    next();
  }
};



