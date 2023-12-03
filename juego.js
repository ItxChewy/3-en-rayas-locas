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
let caja_turno;
let contenedorNaranja;
let sorteo;

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
  caja_turno = document.getElementsByClassName("cont-turno");
  contenedorNaranja = document.getElementsByClassName("cont-fichas-naranjas");

  btn_revancha = document.getElementById("revancha");
  btn_inicio = document.getElementById("inicio");

  if (turnoActual === 0) {
    turnoInicial();
    if (sorteo === 0) {
      document.getElementById("turno").textContent = "AZUL";
      caja_turno[0].style.backgroundColor = "#09f";
    } else {
      document.getElementById("turno").textContent = "NARANJA";
      caja_turno[0].style.backgroundColor = "orange";
      turnoActual++;
    }
  }

  const tiempoParseado = parseInt(datoTiempo.textContent);
  document.getElementById("btn-frenesi").addEventListener("click", activarModoFrenesi);
  document.getElementById("inicio").addEventListener("click", volverInicio);
  document.getElementById("revancha").addEventListener("click", jugarRevancha);
  function temporizador(tiempoParseado) {
  
      setInterval(() => {
        if(!partidaAcabada){
          if (tiempoParseado < 0 || tiempoReseteado) {
            tiempoReseteado = false;
            // console.log(tiempoParseado)
            turnos();
            // console.log("Cambia de turno en temporizador")
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
  let parent = ev.target.parentNode;
  switch (data[data.length - 1]) {
    case 'x':
      console.log("ev.target es: ")

      console.log(ev.target.classList)

      if (ev.target.classList.contains('casilla-tablero')) {
        console.log(parent)
        console.log("Tiene hijos? ")
        var ficha = document.getElementById(data);
        if(ev.target.hasChildNodes()){
          if(ev.target.firstChild.classList.contains('xl')){
            // alert("errorrr")
          comprobarFichas(data, ev) //con esto soluciono poner ficha sobre la otra y que no salte turno
          } else if(ev.target.firstChild.classList.contains('l') || ev.target.firstChild.classList.contains('s')) {
            ev.target.removeChild(ev.target.firstChild);
            ev.target.appendChild(ficha);
            console.log("TIene hijos")
          } 
        } else {
          ev.target.appendChild(ficha);
        }
        ficha.draggable = false; // Desactiva la capacidad de arrastre
      } else {
        if (ev.target.classList.contains('ficha-azul') || ev.target.classList.contains('ficha-naranja')) {
          if (ev.target.classList.contains('l')) {
            let parent = ev.target.parentNode; //MIRAR AQUI EL ERROR, LO SOLUCIONAMOS DESPUES DEL RECREO PERO ESTÃ AQUÃ 
            console.log("El padre es: " + parent)
            parent.removeChild(parent.firstChild);
            parent.appendChild(document.getElementById(data));
            document.getElementById(data).draggable = false; // Desactiva la capacidad de arrastre
          } else if (ev.target.classList.contains('s')) {
           let parent = ev.target.parentNode; //MIRAR AQUI EL ERROR, LO SOLUCIONAMOS DESPUES DEL RECREO PERO ESTÃ AQUÃ 

          parent.removeChild(parent.firstChild);
          // parent.appendChild(document.getElementById(data));
          parent.appendChild(document.getElementById(data));
          document.getElementById(data).draggable = false; // Desactiva la capacidad de arrastre
        } else {
          comprobarFichas(data, ev)
          alert("No puedes poner aquÃ­");
        }
      }
    }
      // console.log(data);
      break;
    case 'l':
      console.log("ev.target es: ")

      console.log(ev.target.classList)

      if (ev.target.classList.contains('casilla-tablero')) {
        console.log(parent)
        console.log("Tiene hijos? ")
       
        var ficha = document.getElementById(data);
        if(ev.target.hasChildNodes()){
          if(ev.target.firstChild.classList.contains('l')){
            // alert("errorrr")
            comprobarFichas(data, ev)
          } else if(ev.target.firstChild.classList.contains('s')) {
            ev.target.removeChild(ev.target.firstChild);
            ev.target.appendChild(ficha);
            console.log("TIene hijos")
          } 
        } else {
          ev.target.appendChild(ficha);
        }
        ficha.draggable = false; // Desactiva la capacidad de arrastre
      } else {
        if (ev.target.classList.contains('ficha-azul') || ev.target.classList.contains('ficha-naranja')) {
         if (ev.target.classList.contains('s')) {
          let parent = ev.target.parentNode; //MIRAR AQUI EL ERROR, LO SOLUCIONAMOS DESPUES DEL RECREO PERO ESTÃ AQUÃ 
          parent.removeChild(parent.firstChild);
          // parent.appendChild(document.getElementById(data));
          parent.appendChild(document.getElementById(data));
          document.getElementById(data).draggable = false; // Desactiva la capacidad de arrastre
        } else {
          alert("No puedes poner aquÃ­");
        }
      }
    }
      // console.log(data);
      break;
    case 's':
      if (ev.target.classList.contains('casilla-tablero')) {
        console.log(parent)
        console.log("Tiene hijos? ")
       
        var ficha = document.getElementById(data);
        if(!ev.target.hasChildNodes()){
          ev.target.appendChild(ficha);
        } else {
          comprobarFichas(data, ev) //con esto soluciono poner ficha sobre la otra y que no salte turno
        }
        ficha.draggable = false; // Desactiva la capacidad de arrastre
      } else {
        if (ev.target.classList.contains('ficha-azul') || ev.target.classList.contains('ficha-naranja')) {
         if (ev.target.classList.contains('s') || ev.target.classList.contains('l') || ev.target.classList.contains('xl')) {
          comprobarFichas(data, ev) //con esto soluciono poner ficha sobre la otra y que no salte turno
        } 
      }
      document.getElementById(data).draggable = false; // Desactiva la capacidad de arrastre

    }
      // if (!ev.target.hasChildNodes()) {
      //   var ficha = document.getElementById(data);
      //   ev.target.appendChild(ficha);
      //   ficha.draggable = false; // Desactiva la capacidad de arrastre
      // } else {
      //   comprobarFichas(data, ev)
      // }
      // console.log(data);
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
        if((data.charAt(0) == 'a') && turnoActual%2==0){
         comprobarFichas(data, ev);
          tiempoReseteado = true;

      }
      if((data.charAt(0) == 'n') && turnoActual%2==1){
        comprobarFichas(data, ev);
          tiempoReseteado = true;
      }
      comprobarTurno();
      quitarDragTablero();
      comprobaciones();
    }
}

function turnoInicial() {
  sorteo = Math.random();
  sorteo = Math.round(sorteo);
}

function turnos() {
  if (turnoActual % 2 != 0) {
    document.getElementById("turno").textContent = "AZUL";
    caja_turno[0].style.backgroundColor = "#09f";
  } else {
    document.getElementById("turno").textContent = "NARANJA";
    caja_turno[0].style.backgroundColor = "orange";
  }
  turnoActual++;
}

function comprobarTurno(){
  if(sorteo==0){
    if(turnoActual >=5){
      document.getElementById("cont-frenesi").classList.remove("inactiva");
    }
  }else{
    if(turnoActual >=6){
      document.getElementById("cont-frenesi").classList.remove("inactiva");
    }
  }
}

function comprobaciones(){
  comprobarDiagonal();
  comprobarVertical();
  comprobarHorizontal();
  comprobarTableroLleno();
  
  
}

function comprobarTableroLleno(){
  var contador = 0;
  var xl = 0;
  var s = 0;

  for(let i =0;i<casillaTablero.length;i++){
      if(casillaTablero[i].hasChildNodes()){
        contador++;
      }
      if(casillaTablero[i].firstChild.classList[1]=="xl"){
        xl++;
      }
      if(casillaTablero[i].firstChild.classList[1]=="s"){
        s++;
      }
  }
  if(contador==9 && xl == 6 && s == 0){
    // alert("Tablero lleno");
    document.getElementById("alerta").classList.remove("inactiva");
    document.getElementById("alerta").textContent = "TABLERO LLENO, EMPATE"
  }else{
    contador=0;
  }
  quitarDrag();

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
    quitarDrag();

    victoriaAlert.play();
    document.getElementById("alerta").classList.remove("inactiva");
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
    quitarDrag();

    victoriaAlert.play();
   //alert("Victoria");
    document.getElementById("alerta").classList.remove("inactiva");
    //document.getElementById("cont-juego").classList.add("inactiva");
  }
}
let ganador = "";
var arrayGanadores = [];

function quitarDragTablero(){
  for(let i = 0; i < casillaTablero.length; i++){
    if(casillaTablero[i].hasChildNodes()){
      casillaTablero[i].firstChild.style.pointerEvents = "none";
    }
  }
}

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
    quitarDrag();
    victoriaAlert.play();
    //alert("Victoria");
    document.getElementById("alerta").classList.remove("inactiva");
    //document.getElementById("cont-juego").classList.add("inactiva");
  }
}
  function quitarDrag(){
    if (partidaAcabada) {
      for (let i = 0; i < fichasAzules.length; i++) {
        fichasAzules[i].style.pointerEvents = "none";
       
      }
  
      for (let i = 0; i < fichasNaranjas.length; i++) {
        fichasNaranjas[i].style.pointerEvents = "none";
        

      }
    }
    console.log(fichasAzules)
  }

  function sacarGanador(ganador){
    var strGanador = "";
    if(ganador == "azul"){
      var nombreGanador = document.createElement('p');
      nombreGanador.setAttribute("class","ganador");
      strGanador = localStorage.getItem('J1');
      nombreGanador.textContent = strGanador;
      arrayGanadores.push(nombreGanador)
      // ranking.appendChild(nombreGanador)
      //alert(`El ganador es ${localStorage.getItem('J1')}`)
    } else {
      var nombreGanador = document.createElement('p');
      nombreGanador.setAttribute("class","ganador");
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



