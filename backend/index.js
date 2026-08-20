import express from 'express'
import cors from 'cors';
import mysql2 from "mysql2";

const app = express()
const port = 3000

app.use(express.json());
app.use(cors())

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MB"
});


app.get('/', (req, res) => {
    const selectCommand = "SELECT * FROM filmes_neguinho";
})

app.post('/novo-filme', (req, res) => {
    const { name, gender, duration, classification} = req.body

    const insertCommand = "INSERT INTO filmes_neguinho(name, gender, duration, classification) VALUES (?, ?, ?, ?)";

    sql.query(insertCommand, [name, gender, duration, classification], (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao criar tarefa" });
        }

        res.status(201).json({
            message: "Tarefa criada com sucesso"
        });
    });
})

app.get('/', (req, res) => {
    const listCommand = "SELECT * FROM filmes_neguinho";

    sql.query(listCommand, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao listar tarefas" });
        }

        res.status(200).json(results);
    });
})

app.delete("/deletar-filme/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);

    const deleteCommand = "DELETE FROM filmes_neguinho WHERE id = ?";

    sql.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao apagar tarefa" });
        }

        res.status(200).json({
            message: "Tarefa apagada com sucesso"
        });
    });
});

app.put("/editar-filme/:id", (req, res) => {
    const id = req.params.id
    const { name, gender, duration, classification } = req.body
    
    const editCommand = "UPDATE filmes_neguinho SET name = ?, gender = ?, duration = ?, classification = ? WHERE id = ?;";

    sql.query(editCommand, [name, gender, duration, classification, id], (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao apagar tarefa" });
        }

        res.status(200).json({
            message: "Tarefa apagada com sucesso"
        });
    });
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})