const { json } = require("body-parser");
const { application } = require("express");


document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    console.log(e.target.children.user.value);

    const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: e.target.children.user.value,
            email: e.target.children.email.value,
            password: e.target.children.password.value
        })
    });

    // Opcional: manejar la respuesta del servidor
    const data = await res.json();
    console.log(data);
});
