// JS para operações CRUD com Fetch API

// Obter referencia para o botão
const bobter = document.getElementById("bobter");
bobter.addEventListener("click", dizola);
bobter.addEventListener("click", obterAlunos);

obterCursos();
obterAlunos();

const mapaCursos = new Map();

async function obterCursos() { 
    const response = await fetch("http://localhost:3000/cursos");
    const result = await response.json();
    console.log(result);

    for (curso of result) {
        mapaCursos.set(curso.id, curso.nomeDoCurso);
    }

    console.log(mapaCursos);
    console.log("feito cursos");

}



const badicionar = document.getElementById("badicionar");
badicionar.addEventListener("click", adicionarAluno);

async function adicionarAluno() {
    const nome = document.getElementById("nomeAluno").value;
    const apelido = document.getElementById("apelidoAluno").value;
    const idade = document.getElementById("idadeAluno").value;

    const objetoAluno = {
        nome: nome,
        apelido: apelido,
        idade: idade
    };

    const response = await fetch("http://localhost:3000/alunos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objetoAluno)
    });

    obterAlunos();
}


function dizola () {
    console.log("olá");
    bobter.removeEventListener("click", dizola);
}


async function obterAlunos() {
    const response = await fetch("http://localhost:3000/alunos");
    const result = await response.json();
    console.log(result);

    const divAlunos = document.getElementById("listaDeAlunos");
    divAlunos.innerHTML = "";


    
    for (const aluno of result) {
        console.log("aluno::::::::::" + aluno.nome);
        const novop = document.createElement("p");

        const idCurso = aluno.idCurso;
        if (idCurso) {
            chaveCurso = idCurso.toString();
            const nomeDoCurso = mapaCursos.get(chaveCurso);
        } else {
            nomeDoCurso = "";
        }
        
        novop.innerText = aluno.nome + " " + aluno.apelido + " " + aluno.idade + " " + nomeDoCurso;
        let novob = document.createElement("button");
        novob.dataset.id = aluno.id;
        novob.innerText = "apagar"
        //novob.addEventListener("click",apagaAluno);
        const idAluno = aluno.id;
        novob.addEventListener("click",() => apagaAluno2(idAluno));
        divAlunos.appendChild(novop);
        divAlunos.appendChild(novob);
    }
}

async function apagaAluno(e) {
    id = e.target.dataset.id;
    const response = await fetch("http://localhost:3000/alunos/"+id, {
        method:"DELETE"
    });
    obterAlunos();
}

async function apagaAluno2(alunoid) {
    console.log(alunoid);
    const response = await fetch("http://localhost:3000/alunos/"+alunoid, {
        method:"DELETE"
    });
    obterAlunos();
}