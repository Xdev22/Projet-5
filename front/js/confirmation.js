/*************************Recuperation de l'id et l'intégrer sur la page************************/
let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");

console.log(id);
const orderId = document.getElementById("orderId");

orderId.textContent = id;

localStorage.clear();
