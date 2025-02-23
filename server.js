const http = require("http");
const { parse } = require("url");

const HOST = "127.0.0.1";
const PORT = 3000;

const calcularCollatz = (num) => {
    const resultado = [];
    while (num !== 1) {
        resultado.push(num);
        num = num % 2 === 0 ? num / 2 : 3 * num + 1;
    }
    resultado.push(1);
    return resultado;
};

const servidor = http.createServer((solicitud, respuesta) => {
    const { pathname, query } = parse(solicitud.url, true);

    if (pathname === "/collatz" && solicitud.method === "GET") {
        const numero = parseInt(query.numero, 10);

        if (!Number.isInteger(numero) || numero <= 0) {
            respuesta.writeHead(400, { "Content-Type": "application/json" });
            respuesta.end(JSON.stringify({ error: "Ingrese un número entero positivo." }));
            return;
        }

        const secuencia = calcularCollatz(numero);
        respuesta.writeHead(200, { "Content-Type": "application/json" });
        respuesta.end(JSON.stringify({ secuencia }));
    } else {
        respuesta.writeHead(404, { "Content-Type": "application/json" });
        respuesta.end(JSON.stringify({ error: "Ruta no encontrada." }));
    }
});

servidor.listen(PORT, HOST, () => {
    console.log(`Servidor activo en http://${HOST}:${PORT}/`);
});
