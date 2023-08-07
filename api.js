const $ = r => document.querySelector(r)
const url = "https://sheet.best/api/sheets/e051170a-a965-4126-9900-7d092bcc3638"
const $formulario = $("#formulario")
const $registro = $("#registro")
const $exito = $("#exito")

$formulario.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Guardar en Fila  
    const respuesta = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "Nombre": capitalizeSentence($formulario.nombre.value),
        "Instagram": $formulario.instagram.value.toLowerCase()
      })
    })
  
    const contenido = await respuesta.json();

  // //Leer Filas

  // try{
  //   const respuesta = await fetch(url)
  //   const contenido = await respuesta.json();

  //   console.log(contenido);

  // } catch(err) {
  //   console.log(err);
  // }


  $registro.classList.remove("activo")
  $exito.classList.add("activo")
})

function capitalizeSentence(sentence) {
  const words = sentence.split(" ");
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  const capitalizedSentence = capitalizedWords.join(" ");

  return capitalizedSentence;
}