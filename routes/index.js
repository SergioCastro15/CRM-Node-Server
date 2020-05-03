const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

module.exports = function() {

    //// CLIENTES //////
  // agrega nuevos clientes POST
  router.post('/postCliente', clienteController.postCliente);
  // muestra todos los clientes
  router.get('/getClientes', clienteController.getClientes);
  // muestra un solo cliente
  router.get('/getCliente/:id', clienteController.getCliente);
  // actualiza cliente
  router.put('/putCliente/:id', clienteController.putCliente);
  // eliminar cliente
  router.delete('/deleteCliente/:id', clienteController.deleteCliente);


  //// PRODUCTOS //////
  router.post('/postProducto',
    // productosController.subirArchivo,
    productosController.postProducto
  );

  router.get('/getProductos', productosController.getProductos);
  router.get('/getProducto/:id', productosController.getProducto);

  router.put('/putProducto/:id',
    // productosController.subirArchivo,
    productosController.putProducto
  );
  router.delete('/deleteProducto/:id', productosController.deleteProducto);
  router.post('/productos/busqueda/:query', productosController.buscarProducto);

  //// PEDIDOS //////
  router.post('/postPedido', pedidosController.postPedido);
  router.get('/getPedidos', pedidosController.getPedidos);
  router.get('/getPedido/:id', pedidosController.getPedido);
  router.put('/putPedido/:id', pedidosController.putPedido);
  router.delete('/deletePedido/:id', pedidosController.deletePedido);

  return router;
}