let listaFilmes = []

async function buscarFilmes() {
    const resposta = await fetch("http://localhost:3000/list-films")
    const filmes = await resposta.json()
    const sectionFilmes = document.querySelector(".filmes")

    listaFilmes = filmes
    sectionFilmes.innerHTML = ""

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.name}</h2>
                <p><strong>Gênero:</strong> ${filme.gender}</p>
                <p><strong>Duração:</strong> ${filme.duration} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.classification > 0 ? filme.classification + ' anos' : 'Livre'}</p>
                <button onclick="apagarFilme(${filme.id})">Apagar</button>
                <button onclick="editarFilme(${filme.id})">Editar Filme</button>
            </div>
        `
    })
}

buscarFilmes()

async function apagarFilme(id) {
    const respostaDeSucessoAoApagar = await fetch(`http://localhost:3000/deletar-filme/${id}`, { method: "DELETE" })
    const mensagem = await respostaDeSucessoAoApagar.json()

    alert(mensagem.message)

    window.location.reload()
}

async function editarFilme(id) {
    const filme = listaFilmes.find((f) => f.id === id)
    if (!filme) return alert("Filme não encontrado")

    const name = prompt("Nome do filme:", filme.name)
    if (name === null) return

    const gender = prompt("Gênero:", filme.gender)
    if (gender === null) return

    const duration = prompt("Duração (minutos):", filme.duration)
    if (duration === null) return

    const classification = prompt("Classificação indicativa (0 = Livre):", filme.classification)
    if (classification === null) return

    try {
        const resposta = await fetch(`http://localhost:3000/editar-filme/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                gender: gender,
                duration: Number(duration),
                classification: Number(classification)
            })
        })

        const mensagem = await resposta.json()
        alert(mensagem.message)

        if (resposta.ok) {
            buscarFilmes()
        }
    } catch (erro) {
        console.error(erro)
        alert("Erro ao editar o filme")
    }
}