const express = require("express");

const app = express();
const PORT = 3000;

function calcularCollatz(numero) {
    let secuencia = [numero];

    while (numero !== 1) {
        if (numero % 2 === 0) {
            numero = numero / 2;
        } else {
            numero = 3 * numero + 1;
        }
        secuencia.push(numero);
    }

    return secuencia;
}

app.get("/collatz", (req, res) => {
    let numero = parseInt(req.query.numero);

    if (isNaN(numero) || numero <= 0) {
        res.status(400).json({ error: " número entero positivo." });
    } else {
        let resultado = calcularCollatz(numero);
        res.json({ numero: numero, secuencia: resultado });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
