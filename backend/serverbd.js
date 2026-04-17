const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;


const mongoUri = process.env.MONGO_URI || "mongodb+srv://pmoreira:pmoreira@pmongo.7wrtx.mongodb.net/twalunos";

app.use(cors());
app.use(express.json());

const cursoSchema = new mongoose.Schema(
  {
    nomeDoCurso: { type: String, required: true, trim: true }
  },
  { versionKey: false, timestamps: true }
);

const alunoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    apelido: { type: String, required: true, trim: true },
    idade: { type: Number, required: true, min: 0 },
    cursoId: { type: mongoose.Schema.Types.ObjectId, ref: "Curso", required: true }
  },
  { versionKey: false, timestamps: true }
);

const Curso = mongoose.model("Curso", cursoSchema);
const Aluno = mongoose.model("Aluno", alunoSchema);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "API alunos/cursos online" });
});

// CURSOS
app.get("/cursos", async (req, res) => {
  try {
    const cursos = await Curso.find().sort({ createdAt: -1 });
    res.json(cursos);
  } catch {
    res.status(500).json({ message: "Erro ao listar cursos" });
  }
});

app.get("/cursos/:id", async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ message: "Curso não encontrado" });
    res.json(curso);
  } catch {
    res.status(400).json({ message: "ID inválido" });
  }
});

app.post("/cursos", async (req, res) => {
  try {
    console.log(req.body.nomeDoCurso);
    const novoCurso = await Curso.create({ nomeDoCurso: req.body.nomeDoCurso });
    res.location(`/cursos/${novoCurso._id}`);
    res.status(201).json(novoCurso);
  } catch {
    res.status(400).json({ message: "Dados inválidos para curso" });
  }
});

app.put("/cursos/:id", async (req, res) => {
  try {
    const curso = await Curso.findByIdAndUpdate(
      req.params.id,
      { nomeDoCurso: req.body.nomeDoCurso },
      { new: true, runValidators: true }
    );
    if (!curso) return res.status(404).json({ message: "Curso não encontrado" });
    res.json(curso);
  } catch {
    res.status(400).json({ message:
      "Erro ao atualizar curso"
    });
  }
});

app.delete("/alunos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const aluno = await Aluno.findByIdAndDelete(id);
    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }
    res.json(aluno);
  } catch {
    res.status(400).json({ message: "ID inválido" });
  }
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB ligado");
    app.listen(port, () => {
      console.log(`API a correr em http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro MongoDB:", err.message);
    process.exit(1);
  });

