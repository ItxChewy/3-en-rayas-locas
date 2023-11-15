window.addEventListener('load', iniciar);


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
    function iniciar() {
    }