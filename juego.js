let cuerpo;
let caja_boton;
let fichasAzules;
let fichasNaranjas;
let turnoActual = 0;
let datoTiempo; 
let click = 0;

window.addEventListener("load", inicio);

function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    let fichaPuesta = true;

    var data = ev.dataTransfer.getData("text");

     if((data.charAt(0) == 'a') && turnoActual%2==0){
         ev.target.appendChild(document.getElementById(data));
         fichaPuesta = false;
     }
     if((data.charAt(0) == 'n') && turnoActual%2==1){
         ev.target.appendChild(document.getElementById(data));
         fichaPuesta = true;
     }

    console.log(data.charAt(0))

}

function turnos() {
  if (turnoActual % 2 != 0) {
    document.getElementById("turno").textContent = "AZUL";
  } else {
    document.getElementById("turno").textContent = "NARANJA";
  }
  turnoActual++;
}



function inicio() {
  cuerpo = document.body;
  caja_boton = document.getElementsByClassName("cont-frenesi")[0];
  fichasAzules = document.getElementsByClassName("ficha-azul");
  fichasNaranjas = document.getElementsByClassName("ficha-naranja");
  datoTiempo = document.getElementById("tiempo"); // Inicializada como variable global

  const tiempoParseado = parseInt(datoTiempo.textContent);
  document.getElementById("btn-frenesi").addEventListener("click", activarModoFrenesi);

  function temporizador(tiempoParseado) {
      setInterval(() => {
        if (tiempoParseado < 0) {
          turnos();
          if(click== 0){
            tiempoParseado = 10;
          }else{
            tiempoParseado = 5;
          }
        
        }
        if (tiempoParseado <= 5) {
          datoTiempo.style.color = "red";
          datoTiempo.style.fontWeight = "bold";
        } else {
          datoTiempo.style.color = "black";
          datoTiempo.style.fontWeight = "normal";
        }
        datoTiempo.textContent = tiempoParseado;
        tiempoParseado--;
      }, 1000);
    
  }
temporizador(tiempoParseado);
 
  
}


function activarModoFrenesi() {
  cuerpo.classList.add("animacionBody");
  caja_boton.style.display = "none";
  click++;
}

