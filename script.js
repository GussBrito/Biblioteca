// Exibir/ocultar senha
document.getElementById("toggleSenha").addEventListener("click", function () {
    let senhaInput = document.getElementById("senha");

    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        this.textContent = "📖"; // Ícone de livro fechado
    } else {
        senhaInput.type = "password";
        this.textContent = "📕"; // Ícone de livro aberto
    }
});

// Verificação de login
document.querySelector(".btn-entrar").addEventListener("click", function (event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Captura os valores do usuário e senha
    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;

    // Aqui você pode adicionar a lógica de autenticação para o login do usuário normal
    sessionStorage.setItem("login", "true"); // Simula um login bem-sucedido
    window.location.href = "principal.html"; // Redireciona para a página principal
});

// Verifica se o usuário acessou a página principal sem fazer login
if (window.location.pathname.includes("principal.html") && !sessionStorage.getItem("login")) {
    window.location.href = "index.html"; // Redireciona de volta ao login
}

// Verificação de senha de administrador antes de acessar o cadastro
document.querySelector(".btn-cadastrar").addEventListener("click", function (event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Captura a senha de administrador fornecida pelo usuário
    let adminSenha = document.getElementById("admin-senha").value;
    const adminPassword = "senhaSegura"; // Defina a senha de administrador real

    // Verifica se a senha de administrador está correta
    if (adminSenha === adminPassword) {
        // Redireciona para a página de cadastro se a senha estiver correta
        window.location.href = "cadastro.html";
    } else {
        // Caso a senha de administrador esteja incorreta, exibe uma mensagem de erro
        alert("Senha de administrador incorreta. Você não tem permissão para cadastrar.");
    }
});

// Cadastro do usuário
document.addEventListener("DOMContentLoaded", function () {
    let btnSalvar = document.getElementById("btnSalvar");

    if (btnSalvar) {
        btnSalvar.addEventListener("click", function (event) {
            event.preventDefault(); // Impede o envio do formulário

            // Captura os valores dos inputs
            let usuario = document.getElementById("usuario").value;
            let email = document.getElementById("email").value;
            let cpf = document.getElementById("CPF").value;
            let senha = document.getElementById("senha").value;

            // Verifica se todos os campos estão preenchidos
            if (usuario === "" || email === "" || cpf === "" || senha === "") {
                alert("Preencha todos os campos!");
                return;
            }

            // Salva os dados (simulação do banco de dados, como localStorage ou banco real)
            alert("Cadastro realizado com sucesso!");

            // Após o cadastro, redireciona para a página de login
            window.location.href = "index.html"; // Redireciona para a página de login
        });
    }
});

// Verifica se o usuário acessou a página de cadastro sem ser administrador
if (window.location.pathname.includes("cadastro.html") && !sessionStorage.getItem("login")) {
    window.location.href = "index.html"; // Redireciona de volta ao login
}
