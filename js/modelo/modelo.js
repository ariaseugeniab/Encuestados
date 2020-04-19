/*
 * Modelo
 */
var Modelo = function() {
  // let storage = localStorage.getItem("preguntas");
  // this.preguntas = storage? JSON.parse(storage) : [];
  this.preguntas = JSON.parse(localStorage.getItem('preguntas')) || [];
  this.ultimoId = 0;
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.preguntaVotada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta--COMPLETAR
  obtenerUltimoId: function() {
    let ultId = -1; 
    this.preguntas.forEach(element =>{
      while(element.id > ultId){
        ultId++;
      }
    });
    return ultId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

  borrarPreguntaSel: function(idPregunta){

    let index = this.preguntas.findIndex(x => x.id == idPregunta);
    this.preguntas.splice(index, 1);
    
    //notificar
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  // más funciones del modelo

  editarPreguntaSel: function(idPregunta, nuevaPregunta){
    
    let index = this.preguntas.findIndex(x => x.id == idPregunta);
    this.preguntas[index].textoPregunta = nuevaPregunta;

    //notificar
    this.guardar();
    this.preguntaEditada.notificar();
  },

  borrarTodasPreg: function(){
    this.preguntas = [];

    //notificar
    this.guardar();
    this.preguntasBorradas.notificar();
  },
  
  agregarVotos: function(nombrePregunta, respuestaSeleccionada){
    this.preguntas.forEach((pregunta) => {
      if(pregunta.textoPregunta  === nombrePregunta){
        pregunta.cantidadPorRespuesta.forEach((respuesta) =>{
          if(respuesta.textoRespuesta === respuestaSeleccionada){
            respuesta.cantidad ++;
          }
        })
      }
    }); 
    //
    this.guardar();
    this.preguntaVotada.notificar();
  },

  obtenerPreguntas: function(){
    localStorage.getItem("preguntas", JSON.parse())
  }
};
