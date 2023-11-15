let cuerpo;  // Declarar la variable en un ámbito más amplio
let caja_boton;
window.addEventListener("load", inicio);

function inicio() {
    cuerpo = document.body;
    caja_boton = document.getElementsByClassName("cont-frenesi");  // Asignar el valor en la función inicio
    document.getElementById("btn-frenesi").addEventListener("click", modoFrenesi);
}

function modoFrenesi() {
    cuerpo.classList.add("animacionBody");  
    caja_boton[0].style.display="none";
}
