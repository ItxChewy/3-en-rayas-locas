
window.onload = iniciar;

function iniciar(){
    document.getElementById("jugar").addEventListener('click',validar,false);
    document.getElementById("entendido").addEventListener('click',aceptarEntendido);
}

function hayJugadores(){
    var jugador1 = document.getElementById("J1").value;
    var jugador2 = document.getElementById("J2").value;
    if(jugador1 === "" || jugador2 === ""){
        document.getElementById("alerta").classList.remove("inactiva");
        document.getElementById("cont-formulario").classList.add("inactiva");
        return false;
    } else {
        localStorage.setItem('J1',document.getElementById("J1").value);
        localStorage.setItem('J2',document.getElementById("J2").value);
        return true;
    }
}

function aceptarEntendido(){
    document.getElementById("alerta").classList.add("inactiva");
        document.getElementById("cont-formulario").classList.remove("inactiva");
}

function validar(e){
    if(hayJugadores()){
        document.getElementById("cont-juego").style.display = "flex";
        document.getElementById("cont-formulario").style.display = "none";
        return true;  
        
    }else{
        e.preventDefault();
        return false;
    }
}