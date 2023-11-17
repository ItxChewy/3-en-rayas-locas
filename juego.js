let cuerpo;  // Declarar la variable en un ámbito más amplio
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
    caja_boton = document.getElementsByClassName("cont-frenesi");  // Asignar el valor en la función inicio
    document.getElementById("btn-frenesi").addEventListener("click", modoFrenesi);
    const datoTiempo = document.getElementById("tiempo");
        const tiempoParseado = parseInt(datoTiempo.textContent);
        console.log('El numero de tiempo es: '+tiempoParseado)

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


