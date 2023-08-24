import html2canvas from "html2canvas";

export default function generarJPG(domElement) {
    html2canvas(domElement).then(function (dmcanvas) {
        // Crear un nuevo canvas con el tamaño deseado
        let newCanvas = document.createElement("canvas");
        newCanvas.width = 700;
        newCanvas.height = 300;

        // Obtener el contexto del nuevo canvas
        let newContext = newCanvas.getContext("2d");

        // Dibujar la imagen original en el nuevo canvas con el tamaño deseado
        newContext.drawImage(dmcanvas, 0, 0, dmcanvas.width, dmcanvas.height, 0, 0, newCanvas.width, newCanvas.height);

        // Obtener la imagen resultante como un data URL
        let link = document.createElement("a")
        link.href = newCanvas.toDataURL("image/jpg", 1)
        link.download = "ticket.jpg"
        link.click()
    })
}
