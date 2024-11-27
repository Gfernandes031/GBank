# GBank - Sistema de Gerenciamento Bancário

O **GBank** é um sistema completo de gerenciamento bancário. Ele inclui uma API para funcionalidades básicas de um banco, como gerenciamento de contas de usuários e autenticação segura, além de uma interface frontend para interação do usuário. A aplicação foi construída utilizando Node.js, Express, MongoDB e React.

---

## Funcionalidades

### Backend:
- **Registro de Usuários e Contas Bancárias:**
  - Criação de usuários com dados pessoais e senha segura.
  - Cada usuário possui uma conta bancária associada.
- **Login Seguro:**
  - Autenticação com validação de credenciais usando tokens JWT.
- **Operações Bancárias (planejado):**
  - Depósitos, saques e transferências entre contas.
- **Consulta de Saldo e Histórico de Transações (planejado):**
  - Recuperação de informações bancárias do usuário.
- **Segurança:**
  - Senhas criptografadas com bcrypt.js.
  - Autenticação e autorização por tokens JWT.

### Frontend:
- **Interface Responsiva:**
  - Formulários para registro e login de usuários.
  - Exibição de informações bancárias (saldo e transações, quando implementado).
- **Conexão com Backend:**
  - Todas as operações realizadas no frontend interagem diretamente com a API do backend.


---

## Requisitos

Certifique-se de ter os seguintes softwares instalados:
- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)
- Gerenciador de pacotes (NPM ou Yarn)


