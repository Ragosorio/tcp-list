import generarQR from "./qrGenerator.js";
import generarJPG from "./descargasJPG.js";

const $ = (r) => document.querySelector(r);
const url =
  "https://sheet.best/api/sheets/e051170a-a965-4126-9900-7d092bcc3638";
const $formulario = $("#formulario");
const $inputInstagram = $("#instagram");
const $contenedorPrincipal = $("#contenedor-principal");
const $contenedorSecundario = $("#contenedor-secundario");
const $btnSubmit = $("#btn-submit")

$formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  $btnSubmit.disabled = true
  const $valorFormulario = $formulario.instagram.value.toLowerCase();
  // //Leer Filas

  try {
    const respuesta = await fetch(url);
    const contenido = await respuesta.json();
    let userDisponible = true

    for (let i = 0; i < contenido.length; i++) {
      let instagramValor = contenido[i].Instagram;
      if ($valorFormulario === instagramValor) {
        userDisponible = false
        break;
      }
    }

      // Guardar en Fila
    if (userDisponible) {
      
        const respuesta = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Nombre: capitalizeSentence($formulario.nombre.value),
            Instagram: $valorFormulario,
          }),
        });

        const contenido = await respuesta.json();

        $contenedorPrincipal.classList.remove("activo");
        $contenedorSecundario.classList.add("activo");

        const $pTicket = $("#nombre-ticket")
        const $contenedorQR = $("#contenedorQR")

        $pTicket.innerHTML = `@${$valorFormulario}`
        generarQR($contenedorQR, $valorFormulario)

        const $btnDescargarPNG = $("#descargar-ticket")
        $btnDescargarPNG.addEventListener("click", () => {
        const $ticket = $("#exito")
        if (window.innerWidth > 710) {
          generarJPG($ticket, 700, 300)
        } else {
          generarJPG($ticket, 300, 700)
        }
        })

    } else {
      $inputInstagram.classList.add("input-error");
      $inputInstagram.value = "Ig ya registrado";
  
      setTimeout(() => {
        $inputInstagram.classList.remove("input-error");
        $inputInstagram.value = "";
        $btnSubmit.disabled = false
      }, 3000);
    }
    
  } catch (err) {
    console.log(err);
  }
});

function capitalizeSentence(sentence) {
  const words = sentence.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  const capitalizedSentence = capitalizedWords.join(" ");

  return capitalizedSentence;
}