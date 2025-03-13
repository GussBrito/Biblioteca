// Exibir/ocultar senha
document.getElementById("toggleSenha").addEventListener("click", function () {
    let senhaInput = document.getElementById("senha");

    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        this.textContent = "📖"; // Ícone de livro aberto
    } else {
        senhaInput.type = "password";
        this.textContent = "📕"; // Ícone de livro fechado
    }
});

// Verificação de login
// document.querySelector(".btn-entrar").addEventListener("click", function (event) {
//     event.preventDefault(); // Impede o comportamento padrão do formulário

//     let usuario = document.getElementById("usuario").value;
//     let senha = document.getElementById("senha").value;

//     if (usuario === "" || senha === "") {
//         alert("Preencha todos os campos para entrar.");
//         return;
//     }

//     // Simula um login bem-sucedido
//     //sessionStorage.setItem("login", "true");
//     //window.location.href = "principal.html"; // Redireciona para a página principal
// });

// Verifica se o usuário acessou a página principal sem fazer login
// if (window.location.pathname.includes("principal.html") && !sessionStorage.getItem("login")) {
//     window.location.href = "index.html"; // Redireciona de volta ao login
// }

// // Verificação de senha de administrador antes de acessar o cadastro
// document.querySelector(".btn-cadastrar").addEventListener("click", function (event) {
//     event.preventDefault(); // Impede o comportamento padrão do formulário

//     let adminSenhaInput = document.getElementById("admin-senha");

//     if (!adminSenhaInput) {
//         alert("Campo de senha de administrador não encontrado.");
//         return;
//     }

//     let adminSenha = adminSenhaInput.value;
//     const adminPassword = "ADM"; // Defina a senha real do administrador

//     if (adminSenha === adminPassword) {
//         sessionStorage.setItem("admin", "true"); // Marca que o admin está autenticado
//         window.location.href = "cadastro.html"; // Redireciona para a página de cadastro
//     } else {
//         alert("Senha de administrador incorreta. Você não tem permissão para cadastrar.");
//     }
// });

// Verifica se o usuário acessou a página de cadastro sem ser administrador
// if (window.location.pathname.includes("cadastro.html") && !sessionStorage.getItem("admin")) {
//     window.location.href = "index.html"; // Redireciona de volta ao login
// }

// document.addEventListener("DOMContentLoaded", function () {
//     let btnSalvar = document.getElementById("btnCadastrar");

//     if (btnSalvar) {
//         btnSalvar.addEventListener("click", function (event) {
//             event.preventDefault(); // Impede o envio do formulário

//             let usuario = document.getElementById("usuario").value;
//             let email = document.getElementById("email").value;
//             let cpf = document.getElementById("CPF").value;
//             let senha = document.getElementById("senha").value;

//             if (usuario === "" || email === "" || cpf === "" || senha === "") {
//                 alert("Preencha todos os campos!");
//                 return;
//             }

//             alert("Cadastro realizado com sucesso! Redirecionando para a tela de login...");

//             sessionStorage.removeItem("admin"); // Remove o acesso de administrador

//             // Aguarda 2 segundos antes de redirecionar
//             setTimeout(() => {
//                 window.location.href = "index.html";
//             }, 2000);
//         });
//     }
// });
