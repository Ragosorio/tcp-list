import enviarCorreo from "./enviarCorreos.js";

// Exportar una función que reciba los parámetros necesarios para llamar a enviarCorreo
export default async function api(receptor, html) {
  try {
    // Llamar a enviarCorreo con los parámetros recibidos
    const data = await enviarCorreo(receptor, html);
    // Devolver el resultado
    return data;
  } catch (error) {
    // Devolver el error
    return error;
  }
}