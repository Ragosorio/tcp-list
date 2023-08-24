export default function generarQR(contenedorQR, valorQR) {
    const QR = new QRCode(contenedorQR);
	return QR.makeCode(`https://www.instagram.com/${valorQR}/`);
}