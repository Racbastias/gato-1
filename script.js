// Acá va nuestro código

var hay_ganador = false;  // indica si alguien ya gano o no

function traer_valores() {
  var valores = [];
  // recorrer las celdas trayendome el valor de cada una
  $('.celda').each(function() {

    var valor_celda = $(this).html();
    valores.push(valor_celda);

  });
  return valores;
}

function ganar_jugador(num1, num2, num3, jugador) {
  $('#jugador-ganador').html(jugador);
  $('#modal-ganador').modal();
  $('.celda:eq(' + num1 + ')').addClass('ganadora');
  $('.celda:eq(' + num2 + ')').addClass('ganadora');
  $('.celda:eq(' + num3 + ')').addClass('ganadora');
  hay_ganador = true;
  // actualizar puntajes
  if (jugador == 'X') {
    // sumo 1 al ptje parcial de X
    var puntaje = $('#parcial-X').html();
    puntaje = parseInt(puntaje);
    puntaje += 1;
    $('#parcial-X').html(puntaje);
    localStorage.setItem('parcial_x', puntaje);

  } else {
    // sumo 1 al ptje parcial de O
    var puntaje = $('#parcial-O').html();
    puntaje = parseInt(puntaje);
    puntaje += 1;
    $('#parcial-O').html(puntaje);
    localStorage.setItem('parcial_o', puntaje);
  }
}

function verificar_si_gana(jugador) {
  var valores = traer_valores();
  // primera fila
  if (valores[0] == jugador && valores[1] == jugador && valores[2] == jugador) {
    ganar_jugador('0', '1', '2', jugador);
  
  // segunda fila
  } else if (valores[3] == jugador && valores[4] == jugador && valores[5] == jugador) {
    ganar_jugador('3', '4', '5', jugador);
  
  // tercera fila
  } else if (valores[6] == jugador && valores[7] == jugador && valores[8] == jugador) {
    ganar_jugador('6', '7', '8', jugador);
  }
  
  // primera columna
  else if (valores[0] == jugador && valores[3] == jugador && valores[6] == jugador) {
    ganar_jugador('0', '3', '6', jugador);
  }
  // segunda columna
  else if (valores[1] == jugador && valores[4] == jugador && valores[7] == jugador) {
    ganar_jugador('1', '4', '7', jugador);
  }
  // tercera columna
  else if (valores[2] == jugador && valores[5] == jugador && valores[8] == jugador) {
    ganar_jugador('2', '5', '8', jugador);
  }

  // diagonal ascendente
  else if (valores[2] == jugador && valores[4] == jugador && valores[6] == jugador) {
    ganar_jugador('2', '4', '6', jugador);
  }

  // diagonal descendente
  else if (valores[0] == jugador && valores[4] == jugador && valores[8] == jugador) {
    ganar_jugador('0', '4', '8', jugador);
  }
}

$('.celda').on('click', function() {
  // chequeo que todavia nadie ha ganado
  if (hay_ganador) {
    return;
  }

  // verificar que celda no este ocupada
  var contenido_celda = $(this).html();
  if (contenido_celda != '') {
    return;
  }

  // ver a que jugador le toca
  var siguiente = $('.siguiente').html();
  // jugar
  $(this).html(siguiente);

  // cambiar el valor del jugador siguiente
  if (siguiente == 'O'){
    $('.siguiente').html('X');
  } else {
    $('.siguiente').html('O');
  }

  
  // verificar si gano el jugador O
  verificar_si_gana('O');
  // verificar si gano el jugador X
  verificar_si_gana('X');

});

$('#reiniciar').on('click', function() {
  // acá vamos a reiniciar el juego
  // 1. limpiar el contenido interno de las celdas
  $('.celda').html('');
  // 2. sacar clase "ganadora" de las celdas
  $('.celda').removeClass('ganadora');
  
  hay_ganador = false;
});

// el código de inicio de la página lo vamos a meter en una funcion anónima autoejecutable
(function() {
  // cuando inicie la página, cargo los puntajes que ya tenía de antes
  var parcial_x = localStorage.getItem('parcial_x') || '0';
  var parcial_o = localStorage.getItem('parcial_o') || '0'; 
  // los meto en el HTML
  $('#parcial-X').html(parcial_x);
  $('#parcial-O').html(parcial_o);
})();