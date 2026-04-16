const express = require('express')
const app = express()
const port = 3000

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


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/alunos', (req, res) => {
  res.json(alunos);
})

app.get("/cursos", (req, res) => {
    res.json(cursos);
});

app.delete("/alunos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const existe = alunos.find(aluno => aluno.id === id);
    if (!existe) {
        return res.status(404).json({ message: "Aluno não encontrado" });
    }
    alunos = alunos.filter(aluno => aluno.id !== id);
    res.status(200).json({ message: "Aluno apagado" });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

