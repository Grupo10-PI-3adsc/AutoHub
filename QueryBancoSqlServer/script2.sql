-- Verifica e exclui as tabelas caso já existam, para evitar conflitos
IF OBJECT_ID('dbo.Movimentacao_Estoque', 'U') IS NOT NULL DROP TABLE Movimentacao_Estoque;
IF OBJECT_ID('dbo.Servico_Produtos', 'U') IS NOT NULL DROP TABLE Servico_Produtos;
IF OBJECT_ID('dbo.Produtos', 'U') IS NOT NULL DROP TABLE Produtos;
IF OBJECT_ID('dbo.Historico_Manutencao', 'U') IS NOT NULL DROP TABLE Historico_Manutencao;
IF OBJECT_ID('dbo.Transacoes', 'U') IS NOT NULL DROP TABLE Transacoes;
IF OBJECT_ID('dbo.Agendamentos', 'U') IS NOT NULL DROP TABLE Agendamentos;
IF OBJECT_ID('dbo.Funcionarios', 'U') IS NOT NULL DROP TABLE Funcionarios;
IF OBJECT_ID('dbo.Servicos', 'U') IS NOT NULL DROP TABLE Servicos;
IF OBJECT_ID('dbo.Veiculos', 'U') IS NOT NULL DROP TABLE Veiculos;
IF OBJECT_ID('dbo.maoDeobra', 'U') IS NOT NULL DROP TABLE Mao_De_Obra;
IF OBJECT_ID('dbo.Usuario', 'U') IS NOT NULL DROP TABLE Usuario;
IF OBJECT_ID('dbo.endereco', 'U') IS NOT NULL DROP TABLE Endereco;


