document.getElementById("toggleSenha").addEventListener("click", function () {
    let senhaInput = document.getElementById("senha");

    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        this.textContent = "📕"; // Ícone de livro fechado
    } else {
        senhaInput.type = "password";
        this.textContent = "📖"; // Ícone de livro aberto
    }
});

document.querySelector(".btn").addEventListener("click", function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    sessionStorage.setItem("login", "true"); // Armazena um valor temporário para controle
    window.location.href = "principal.html"; // Redireciona para a página principal
});

// Verifica se o usuário acessou a página principal sem passar pelo login
if (window.location.pathname.includes("principal.html") && !sessionStorage.getItem("login")) {
    window.location.href = "index.html"; // Redireciona de volta ao login
}
