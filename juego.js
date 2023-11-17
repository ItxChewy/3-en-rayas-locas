let cuerpo;
let caja_boton;
let turnoAzul = false;
let turnoNaranja = false;

window.addEventListener("load", inicio);

function allowDrop(ev) {
    ev.preventDefault();
    console.log("DragOver");
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
    const datoTiempo = document.getElementById("tiempo");
    const tiempoParseado = parseInt(datoTiempo.textContent);
    
    // Llamada inicial a turnos para establecer el primer turno y draggable
    turnos();

    document.getElementById("btn-frenesi").addEventListener("click", modoFrenesi);

    function quitarDrag(fichas, turno) {
        for (let i = 0; i < 9; i++) {
            fichas[i].setAttribute("draggable", turno ? "true" : "false");
        }
    }

    function turnos() {
        if (numeroAleatorio === 0) {
            turnoAzul = true;
        } else {
            turnoNaranja = true;
        }

        quitarDrag(fichasAzules, turnoAzul);
        quitarDrag(fichasNaranjas, turnoNaranja);
        document.getElementById("turno").textContent = numeroAleatorio;
    }

    function temporizador(tiempoParseado) {
        setInterval(() => {
            if (tiempoParseado < 0) {
                tiempoParseado = 15;
            }
            if (tiempoParseado <= 5) {
                datoTiempo.style.color = 'red';
                datoTiempo.style.fontWeight = 'bold';
            } else {
                datoTiempo.style.color = 'black';
                datoTiempo.style.fontWeight = 'normal';
            }
            datoTiempo.textContent = tiempoParseado;
            tiempoParseado--;
        }, 1000);
    }

    temporizador(tiempoParseado);
}

function modoFrenesi() {
    cuerpo.classList.add("animacionBody");  
    caja_boton[0].style.display = "none";
}

