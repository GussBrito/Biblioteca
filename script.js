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
