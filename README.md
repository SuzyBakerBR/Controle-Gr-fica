# 📊 Controle Diário de Serviço

Sistema de gestão de produção e pedidos para gráficas e pequenos negócios.

## 🚀 Como Colocar no Ar (Deploy)

### Opção 1: Render.com (Gratuito)

1. Crie uma conta em [render.com](https://render.com)
2. Conecte seu repositório GitHub
3. Criar novo **Web Service**
4. Configurar:
   - Build Command: (vazio)
   - Start Command: `node server.js`
5. Clique em Create

### Opção 2: Railway.app (Pago por uso)

1. Crie uma conta em [railway.app](https://railway.app)
2. Clique em "New Project" → "Deploy from GitHub repo"
3. Selecione seu repositório
4. Pronto!

### Opção 3: VPS/Servidor Próprio

```
bash
# Instale Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone o projeto
git clone seu-repositorio
cd controle-grafica

# Instale dependências
npm install

# Inicie o servidor
npm start
```

## 🔧 Configuração

O sistema já vem configurado com:
- Servidor Express
- Banco de dados em arquivo JSON (public/pedidos.json)
- Frontend estático

## 📱 Acesso

Após o deploy, o sistema estará disponível em:
- **Produção:** https://seu-app.onrender.com
- **Local:** http://localhost:3000

## 💾 Backup

Os dados são salvos no arquivo `public/pedidos.json`. 
Faça backup regularmente!

## 📝 Licença

MIT
