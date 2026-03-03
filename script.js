// 🔐 ALTERA AQUI - fora do event listener para estar acessível globalmente
const usuario = "admin"; // "admin" ou "producao"

let tabela;
let form;
let pedidosCache = [];

document.addEventListener("DOMContentLoaded", () => {
  //📅 DATA AUTOMÁTICA
  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString("pt-BR", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Formata a primeira letra maiúscula
  const dataFormatadaCapitalized = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  document.getElementById("dataHoje").innerText = dataFormatadaCapitalized;

  // Saudação baseada no horário
  const hora = hoje.getHours();
  let saudacao = "Bom dia";
  if (hora >= 12 && hora < 18) {
    saudacao = "Boa tarde";
  } else if (hora >= 18) {
    saudacao = "Boa noite";
  }
  document.querySelector(".greeting").innerText = `${saudacao}!`;

  carregarPedidos();

  // 🔄 Atualiza automático a cada 10 segundos
  setInterval(carregarPedidos, 10000);

  tabela = document.getElementById("tabelaPedidos");
  form = document.getElementById("formPedido");

  // Se não for admin, esconde o formulário
  if (usuario !== "admin") {
    form.style.display = "none";
  }
});

function carregarPedidos() {
  fetch("/pedidos")
    .then(res => res.json())
    .then(data => {
      pedidosCache = data;
      renderPedidos(data);
    })
    .catch(err => console.error("Erro ao carregar:", err));
}

function renderPedidos(pedidos) {
  if (!tabela) return; // Evita erro se tabela não estiver pronta

  tabela.innerHTML = "";

  let totalRecebido = 0;
  let totalPendente = 0;
  let totalGeral = 0;

  pedidos.forEach(pedido => {
    const linha = document.createElement("tr");

    const valorServicos = pedido.valorServicos || 0;
    const entrada = pedido.entrada || 0;
    const pagamentoFinal = valorServicos - entrada;
    
    // Total Geral = soma de todos os valores de serviços
    totalGeral += valorServicos;
    
    // Total Recebido = soma de todas as entradas
    totalRecebido += entrada;

    const pago = (pedido.pago || "nao").toLowerCase().trim();
    const status = (pedido.status || "aguardando").toLowerCase().trim();

    linha.classList.add("status-" + status);

    // Badge de status com nova classe
    let statusHTML = `<span class="status-badge status-${status}">${status.toUpperCase()}</span>`;

    // Badge de pago com nova classe
    let pagoHTML = `<span class="pago-badge pago-${pago}">${pago === "sim" ? "Pago" : "Não"}</span>`;

    let acoesHTML = "";

    // 🔐 Se for admin pode editar e excluir
    if (usuario === "admin") {
      statusHTML = `
        <select onchange="mudarStatus(${pedido.id}, this.value)" style="padding: 6px 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.8rem;">
          <option value="aguardando" ${status === "aguardando" ? "selected" : ""}>Aguardando</option>
          <option value="producao" ${status === "producao" ? "selected" : ""}>Produção</option>
          <option value="finalizado" ${status === "finalizado" ? "selected" : ""}>Finalizado</option>
        </select>
      `;

      pagoHTML = `
        <select onchange="mudarPago(${pedido.id}, this.value)" style="padding: 6px 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.8rem;">
          <option value="nao" ${pago === "nao" ? "selected" : ""}>Não</option>
          <option value="sim" ${pago === "sim" ? "selected" : ""}>Sim</option>
        </select>
      `;

      acoesHTML = `
        <button class="btn-action btn-edit" onclick="editarPedido(${pedido.id})" title="Editar">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-action btn-delete" onclick="deletarPedido(${pedido.id})" title="Excluir">
          <i class="fas fa-trash"></i>
        </button>
      `;
    }

    linha.innerHTML = `
      <td>${pedido.id}</td>
      <td>${pedido.cliente}</td>
      <td>${pedido.servico}</td>
      <td><strong>R$ ${valorServicos.toFixed(2)}</strong></td>
      <td>R$ ${entrada.toFixed(2)}</td>
      <td>R$ ${pagamentoFinal.toFixed(2)}</td>
      <td>${statusHTML}</td>
      <td>${pagoHTML}</td>
      <td>${acoesHTML}</td>
    `;

    tabela.appendChild(linha);
  });

  // Total Pendente = Total Geral - Total Recebido
  totalPendente = totalGeral - totalRecebido;

  document.getElementById("totalPedidos").innerText = pedidos.length;
  document.getElementById("totalRecebido").innerText = "R$ " + totalRecebido.toFixed(2);
  document.getElementById("totalPendente").innerText = "R$ " + totalPendente.toFixed(2);
  document.getElementById("totalGeral").innerText = "R$ " + totalGeral.toFixed(2);
}

// Event listener do formulário definido fora do DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.getElementById("formPedido");
  
  formElement.addEventListener("submit", function(e) {
    e.preventDefault();

    const cliente = document.getElementById("cliente").value;
    const servico = document.getElementById("servico").value;
    const valorServicos = parseFloat(document.getElementById("valorServicos").value) || 0;
    const entrada = parseFloat(document.getElementById("entrada").value) || 0;
    const status = document.getElementById("status").value;
    const pago = document.getElementById("pago").value;

    fetch("/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cliente, servico, valorServicos, entrada, status, pago })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao salvar");
        return res.json();
      })
      .then(() => {
        formElement.reset();
        carregarPedidos();
      })
      .catch(err => console.error("Erro:", err));
  });
});

