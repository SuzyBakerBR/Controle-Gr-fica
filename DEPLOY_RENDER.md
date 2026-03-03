# 🚀 Deploy no Render.com (Gratuito)

## Passo 1: Conectar GitHub

1. Acesse [render.com](https://render.com)
2. Clique em **"Sign Up"** → Use sua conta **GitHub**
3. Autorize o Render a acessar seu GitHub

## Passo 2: Criar Web Service

1. No painel do Render, clique em **"New +"**
2. Selecione **"Web Service"**
3. Na lista, encontre seu repositório: **Controle-Gráfica**
4. Clique nele

## Passo 3: Configurar

Preencha assim:

| Campo | Valor |
|-------|-------|
| Name | controle-grafica |
| Environment | Node |
| Build Command | (deixe vazio) |
| Start Command | `node server.js` |
| Plan | Free |

4. Clique em **"Create Web Service"**

## Passo 4: Aguardar

- Vai demorar uns 2-3 minutos
- Quando terminar, terá um link como: `https://controle-grafica.onrender.com`

## ✅ Pronto!

Compartilhe o link com seus clientes!

---

## 📝 Para Atualizar

Quando quiser atualizar algo:

1. Altere os arquivos no seu PC
2. No Git Bash:
```
bash
git add .
git commit -m "Atualização"
git push
```

O Render atualiza automaticamente!
