async function buscarFilmes() {
    const resposta = await fetch(" http://localhost:3001/list-films")
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
            </div>
        `
    })
}

buscarFilmes()