# 📚 Guia Passo a Passo para GitHub

## 1. Primeiro: Instalar o Git

### No Windows:
1. Baixe em: https://git-scm.com/download/win
2. Execute o instalador (clique em "Next" em todas as telas)

### No Mac:
```
brew install git
```
(ou baixe em https://git-scm.com/download/mac)

### No Linux:
```
sudo apt install git
```

---

## 2. Configurar o Git (apenas uma vez)

Abra o terminal (Prompt de Comando no Windows) e digite:

```
bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

---

## 3. Criar Conta no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em "Sign up"
3. Preencha: email, senha, nome de usuário
4. Confirme o email

---

## 4. Criar Repositório

1. Faça login no GitHub
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Nome: `controle-grafica`
5. Description: "Sistema de gestão de pedidos para gráficas"
6. Marque: ✅ "Public"
7. Clique em **"Create repository"**

---

## 5. Conectar e Enviar Arquivos

No seu terminal, na pasta do projeto (`d:/PROGRAMACAO/projetos/controle-grafica`):

```bash
# Inicializar git
git init

# Adicionar todos os arquivos
git add .

# Criar commit (mensagem)
git commit -m "Primeiro commit - Sistema de controle de pedidos"

# Conectar ao repositório (cole o link do seu repositório)
git remote add origin https://github.com/SEU_USUARIO/controle-grafica.git

# Enviar para o GitHub
git push -u origin main
```

⚠️ **Importante:** Substitua `SEU_USUARIO` pelo seu usuário do GitHub!

---

## 6. Después de Criar o Repositório no GitHub

O GitHub vai mostrar uma página com comandos. Você só precisa destes 3:

```
bash
git add .
git commit -m "Mensagem"
git push
```

---

## 📌 Resumo dos Comandos

| Comando | Para que serve |
|---------|----------------|
| `git init` | Iniciar o git no projeto |
| `git add .` | Selecionar todos os arquivos |
| `git commit -m "msg"` | Salvar as alterações |
| `git push` | Enviar para o GitHub |
| `git pull` | Baixar alterações do GitHub |

---

## ❓ Problemas Comuns

**Erro: "git não é reconhecido":**
- Reinicie o terminal após instalar o Git
- Ou use o "Git Bash" que vem com o instalador

**Erro de permissão:**
- Verifique se o link do repositório está correto

---

Precisa de ajuda com algum passo específico?
