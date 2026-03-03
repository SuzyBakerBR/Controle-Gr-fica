const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Banco fake em memória
let pedidos = [];
let idAtual = 1;
const arquivoPedidos = "public/pedidos.json";

// 🔥 Carrega pedidos salvos ao iniciar
try {
  if (fs.existsSync(arquivoPedidos)) {
    const dados = fs.readFileSync(arquivoPedidos, "utf-8");
    pedidos = JSON.parse(dados);

    if (pedidos.length > 0) {
      idAtual = Math.max(...pedidos.map(p => p.id)) + 1;
    }
  }
} catch (erro) {
  console.error("Erro ao carregar pedidos:", erro);
}

// 🔹 GET todos pedidos
app.get("/pedidos", (req, res) => {
  res.json(pedidos);
});

// 🔹 POST criar pedido
app.post("/pedidos", (req, res) => {
  const agora = new Date();

  console.log("Recebendo pedido:", req.body);//

  const novoPedido = {
    id: idAtual++,
    cliente: req.body.cliente,
    servico: req.body.servico,
    valorServicos: req.body.valorServicos || 0,
    entrada: req.body.entrada || 0,
    status: req.body.status || "Aguardando",
    pago: req.body.pago || "nao", 
    data: agora.toLocaleDateString("pt-BR"),
    hora: agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  pedidos.push(novoPedido);

  console.log("Array depois de adicionar:", pedidos);//

  fs.writeFileSync(arquivoPedidos, JSON.stringify(pedidos, null, 2));

  res.json(novoPedido);
});

// 🔹 PUT atualizar pedido completo
app.put("/pedidos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = pedidos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Pedido não encontrado" });
  }

  pedidos[index] = {
    ...pedidos[index],
    cliente: req.body.cliente,
    servico: req.body.servico,
    valorServicos: req.body.valorServicos || 0,
    entrada: req.body.entrada || 0,
    status: req.body.status || "Aguardando",
    pago: req.body.pago || "nao"
  };

  fs.writeFileSync(arquivoPedidos, JSON.stringify(pedidos, null, 2));

  res.json(pedidos[index]);
});

// 🔹 PUT marcar entregue
app.put("/marcar-entregue/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pedido = pedidos.find(p => p.id === id);

  if (!pedido) {
    return res.status(404).json({ erro: "Pedido não encontrado" });
  }

  pedido.status = "Entregue";

  fs.writeFileSync(arquivoPedidos, JSON.stringify(pedidos, null, 2));

  res.json({ ok: true });
});

// 🔹 PATCH atualizar status
app.patch("/pedidos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pedido = pedidos.find(p => p.id === id);

  if (!pedido) {
    return res.status(404).json({ erro: "Pedido não encontrado" });
  }

  pedido.status = req.body.status;

  res.json(pedido);
});

// 🔹 DELETE pedido
app.delete("/pedidos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pedidos = pedidos.filter(p => p.id !== id);

  res.json({ mensagem: "Pedido removido" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
