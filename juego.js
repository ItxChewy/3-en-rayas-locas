let cuerpo;
let caja_boton;
let fichasAzules;
let fichasNaranjas;
let turnoActual = 0;
let datoTiempo; 
let click = 0;
let tiempoReseteado = false;
let risaFrenesi;
let alarmaReloj;
let victoriaAlert;
const casillaTablero = document.getElementsByClassName("casilla-tablero");
let partidaAcabada = false;
let ranking;

window.addEventListener("load", inicio);

function inicio() {
  cuerpo = document.body;
  caja_boton = document.getElementsByClassName("cont-frenesi")[0];
  fichasAzules = document.getElementsByClassName("ficha-azul");
  fichasNaranjas = document.getElementsByClassName("ficha-naranja");
  datoTiempo = document.getElementById("tiempo"); 
  risaFrenesi = document.getElementById('risaFrenesi');
  alarmaReloj = document.getElementById("alarmaReloj");
  victoriaAlert = document.getElementById("victoria");
  ranking = document.getElementById("ranking");


  btn_revancha = document.getElementById("revancha");
  btn_inicio = document.getElementById("inicio");

  const tiempoParseado = parseInt(datoTiempo.textContent);
  document.getElementById("btn-frenesi").addEventListener("click", activarModoFrenesi);
  document.getElementById("inicio").addEventListener("click", volverInicio);
  document.getElementById("revancha").addEventListener("click", jugarRevancha);
  function temporizador(tiempoParseado) {
  
      setInterval(() => {
        if(!partidaAcabada){
          if (tiempoParseado < 0 || tiempoReseteado) {
            tiempoReseteado = false;
            console.log(tiempoParseado)
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
              if(tiempoParseado <= 3){ 
                alarmaReloj.play();
              }
            
          } else {
            datoTiempo.style.color = "black";
            datoTiempo.style.fontWeight = "normal";
            alarmaReloj.pause();
          }
          datoTiempo.textContent = tiempoParseado;
          tiempoParseado--;
        }
       
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

function comprobarFichas(data, ev) {
  switch (data[data.length - 1]) {
    case 'x':
      if (!ev.target.hasChildNodes()) {
        var ficha = document.getElementById(data);
        ev.target.appendChild(ficha);
        ficha.draggable = false; // Desactiva la capacidad de arrastre
      } else {
        if (ev.target.classList.contains('ficha-azul') || ev.target.classList.contains('ficha-naranja')) {
          if (ev.target.classList.contains('l')) {
            let parent = ev.target.parentNode;
            parent.removeChild(parent.firstChild);
            parent.appendChild(document.getElementById(data));
            document.getElementById(data).draggable = false; // Desactiva la capacidad de arrastre
          }
        } else if (ev.target.firstChild.classList.contains('s')) {
          ev.target.removeChild(ev.target.firstChild);
          ev.target.appendChild(document.getElementById(data));
          document.getElementById(data).draggable = false; // Desactiva la capacidad de arrastre
        } else {
          alert("No puedes poner aquí");
        }
      }
      console.log(data);
      break;
    case 'l':
      if (!ev.target.hasChildNodes()) {
        var ficha = document.getElementById(data);
        ev.target.appendChild(ficha);
        ficha.draggable = false; // Desactiva la capacidad de arrastre
      } else {
        if (ev.target.classList.contains('ficha-azul') || ev.target.classList.contains('ficha-naranja')) {
          if (ev.target.classList.contains('s') || ev.target.classList.contains('l')) {
            let parent = ev.target.parentNode;
            parent.removeChild(parent.firstChild);
            parent.appendChild(document.getElementById(data));
            document.getElementById(data).draggable = false; // Desactiva la capacidad de arrastre
          } else if (ev.target.firstChild.classList.contains('l') || ev.target.firstChild.classList.contains('s')) {
            ev.target.removeChild(ev.target.firstChild);
            ev.target.appendChild(document.getElementById(data));
            document.getElementById(data).draggable = false; // Desactiva la capacidad de arrastre
          } else {
            alert("No puedes poner aquí");
          }
        }
      }
      console.log(data);
      break;
    case 's':
      if (!ev.target.hasChildNodes()) {
        var ficha = document.getElementById(data);
        ev.target.appendChild(ficha);
        ficha.draggable = false; // Desactiva la capacidad de arrastre
      }
      console.log(data);
      break;
    default:
      console.error("Tipo de ficha no reconocido");
      break;
  }
}

function drop(ev) {
    //Data es la ficha que cogemos (id) --> la bolita
    console.log(ev.target.classList)
    var data = ev.dataTransfer.getData("text");
    if(ev.target.classList.contains('casilla-tablero')|| ev.target.classList.contains('ficha-naranja') || ev.target.classList.contains('ficha-azul')){
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
     comprobaciones();
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

function comprobaciones(){
  comprobarDiagonal();
  comprobarVertical();
  comprobarHorizontal();
  comprobarTableroLleno();
  
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
    document.getElementById("alerta").classList.remove("inactiva");
  }else{
    contador=0;
  }
}


function comprobarHorizontal() {
  let victoria = false;
    
  for(let i = 0; i < casillaTablero.length; i = i + 3){
    if(casillaTablero[i].hasChildNodes() && casillaTablero[i+1].hasChildNodes() && casillaTablero[i+2].hasChildNodes()) {
      if ((casillaTablero[i].firstChild.classList.contains("ficha-azul") && casillaTablero[i+1].firstChild.classList.contains("ficha-azul") && casillaTablero[i+2].firstChild.classList.contains("ficha-azul")) 
      || (casillaTablero[i].firstChild.classList.contains("ficha-naranja") && casillaTablero[i+1].firstChild.classList.contains("ficha-naranja") && casillaTablero[i+2].firstChild.classList.contains("ficha-naranja"))){
        victoria = true;
        if(casillaTablero[i].firstChild.classList.contains("ficha-azul")){
          ganador = "azul";
        } else {
          ganador = "naranja"
        }
      }
    }
  }
  if (victoria) {
    partidaAcabada = true;
    sacarGanador(ganador);

    victoriaAlert.play();
   // alert("Victoria");
    document.getElementById("alerta").classList.remove("inactiva");
    //document.getElementById("cont-juego").classList.add("inactiva");
  }
}

function comprobarVertical(){
  let victoria = false;
  for(let i = 0; i < 3; i ++){
    if(casillaTablero[i].hasChildNodes() && casillaTablero[i+3].hasChildNodes() && casillaTablero[i+6].hasChildNodes()) {
      if ((casillaTablero[i].firstChild.classList.contains("ficha-azul") && casillaTablero[i+3].firstChild.classList.contains("ficha-azul") && casillaTablero[i+6].firstChild.classList.contains("ficha-azul")) 
      || (casillaTablero[i].firstChild.classList.contains("ficha-naranja") && casillaTablero[i+3].firstChild.classList.contains("ficha-naranja") && casillaTablero[i+6].firstChild.classList.contains("ficha-naranja"))){
        victoria = true;
        if(casillaTablero[i].firstChild.classList.contains("ficha-azul")){
          ganador = "azul";
        } else {
          ganador = "naranja"
        }

      }
    }
  }
  if (victoria) {
    partidaAcabada = true;
    sacarGanador(ganador);

    victoriaAlert.play();
   //alert("Victoria");
    document.getElementById("alerta").classList.remove("inactiva");
    //document.getElementById("cont-juego").classList.add("inactiva");
  }
}
let ganador = "";
var arrayGanadores = [];
function comprobarDiagonal(){
  let victoria = false;
  
  if(casillaTablero[0].hasChildNodes() && casillaTablero[4].hasChildNodes() && casillaTablero[8].hasChildNodes()) {
    if ((casillaTablero[0].firstChild.classList.contains("ficha-azul") && casillaTablero[4].firstChild.classList.contains("ficha-azul") && casillaTablero[8].firstChild.classList.contains("ficha-azul")) || (casillaTablero[0].firstChild.classList.contains("ficha-naranja") && casillaTablero[4].firstChild.classList.contains("ficha-naranja") && casillaTablero[8].firstChild.classList.contains("ficha-naranja"))){
      victoria = true;
      if(casillaTablero[0].firstChild.classList.contains("ficha-azul")){
        ganador = "azul";
      } else {
        ganador = "naranja"
      }
    }
  }
  if(casillaTablero[2].hasChildNodes() && casillaTablero[4].hasChildNodes() && casillaTablero[6].hasChildNodes()) {
    if ((casillaTablero[2].firstChild.classList.contains("ficha-azul") && casillaTablero[4].firstChild.classList.contains("ficha-azul") && casillaTablero[6].firstChild.classList.contains("ficha-azul")) || (casillaTablero[2].firstChild.classList.contains("ficha-naranja") && casillaTablero[4].firstChild.classList.contains("ficha-naranja") && casillaTablero[6].firstChild.classList.contains("ficha-naranja"))){
      victoria = true;
      if(casillaTablero[2].firstChild.classList.contains("ficha-azul")){
        ganador = "azul";
      } else {
        ganador = "naranja"
      }
    }
  }
  if (victoria) {
    partidaAcabada = true;
    sacarGanador(ganador);
    victoriaAlert.play();
    //alert("Victoria");
    document.getElementById("alerta").classList.remove("inactiva");
    //document.getElementById("cont-juego").classList.add("inactiva");
  }
}

  function sacarGanador(ganador){
    var strGanador = "";
    if(ganador == "azul"){
      var nombreGanador = document.createElement('p');
      strGanador = localStorage.getItem('J1');
      nombreGanador.textContent = strGanador;
      arrayGanadores.push(nombreGanador)
      // ranking.appendChild(nombreGanador)
      //alert(`El ganador es ${localStorage.getItem('J1')}`)
    } else {
      var nombreGanador = document.createElement('p');
      strGanador = localStorage.getItem('J2');
      nombreGanador.textContent = strGanador;
      arrayGanadores.push(nombreGanador)
      // ranking.appendChild(nombreGanador);
      //alert(`El ganador es ${localStorage.getItem('J2')}`)
    }

    arrayGanadores.forEach(element => {
      ranking.appendChild(element);
    });

    console.log(arrayGanadores)
  }

  function volverInicio(){
    window.location.href='index1-1.html';
  }

  function jugarRevancha(){
    location.reload();
  }

  function activarModoFrenesi() {
    cuerpo.classList.add("animacionBody");
    risaFrenesi.play();
    caja_boton.style.display = "none";
    click++;
  }