IF OBJECT_ID('dbo.endereco', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.endereco (
        id_endereco INT IDENTITY(1,1) PRIMARY KEY,      -- Coluna id com auto incremento
        cep VARCHAR(255) NULL,                 -- Código postal
        logradouro VARCHAR(255) NULL,          -- Rua/Logradouro
        complemento VARCHAR(255) NULL,         -- Complemento do endereço
        bairro VARCHAR(255) NULL,              -- Bairro
        localidade VARCHAR(255) NULL,          -- Cidade ou localidade
        uf VARCHAR(2) NULL,                    -- Unidade federativa (UF)
        ibge VARCHAR(255) NULL,                -- Código IBGE
        gia VARCHAR(255) NULL,                 -- GIA (Guia de Informação e Apuração)
        ddd VARCHAR(3) NULL,                   -- Código de área (DDD)
        siafi VARCHAR(255) NULL,               -- Código SIAFI
        is_active BIT NULL                      -- Indicador se o endereço está ativo
    );
END
GO


-- Criação da tabela Usuario
IF OBJECT_ID('Usuario', 'U') IS NULL
BEGIN
    CREATE TABLE Usuario (
        Id INT PRIMARY KEY,
        Nome NVARCHAR(255) NOT NULL,
        CPF_CNPJ VARCHAR(20) NOT NULL,
        Telefone NVARCHAR(20),
        Email NVARCHAR(255),
        Data_Cadastro DATE,
        Ativo Bit,
        Funcao varchar(255),
        senha varchar(255),
        fk_endereco_id int
        FOREIGN KEY (ID_Cliente) REFERENCES Usuario(ID_Cliente)
    );
END
GO

-- Criação da tabela Veículos
IF OBJECT_ID('Veiculos', 'U') IS NULL
BEGIN
    CREATE TABLE Veiculos (
        ID_Veiculo INT PRIMARY KEY,
        Placa NVARCHAR(10) NOT NULL,
        Marca NVARCHAR(50),
        Modelo NVARCHAR(50),
        Ano_Fabricacao INT,
        Cor NVARCHAR(20),
        Numero_Chassi NVARCHAR(50),
        ID_Cliente INT,
        FOREIGN KEY (ID_Cliente) REFERENCES Usuario(ID_Cliente)
    );
END
GO

-- Criação da tabela Serviços
IF OBJECT_ID('Servicos', 'U') IS NULL
BEGIN
    CREATE TABLE Servicos (
        ID_Servico INT PRIMARY KEY,
        Descricao NVARCHAR(255),
        Categoria NVARCHAR(50),
        Preco DECIMAL(10, 2)
    );
END
GO

IF OBJECT_ID('dbo.maoDeobra', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.maoDeobra (
        id INT IDENTITY(1,1) PRIMARY KEY,           -- Coluna com auto-incremento
        nome NVARCHAR(255) NULL,                    -- Nome do produto/serviço
        descricao NVARCHAR(255) NULL,               -- Descrição do serviço/produto
        Categoria NVARCHAR(50) NULL,                -- Categoria do serviço/produto
        qtd_estoque INT NULL,                       -- Quantidade em estoque
        preco_unitario DECIMAL(10, 2) NULL,         -- Preço unitário
        fornecedor NVARCHAR(255) NULL,              -- Fornecedor do serviço/produto
        localizacao NVARCHAR(50) NULL,              -- Localização no estoque
        data_atualizcao DATE NULL                   -- Data da última atualização
    );
END
GO

-- Criação da tabela Agendamentos
IF OBJECT_ID('Agendamentos', 'U') IS NULL
BEGIN
    CREATE TABLE Agendamentos (
        ID_Agendamento INT PRIMARY KEY,
        ID_Cliente INT,
        ID_Veiculo INT,
        ID_Funcionario INT,
        Data_Hora DATETIME,
        Servico_Solicitado NVARCHAR(255),
        Status NVARCHAR(20),
        FOREIGN KEY (ID_Cliente) REFERENCES Usuario(ID_Cliente),
        FOREIGN KEY (ID_Veiculo) REFERENCES Veiculos(ID_Veiculo),
        FOREIGN KEY (ID_Funcionario) REFERENCES Usuario(ID_Funcionario)
    );
END
GO

-- Criação da tabela Transações
IF OBJECT_ID('Transacoes', 'U') IS NULL
BEGIN
    CREATE TABLE Transacoes (
        ID_Transacao INT PRIMARY KEY,
        ID_Cliente INT,
        ID_Veiculo INT,
        ID_Servico INT,
        ID_Funcionario INT,
        Data_Transacao DATETIME,
        Valor_Total DECIMAL(10, 2),
        Forma_Pagamento NVARCHAR(50),
        FOREIGN KEY (ID_Cliente) REFERENCES Usuario(ID_Cliente),
        FOREIGN KEY (ID_Veiculo) REFERENCES Veiculos(ID_Veiculo),
        FOREIGN KEY (ID_Servico) REFERENCES Servicos(ID_Servico),
        FOREIGN KEY (ID_Funcionario) REFERENCES Funcionarios(ID_Funcionario)
    );
END
GO

-- Criação da tabela Histórico de Manutenção
IF OBJECT_ID('Historico_Manutencao', 'U') IS NULL
BEGIN
    CREATE TABLE Historico_Manutencao (
        ID_Historico INT PRIMARY KEY,
        ID_Veiculo INT,
        Data DATE,
        Descricao_Servico NVARCHAR(255),
        Pecas_Substituidas NVARCHAR(255),
        Observacoes NVARCHAR(255),
        FOREIGN KEY (ID_Veiculo) REFERENCES Veiculos(ID_Veiculo)
    );
END
GO

-- Criação da tabela Produtos
IF OBJECT_ID('Produtos', 'U') IS NULL
BEGIN
    CREATE TABLE Produtos (
        ID_Produto INT PRIMARY KEY,
        Nome NVARCHAR(255),
        Descricao NVARCHAR(255),
        Categoria NVARCHAR(50),
        Quantidade_Em_Estoque INT,
        Preco_Unitario DECIMAL(10, 2),
        Fornecedor NVARCHAR(255),
        Localizacao NVARCHAR(50),
        Data_Atualizacao DATE
    );
END
GO

-- Criação da tabela Serviço_Produtos
IF OBJECT_ID('Servico_Produtos', 'U') IS NULL
BEGIN
    CREATE TABLE Servico_Produtos (
        ID_Servico_Produto INT PRIMARY KEY,
        ID_Servico INT,
        ID_Produto INT,
        Quantidade_Usada INT,
        FOREIGN KEY (ID_Servico) REFERENCES Servicos(ID_Servico),
        FOREIGN KEY (ID_Produto) REFERENCES Produtos(ID_Produto)
    );
END
GO

-- Criação da tabela Movimentação de Estoque
IF OBJECT_ID('Movimentacao_Estoque', 'U') IS NULL
BEGIN
    CREATE TABLE Movimentacao_Estoque (
        ID_Movimentacao INT PRIMARY KEY,
        ID_Produto INT,
        Tipo NVARCHAR(20),
        Quantidade INT,
        Data DATE,
        Motivo NVARCHAR(255),
        ID_Agendamento INT,
        FOREIGN KEY (ID_Produto) REFERENCES Produtos(ID_Produto),
        FOREIGN KEY (ID_Agendamento) REFERENCES Agendamentos(ID_Agendamento)
    );
END
GO