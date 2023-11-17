let cuerpo; 
let caja_boton;
window.addEventListener("load", inicio);
function allowDrop(ev) {
    ev.preventDefault();
    console.log("DragOver")
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function inicio() {
    cuerpo = document.body;
    caja_boton = document.getElementsByClassName("cont-frenesi");  
    var fichasAzules = document.getElementsByClassName("ficha-azul");
    var fichasNaranjas = document.getElementsByClassName("ficha-naranja");
    var numeroAleatorio = Math.round(Math.random());
    var turnoAzul = false;
    var turnoNaranja = false;
    const datoTiempo = document.getElementById("tiempo");
    const tiempoParseado = parseInt(datoTiempo.textContent);
    document.getElementById("btn-frenesi").addEventListener("click", modoFrenesi);
   /* function turnoAleatorio(){
        
        console.log(numeroAleatorio);
        if (numeroAleatorio == 0){
            turnoAzul = true;
        }else{
            turnoNaranja = true;
        }
    }*/
    console.log(numeroAleatorio);
    function quitarDrag(fichasAzules, fichasNaranjas){
        if(!turnoAzul){
            for(let i =0;i<9;i++){
                fichasAzules[i].setAttribute("draggable","false");
            }
        }else{
            for(let i =0;i<9;i++){
                fichasAzules[i].setAttribute("draggable","true");
            }
        }

        if(!turnoNaranja){
            for(let i =0;i<9;i++){
                fichasNaranjas[i].setAttribute("draggable","false");
            }
        }else{
            for(let i =0;i<9;i++){
                fichasNaranjas[i].setAttribute("draggable","true");
            }
        }
    
    }
   quitarDrag(fichasAzules,fichasNaranjas);
 
   function turnos(){
    var turno = numeroAleatorio;
    if (numeroAleatorio == 0){
        turnoAzul = true;
        turno++;
    }else{
        turnoNaranja = true;
        turno++;
    }

    if(turno%2 == 0){
        turnoAzul = true;
        turnoNaranja = false;
        quitarDrag(fichasAzules,fichasNaranjas);
        document.getElementById("turno").textContent = turno;
        turno++;
    }else{
        turnoAzul = false;
        turnoNaranja = true;
        quitarDrag(fichasAzules,fichasNaranjas); 
        turno++;
    }

   }
    function temporizador(tiempoParseado){
        setInterval(()=> {
                if(tiempoParseado < 0){
                    tiempoParseado = 15;
                }
                if(tiempoParseado <= 5){
                    datoTiempo.style.color = 'red';
                    datoTiempo.style.fontWeight = 'bold';
                } else {
                    datoTiempo.style.color = 'black';
                    datoTiempo.style.fontWeight = 'normal';
                }
                datoTiempo.textContent = tiempoParseado
                tiempoParseado--;
            },1000);
    }

        temporizador(tiempoParseado);
}

function modoFrenesi() {
    cuerpo.classList.add("animacionBody");  
    caja_boton[0].style.display="none";
}


