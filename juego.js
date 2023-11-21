let cuerpo;
let caja_boton;
let fichasAzules;
let fichasNaranjas;
let turnoActual = 0;
let datoTiempo; 
let click = 0;
let tiempoReseteado = false;
const casillaTablero = document.getElementsByClassName("casilla-tablero");

window.addEventListener("load", inicio);

function inicio() {
  cuerpo = document.body;
  caja_boton = document.getElementsByClassName("cont-frenesi")[0];
  fichasAzules = document.getElementsByClassName("ficha-azul");
  fichasNaranjas = document.getElementsByClassName("ficha-naranja");
  datoTiempo = document.getElementById("tiempo"); 
  const tiempoParseado = parseInt(datoTiempo.textContent);
  document.getElementById("btn-frenesi").addEventListener("click", activarModoFrenesi);
  function temporizador(tiempoParseado) {
      setInterval(() => {
        if (tiempoParseado < 0 || tiempoReseteado) {
          tiempoReseteado = false;
          console.log(tiempoReseteado)
          turnos();
          console.log("Cambia de turno en temporizador")
          if(click== 0 ){
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

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function comprobarFichas(data, ev){
  switch(data[data.length-1]){
    case 'x':
      if(!ev.target.hasChildNodes()){
        ev.target.appendChild(document.getElementById(data));
      } else {
        if(ev.target.firstChild.classList.contains('l') || ev.target.firstChild.classList.contains('s')){
          ev.target.removeChild(ev.target.firstChild);
          ev.target.appendChild(document.getElementById(data));
        } else {
          alert("No puedes poner aqui")
        }
      }
      console.log(data);
      break;
    case 'l':
      if(!ev.target.hasChildNodes()){
        ev.target.appendChild(document.getElementById(data));
      } else {
        if(ev.target.firstChild.classList.contains('s')){
          ev.target.removeChild(ev.target.firstChild);
          ev.target.appendChild(document.getElementById(data));
        } else {
          alert("No puedes poner aqui")
        }
      }
      break;
    case 's':
      if(!ev.target.hasChildNodes()){
        ev.target.appendChild(document.getElementById(data));
      }
      console.log(data);
      break;
  }
}

function drop(ev) {
    //Data es la ficha que cogemos (id) --> la bolita
    var data = ev.dataTransfer.getData("text");
    if(ev.target.classList.contains('casilla-tablero')){
      // if(!ev.target.hasChildNodes()){
        if((data.charAt(0) == 'a') && turnoActual%2==0){
         comprobarFichas(data, ev);
          // ev.target.appendChild(document.getElementById(data));
          tiempoReseteado = true;
          console.log("El primer hijo es: "+ev.target.firstChild.id)
          console.log("Cambia de turno en azul")
      }
      if((data.charAt(0) == 'n') && turnoActual%2==1){
        comprobarFichas(data, ev);
          tiempoReseteado = true;
          console.log("El primer hijo es: "+ev.target.firstChild.id)
          console.log("Cambia de turno en naranja")
      }
      // }
      comprobarDiagonal();
      comprobarVertical();
      comprobarHorizontal();
      comprobarTableroLleno();
    }
}

function turnos() {
  if (turnoActual % 2 != 0) {
    document.getElementById("turno").textContent = "AZUL";
  } else {
    document.getElementById("turno").textContent = "NARANJA";
  }
  turnoActual++;
}

function comprobarTableroLleno(){
  var contador = 0;
  for(let i =0;i<casillaTablero.length;i++){
      if(casillaTablero[i].hasChildNodes()){
        contador++;
      }
  }
  if(contador==9){
    alert("Tablero lleno");
  }else{
    contador=0;
  }
}

function comprobarHorizontal() {
  let victoria = false;
  if(casillaTablero[0].hasChildNodes() && casillaTablero[1].hasChildNodes() && casillaTablero[2].hasChildNodes()) {
    if ((casillaTablero[0].firstChild.classList.contains("ficha-azul") && casillaTablero[1].firstChild.classList.contains("ficha-azul") && casillaTablero[2].firstChild.classList.contains("ficha-azul")) || (casillaTablero[0].firstChild.classList.contains("ficha-naranja") && casillaTablero[1].firstChild.classList.contains("ficha-naranja") && casillaTablero[2].firstChild.classList.contains("ficha-naranja"))){
      victoria = true;
    }
  }
  if(casillaTablero[3].hasChildNodes() && casillaTablero[4].hasChildNodes() && casillaTablero[5].hasChildNodes()) {
    if ((casillaTablero[3].firstChild.classList.contains("ficha-azul") && casillaTablero[4].firstChild.classList.contains("ficha-azul") && casillaTablero[5].firstChild.classList.contains("ficha-azul")) || (casillaTablero[3].firstChild.classList.contains("ficha-naranja") && casillaTablero[4].firstChild.classList.contains("ficha-naranja") && casillaTablero[5].firstChild.classList.contains("ficha-naranja"))){
      victoria = true;
    }
  }
  if(casillaTablero[6].hasChildNodes() && casillaTablero[7].hasChildNodes() && casillaTablero[8].hasChildNodes()) {
    if ((casillaTablero[6].firstChild.classList.contains("ficha-azul") && casillaTablero[7].firstChild.classList.contains("ficha-azul") && casillaTablero[8].firstChild.classList.contains("ficha-azul")) || (casillaTablero[6].firstChild.classList.contains("ficha-naranja") && casillaTablero[7].firstChild.classList.contains("ficha-naranja") && casillaTablero[8].firstChild.classList.contains("ficha-naranja"))){
      victoria = true;
    }
  }
  if (victoria) {
    alert("Victoria");
  }
}

function comprobarVertical(){
  let victoria = false;
  if(casillaTablero[0].hasChildNodes() && casillaTablero[3].hasChildNodes() && casillaTablero[6].hasChildNodes()) {
    if ((casillaTablero[0].firstChild.classList.contains("ficha-azul") && casillaTablero[3].firstChild.classList.contains("ficha-azul") && casillaTablero[6].firstChild.classList.contains("ficha-azul")) || (casillaTablero[0].firstChild.classList.contains("ficha-naranja") && casillaTablero[3].firstChild.classList.contains("ficha-naranja") && casillaTablero[6].firstChild.classList.contains("ficha-naranja"))){
      victoria = true;
    }
  }
  if(casillaTablero[1].hasChildNodes() && casillaTablero[4].hasChildNodes() && casillaTablero[7].hasChildNodes()) {
    if ((casillaTablero[1].firstChild.classList.contains("ficha-azul") && casillaTablero[4].firstChild.classList.contains("ficha-azul") && casillaTablero[7].firstChild.classList.contains("ficha-azul")) || (casillaTablero[1].firstChild.classList.contains("ficha-naranja") && casillaTablero[4].firstChild.classList.contains("ficha-naranja") && casillaTablero[7].firstChild.classList.contains("ficha-naranja"))){
      victoria = true;
    }
  }
  if(casillaTablero[2].hasChildNodes() && casillaTablero[5].hasChildNodes() && casillaTablero[8].hasChildNodes()) {
    if ((casillaTablero[2].firstChild.classList.contains("ficha-azul") && casillaTablero[5].firstChild.classList.contains("ficha-azul") && casillaTablero[8].firstChild.classList.contains("ficha-azul")) || (casillaTablero[2].firstChild.classList.contains("ficha-naranja") && casillaTablero[5].firstChild.classList.contains("ficha-naranja") && casillaTablero[8].firstChild.classList.contains("ficha-naranja"))){
      victoria = true;
    }
  }
  if (victoria) {
    alert("Victoria");
  }
}

function comprobarDiagonal(){
  let victoria = false;
  if(casillaTablero[0].hasChildNodes() && casillaTablero[4].hasChildNodes() && casillaTablero[8].hasChildNodes()) {
    if ((casillaTablero[0].firstChild.classList.contains("ficha-azul") && casillaTablero[4].firstChild.classList.contains("ficha-azul") && casillaTablero[8].firstChild.classList.contains("ficha-azul")) || (casillaTablero[0].firstChild.classList.contains("ficha-naranja") && casillaTablero[4].firstChild.classList.contains("ficha-naranja") && casillaTablero[8].firstChild.classList.contains("ficha-naranja"))){
      victoria = true;
    }
  }
  if(casillaTablero[2].hasChildNodes() && casillaTablero[4].hasChildNodes() && casillaTablero[6].hasChildNodes()) {
    if ((casillaTablero[2].firstChild.classList.contains("ficha-azul") && casillaTablero[4].firstChild.classList.contains("ficha-azul") && casillaTablero[6].firstChild.classList.contains("ficha-azul")) || (casillaTablero[2].firstChild.classList.contains("ficha-naranja") && casillaTablero[4].firstChild.classList.contains("ficha-naranja") && casillaTablero[6].firstChild.classList.contains("ficha-naranja"))){
      victoria = true;
    }
  }
  if (victoria) {
    alert("Victoria");
  }
}


function activarModoFrenesi() {
  cuerpo.classList.add("animacionBody");
  caja_boton.style.display = "none";
  click++;
}
