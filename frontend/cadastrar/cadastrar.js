async function cadastrarFilme() {
    const title = document.getElementById("name")
    const gender = document.getElementById("gender")
    const ageLimit = document.getElementById("classification")
    const duration = document.getElementById("duration")

    if (title.value === "" || gender.value === "") {
        alert("Preencha todos os campos!")
        return  
    }

    const filme = {
        name: title.value,
        gender: gender.value,
        duration: duration.valueAsNumber,
        classification: ageLimit.valueAsNumber
    }

    const resposta = await fetch("https://filmes-neguinho-xo2h.vercel.app/novo-filme", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },

        body: JSON.stringify(filme)
        
    })

    const mensagem = await resposta.json()

    alert(mensagem)

    window.location.href = "../index.html"

}