function mudarStatus(id, novoStatus) {
  fetch(`/pedidos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: novoStatus })
  })
    .then(res => res.json())
    .then(() => carregarPedidos())
    .catch(err => console.error("Erro ao atualizar:", err));
}

function mudarPago(id, novoPago) {
  fetch(`/pedidos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pago: novoPago })
  })
    .then(res => res.json())
    .then(() => carregarPedidos())
    .catch(err => console.error("Erro ao atualizar:", err));
}

function deletarPedido(id) {
  if (!confirm("Deseja realmente excluir?")) return;

  fetch(`/pedidos/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(() => carregarPedidos())
    .catch(err => console.error("Erro ao deletar:", err));
}

function editarPedido(id) {
  const pedido = pedidosCache.find(p => p.id === id);
  if (!pedido) return;

  // Preencher o formulário com os dados do pedido
  document.getElementById("cliente").value = pedido.cliente;
  document.getElementById("servico").value = pedido.servico;
  document.getElementById("valorServicos").value = pedido.valorServicos;
  document.getElementById("entrada").value = pedido.entrada;
  document.getElementById("status").value = pedido.status;
  document.getElementById("pago").value = pedido.pago;

  // Mudar o texto do botão para "Atualizar"
  const btnSubmit = document.querySelector("#formPedido button[type='submit']");
  btnSubmit.innerHTML = '<i class="fas fa-save"></i> Atualizar';
  btnSubmit.onclick = function(e) {
    e.preventDefault();
    atualizarPedido(id);
  };
  
  // Scroll para o formulário
  document.querySelector(".form-section").scrollIntoView({ behavior: "smooth" });
}

function atualizarPedido(id) {
  const cliente = document.getElementById("cliente").value;
  const servico = document.getElementById("servico").value;
  const valorServicos = parseFloat(document.getElementById("valorServicos").value) || 0;
  const entrada = parseFloat(document.getElementById("entrada").value) || 0;
  const status = document.getElementById("status").value;
  const pago = document.getElementById("pago").value;

  fetch(`/pedidos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cliente, servico, valorServicos, entrada, status, pago })
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao atualizar");
      return res.json();
    })
    .then(() => {
      form.reset();
      // Restaurar o botão
      const btnSubmit = document.querySelector("#formPedido button[type='submit']");
      btnSubmit.innerHTML = '<i class="fas fa-plus"></i> Adicionar';
      btnSubmit.onclick = null;
      carregarPedidos();
    })
    .catch(err => console.error("Erro:", err));
}
