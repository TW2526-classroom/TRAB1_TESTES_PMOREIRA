// API real a ser implementada
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let alunos = [
    {id: 1, nome: "João", apelido: "Silva", idade: 20, cursoId: 1},
    {id: 2, nome: "Maria", apelido: "Oliveira", idade: 22, cursoId: 2},
    {id: 3, nome: "Pedro", apelido: "Gomes", idade: 19, cursoId: 3}
];

let cursos = [
    {id: 1, nomeDoCurso: "Engenharia da Computação Gráfica e Multimídia"},
    {id: 2, nomeDoCurso: "Enfermagem"},
    {id: 3, nomeDoCurso: "Gastronomia e Artes Culinárias"}
];

app.get("/alunos", (req, res) => {
    res.set("Content-Type", "application/json");
    res.set("Allow", "GET, POST");
    res.json(alunos);
});

app.post("/alunos", (req, res) => {
    const novoAluno = req.body;
    novoAluno.id = alunos.length + 1;
    alunos.push(novoAluno);
    res.set("Content-Type", "application/json");
    res.set("Location", `/alunos/${novoAluno.id}`);
    res.status(201).json(novoAluno);
});

app.get("/cursos", (req, res) => {
    res.set("Content-Type", "application/json");
    res.set("Allow", "GET");
    res.json(cursos);
});

app.delete("/alunos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const existe = alunos.find(aluno => aluno.id === id);
    if (!existe) {
        return res.status(404).json({ message: "Aluno não encontrado" });
    }
    alunos = alunos.filter(aluno => aluno.id !== id);
    res.set("Allow", "GET, POST, DELETE");
    res.status(200).json({ message: "Aluno apagado" });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});