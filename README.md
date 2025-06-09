# AutoCenter Management System

##### Este é um projeto para o gerenciamento de um autocenter, desenvolvido com foco em funcionalidades de cadastro de clientes, controle de produtos e integração de APIs RESTful para a interface frontend-backend.

Nosso projeto é focado em garantir o funcionamento completo de um autocenter, garantindo o atendimento, vendas de produtos e graficos informativos de Lucros, perdas, estoque, e demandas.

Garantindo um sistema completo para qualquer autocenter!

## 🛠️ Tecnologias Utilizadas
- **Frontend**: React, React Router DOM, Vite
- **Backend**: Spring Boot
- **Banco de Dados**: MySQL
- **Estilos**: CSS, Tailwind e Styled Components

## 📋 Pré-requisitos

- **Node.js** (versão 14 ou superior) e **npm** instalados para o frontend.
- **Java** (versão 11 ou superior) e **Maven** para o backend.
- **MySQL** para banco de dados.

## 🚀 Instalação do Projeto

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/Grupo10-PI-3adsc/AutoHub.git
   cd AutoHub/front_end/react

2. **Instalação das Dependências do Frontend No diretório principal do projeto, execute:**

Copiar código:
```bash
npm install react react-dom react-router-dom axios emailjs-com qrcode.react react-qr-code react-icons sweetalert2 @vitejs/plugin-react vite -D
```

## 🧩 Funcionalidades Principais

- 📦 **Controle de Estoque:** Cadastro, entrada e saída de peças e produtos, com alertas automáticos de reabastecimento.

- 🛠️ **Ordens de Serviço:** Criação, agendamento, aprovação e acompanhamento do status dos serviços realizados nos veículos.

- 🛍️ **Sistema de Pedidos:** Clientes fazem pedidos de produtos, e os funcionários aprovam para retirada na loja.
- 📅 **Agendamento Inteligente:** O cliente escolhe datas disponíveis e o funcionário aprova.

- 💳 **Pagamentos e Faturamento:** Múltiplos métodos de pagamento, emissão de faturas e controle financeiro com relatórios.

- 🧾 **Relatórios e Exportações:** Dashboards com gráficos e exportação de dados em CSV.
- 🔐 **Autenticação com JWT:** Controle de acesso com diferentes níveis de permissão para usuários e administradores.

- 🔄 **Importação de XML:** Adição automática de produtos ao estoque via arquivos XML.
- 🌐 **Integração via APIs RESTful:** Comunicação fluida entre frontend e backend.

---

## 🛠️ Tecnologias Utilizadas

### 💻 Frontend
- **React** (com Vite para build rápido)
- **React Router DOM** (navegação SPA)
- **Axios** (requisições HTTP)
- **SweetAlert2, React Icons, EmailJS, QRCode React** (UX otimizada)

### 🔧 Backend
- **Java 17+**
- **Spring Boot (JPA, Lombok, Spring Security, REST Controllers)**
- **JWT Authentication**

### 🗄️ Banco de Dados
- **MySQL** (produção)
- **H2 Database** (ambiente de testes)

### 🎨 Estilo
- **CSS Puro**
- **Componentes React personalizados**
- (Futuramente: integração com Tailwind ou Styled Components)

---

## 📋 Pré-requisitos

- ✅ **Node.js** (v14 ou superior)
- ✅ **Java JDK** (v11 ou superior)
- ✅ **Maven** (ou Gradle, conforme preferir)
- ✅ **MySQL** (ou MariaDB)
- ✅ **IDE recomendadas:** IntelliJ, VS Code, DBeaver (opcional)