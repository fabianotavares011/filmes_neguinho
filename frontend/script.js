async function buscarFilmes() {
    const resposta = await fetch(" http://localhost:3000/list-films")
    const filmes = await resposta.json() 
    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        console.log(filme)
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.name}</h2>
                <p><strong>Gênero:</strong> ${filme.gender}</p>
                <p><strong>Duração:</strong> ${filme.duration} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.classification > 0 ? filme.classification + ' anos' : 'Livre'}</p>
                <button onclick="apagarFilme(${filme.id})">Apagar</button>
            </div>
        `
    })
}

buscarFilmes()

async function apagarFilme(id) {
    const respostaDeSucessoAoApagar = await fetch(`https://filmes-neguinho-xo2h.vercel.app/deletar-filme/6${id}`, { method: "DELETE" })
    const mensagem = await respostaDeSucessoAoApagar.json()

    alert(mensagem.message)

    window.location.reload()
}