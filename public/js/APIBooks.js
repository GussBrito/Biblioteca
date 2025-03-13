// Função para buscar livros usando a Open Library API
function buscarLivros() {
    const searchQuery = document.getElementById('searchInput').value.trim()
    const resultContainer = document.getElementById('resultContainer')
    resultContainer.innerHTML = ''

    if (searchQuery === '') {
        resultContainer.innerHTML = '<p>Por favor, insira um título de livro para buscar.</p>'
        return
    }

    axios.get(`https://openlibrary.org/search.json?title=${searchQuery}`)
        .then(response => {
            const livros = response.data.docs
            if (livros.length === 0) {
                resultContainer.innerHTML = '<p>Nenhum livro encontrado com esse título.</p>'
                return
            }

            // Exibindo os resultados
            livros.forEach(livro => {
                const resultItem = document.createElement('div')
                resultItem.classList.add('result-item')

                const titulo = livro.title || 'Sem título'
                const autor = livro.author_name ? livro.author_name.join(', ') : 'Autor desconhecido'
                const ano = livro.first_publish_year || 'Ano desconhecido'
                const link = `https://openlibrary.org${livro.key}`

                const coverId = livro.cover_i
                const coverImageUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : ''

                resultItem.innerHTML = `
                    <h3>${titulo}</h3>
                     ${coverImageUrl ? `<img src="${coverImageUrl}" alt="Capa do livro" style="max-width: 150px; margin-top: 10px;" />` : ''}
                    <p><strong>Autor:</strong> ${autor}</p>
                    <p><strong>Ano de publicação:</strong> ${ano}</p>
                    <button class="btn-entrar detail"><a href="${link}" target="_blank">Ver mais detalhes</a></button>
                `
                resultContainer.appendChild(resultItem);
            })
        })
        .catch(error => {
            console.error('Erro ao buscar livros:', error)
            resultContainer.innerHTML = '<p>Ocorreu um erro ao buscar os livros. Tente novamente mais tarde.</p>'
        });
}