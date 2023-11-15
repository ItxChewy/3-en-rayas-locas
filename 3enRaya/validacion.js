var formulario = document.getElementById("formValidado");
window.onload = iniciar;

function iniciar(){
    document.getElementById("jugar").addEventListener('click',validar,false);
}

function hayJugadores(){
    var jugador1 = document.getElementById("J1").value;
    var jugador2 = document.getElementById("J2").value;
    if(jugador1 === "" || jugador2 === ""){
        alert("Debe de haber 2 jugadores");
        return false;
    } else {
        
        return true;
    }
}


function validar(e){
    if(hayJugadores()){
        // alert("funka");
        return true;  
        
    }else{
        e.preventDefault();
        return false;
    }
}