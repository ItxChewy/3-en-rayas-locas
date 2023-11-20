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


let tiempoReseteado = false;

function comprobarFichas(data, ev){
  switch(data[data.length-1]){
    case 'x':
      if(!ev.target.hasChildNodes()){
        ev.target.appendChild(document.getElementById(data));
        //se mete ficha
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
        //se mete ficha
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
        //se mete ficha
      }

      console.log(data);
      break;
  }
}

function drop(ev) {
    //Data es la ficha que cogemos (id) --> la bolita
    var data = ev.dataTransfer.getData("text");
    // console.log(ev.target)
    console.log(data[data.length-1])
  
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
    }
     
     console.log(tiempoReseteado)

    

    // console.log(data.charAt(0))

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


function activarModoFrenesi() {
  cuerpo.classList.add("animacionBody");
  caja_boton.style.display = "none";
  click++;
}
