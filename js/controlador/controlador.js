/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(id){
    this.modelo.borrarPreguntaSel(id)
  },

  editarPregunta: function(id, nuevaPreg){
    this.modelo.editarPreguntaSel(id, nuevaPreg)
  },

  borrarTodo: function(){
    this.modelo.borrarTodasPreg();
  },

  agregarVotos: function(nombrePregunta, respuestaSeleccionada){
    this.modelo.agregarVotos(nombrePregunta, respuestaSeleccionada);
  }
};

