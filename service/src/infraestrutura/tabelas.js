var sql = require('sql-template-strings')

//Criação de tabelas precisa ser executadas na ordem, em função das dependências.

class Tabelas {
    init(conexao){
        this.conexao = conexao
        this.criarInstituicao()
        this.CriarTurno()
        this.CriarNivel()
        this.CriarCategoriaPessoa()
        this.CriarTipoDocumento()
        this.CriarDisciplinas()
        this.CriarAnoLetivo()
        this.CriarSalas()
        this.CriarTurmas()
        this.CriarSeries()
        this.CriarPessoas()
        this.CriarDocumentacao()
        this.CriarEndereco()
        this.CriarTelefones()
        this.CriarAlunos()
        this.CriarGradeCurricular()
        this.CriarMatriculas()        
    }
    
    //Tabelas fracas
    criarInstituicao(){
        const sql = 
        'CREATE TABLE IF NOT EXISTS Instituicoes ( ' +
            'Id INT NOT NULL AUTO_INCREMENT,' +
            'Nome VARCHAR(200) NOT NULL,' +
            'Cnpj VARCHAR(18) NOT NULL,' +
            'Cep VARCHAR(10) NULL,' +
            'Endereco VARCHAR(80) NULL,' +
            'Complemento VARCHAR(10) NULL,' +
            'Bairro VARCHAR(60) NULL,' +
            'Cidade VARCHAR(40) NULL,' +
            'Estado VARCHAR(2) NULL,' +
            'Telefone VARCHAR(45) NULL,' +
            'Email VARCHAR(80) NULL,' +
            'Site VARCHAR(120) NULL,' + 
            'PRIMARY KEY (Id))'
        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            } else {
                console.log('Tabela de Instituicoes criada com sucesso!')
            }
        })
    }

    CriarTurno(){
        const sql = 
        'CREATE TABLE IF NOT EXISTS Turno ('+
        '    Id INT NOT NULL AUTO_INCREMENT,' +
        '    Descricao VARCHAR(45) NOT NULL,' +
        '    DataCadastro DATETIME NOT NULL,' +
        '    PRIMARY KEY (Id))' 
        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de turno criada com sucesso')
            }
        })
    }

    CriarNivel(){
        const sql = 
        'CREATE TABLE IF NOT EXISTS Nivel ('+
        '    Id INT NOT NULL AUTO_INCREMENT,'+
        '    Descricao VARCHAR(60) NOT NULL,'+
        '    DataCadastro DATETIME NOT NULL,'+
        '    PRIMARY KEY (Id))'
        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Nível criada com sucesso')
            }
        })        
    }

    CriarCategoriaPessoa(){
        const sql =         
        'CREATE TABLE IF NOT EXISTS CategoriaPessoa ('+
        '    Id INT NOT NULL AUTO_INCREMENT ,'+
        '    Categoria VARCHAR(45) NOT NULL,'+
        '    PRIMARY KEY (Id))'
        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Categoria de pessoas criada com sucesso')
            }
        })           
    }

    CriarTipoDocumento(){
        const sql =  
        'CREATE TABLE IF NOT EXISTS TipoDocumento (' +
        '    Id INT NOT NULL AUTO_INCREMENT,'+
        '    Documento VARCHAR(20) NOT NULL,'+
        '    PRIMARY KEY (Id))'

        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Tipo de documento criada com sucesso')
            }
        })           
    }

    CriarDisciplinas(){
        const sql = 
        'CREATE TABLE IF NOT EXISTS Disciplinas ('+
        '    Id INT NOT NULL AUTO_INCREMENT,'+
        '    Nome VARCHAR(80) NULL,'+
        '    Descricao VARCHAR(255) NULL,'+
        '    PRIMARY KEY (Id))'

        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Disciplinas criada com sucesso')
            }
        })        
    }

    CriarAnoLetivo(){
        const sql = 
        'CREATE TABLE IF NOT EXISTS AnoLetivo ('+
        '    Id YEAR(4) NOT NULL,'+
        '    PrimeiroSemestreInicio DATETIME NULL,'+
        '    PrimeiroSemestreTermino DATETIME NULL,'+
        '    SegundoSemestreInicio DATETIME NULL,'+
        '    SegundoSemestreTermino DATETIME NULL,'+
        '    PRIMARY KEY (Id))'

        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Ano letivo criada com sucesso')
            }
        })        
    }

    //Tabelas com dependência ligações foreignKey
    CriarSalas(){
        const sql = 
        'CREATE TABLE IF NOT EXISTS Salas ('+
        '    Id INT NOT NULL AUTO_INCREMENT,'+
        '    Identificador VARCHAR(10) NOT NULL,'+
        '    Descricao VARCHAR(45) NULL,'+
        '    DataCadastro DATETIME NOT NULL,'+
        '    TipoDeSala VARCHAR(45) NOT NULL,'+
        '    Capacidade INT NOT NULL,'+
        '    InstituicaoId INT NOT NULL,'+
        '    PRIMARY KEY (Id),'+
        '    INDEX FKSalas_Instituicao_idx (InstituicaoId ASC) VISIBLE,'+
        '    CONSTRAINT FKSalas_Instituicao'+
        '      FOREIGN KEY (InstituicaoId)'+
        '      REFERENCES Instituicoes (Id)'+
        '      ON DELETE NO ACTION'+
        '      ON UPDATE NO ACTION)'

        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Salas criada com sucesso')
            }
        })
    }
    
    CriarTurmas(){
        const sql =         
        'CREATE TABLE IF NOT EXISTS Turma ('+
        '    Id INT NOT NULL AUTO_INCREMENT,'+
        '    Descricao VARCHAR(45) NOT NULL,'+
        '    Identificador VARCHAR(5) NOT NULL,'+
        '    DataCadastro DATETIME NOT NULL,'+
        '    TurnoId INT NOT NULL,'+
        '    PRIMARY KEY (Id),'+
        '    INDEX fk_Turma_Turno1_idx (TurnoId ASC) VISIBLE,'+
        '    CONSTRAINT fk_Turma_Turno1'+
        '      FOREIGN KEY (TurnoId)'+
        '      REFERENCES Turno (Id)'+
        '      ON DELETE NO ACTION'+
        '      ON UPDATE NO ACTION)'

        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Turma criada com sucesso')
            }
        })                
    }
    
    CriarSeries(){
        const sql = 
        'CREATE TABLE IF NOT EXISTS Series ('+
        '    Id INT NOT NULL AUTO_INCREMENT,'+
        '    Identificador VARCHAR(10) NOT NULL,'+
        '    Descricao VARCHAR(250) NULL,'+
        '    DataCadastro DATETIME NOT NULL,'+
        '    NivelId INT NOT NULL,'+
        '    PRIMARY KEY (Id),'+
        '    INDEX fk_Series_Nivel1_idx (NivelId ASC) VISIBLE,'+
        '    CONSTRAINT fk_Series_Nivel1'+
        '      FOREIGN KEY (NivelId)'+
        '      REFERENCES Nivel (Id)'+
        '      ON DELETE NO ACTION'+
        '      ON UPDATE NO ACTION)'

        this.conexao.query(sql, erro =>{
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Series criada com sucesso')
            }
        })
    }
    
    CriarPessoas(){
        const query = sql`
            CREATE TABLE IF NOT EXISTS Pessoas (
            Id INT NOT NULL AUTO_INCREMENT,
            Nome VARCHAR(100) NOT NULL,
            Cpf VARCHAR(18) NULL,
            DataNascimento DATETIME NOT NULL,
            Sexo CHAR(1) NOT NULL,
            Nacionalidade VARCHAR(60) NULL,
            Naturalidade VARCHAR(60) NULL,
            CategoriaPessoaId INT NOT NULL,
            PessoasPaiId INT NULL,
            PessoasMaeId INT NULL,
            PRIMARY KEY (Id),
            INDEX fk_Pessoas_CategoriaPessoa1_idx (CategoriaPessoaId ASC) VISIBLE,
            INDEX fk_Pessoas_Pessoas1_idx (PessoasPaiId ASC) VISIBLE,
            INDEX fk_Pessoas_Pessoas2_idx (PessoasMaeId ASC) VISIBLE,
            CONSTRAINT fk_Pessoas_CategoriaPessoa1
                FOREIGN KEY (CategoriaPessoaId)
                REFERENCES CategoriaPessoa (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT fk_Pessoas_Pessoas1
                FOREIGN KEY (PessoasPaiId)
                REFERENCES Pessoas (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT fk_Pessoas_Pessoas2
                FOREIGN KEY (PessoasMaeId)
                REFERENCES Pessoas (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION)`;  

        this.conexao.query(query, erro =>{
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Pessoas criada com sucesso')
            }                  
        })    
    }

    CriarDocumentacao(){
        const query = sql`
            CREATE TABLE IF NOT EXISTS Documentacao (
            Id INT NOT NULL AUTO_INCREMENT,
            TipoDocumento VARCHAR(45) NOT NULL,
            Numero VARCHAR(45) NOT NULL,
            Observacao VARCHAR(45) NULL,
            TipoDocumentoId INT NOT NULL,
            PessoasId INT NOT NULL,
            PRIMARY KEY (Id),
            INDEX fk_Documentacao_TipoDocumento1_idx (TipoDocumentoId ASC) VISIBLE,
            INDEX fk_Documentacao_Pessoas1_idx (PessoasId ASC) VISIBLE,
            CONSTRAINT fk_Documentacao_TipoDocumento1
                FOREIGN KEY (TipoDocumentoId)
                REFERENCES TipoDocumento (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT fk_Documentacao_Pessoas1
                FOREIGN KEY (PessoasId)
                REFERENCES Pessoas (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION)
        `;
        this.conexao.query(query, erro =>{
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Documentação criada com sucesso')
            }                  
        })         
    }

    CriarEndereco(){
        const query = sql`
            CREATE TABLE IF NOT EXISTS Enderecos (
            Id INT NOT NULL AUTO_INCREMENT,
            Cep VARCHAR(12) NULL,
            Endereco VARCHAR(80) NOT NULL,
            Complemento VARCHAR(45) NULL,
            Bairro VARCHAR(45) NOT NULL,
            Cidade VARCHAR(45) NOT NULL,
            Estado VARCHAR(45) NOT NULL,
            PessoasId INT NOT NULL,
            PRIMARY KEY (Id),
            INDEX fk_Enderecos_Pessoas1_idx (PessoasId ASC) VISIBLE,
            CONSTRAINT fk_Enderecos_Pessoas1
                FOREIGN KEY (PessoasId)
                REFERENCES Pessoas (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION)        
        `;
        this.conexao.query(query, erro =>{
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Endereço criada com sucesso')
            }                  
        })         
    }

    CriarTelefones(){
        const query = sql`
            CREATE TABLE IF NOT EXISTS Telefones (
            Id INT NOT NULL AUTO_INCREMENT,
            DD VARCHAR(5) NULL ,
            Numero VARCHAR(15) NULL ,
            Tipo VARCHAR(45) NULL,
            PessoasId INT NOT NULL,
            PRIMARY KEY (Id),
            INDEX fk_Telefones_Pessoas1_idx (PessoasId ASC) VISIBLE,
            CONSTRAINT fk_Telefones_Pessoas1
                FOREIGN KEY (PessoasId)
                REFERENCES Pessoas (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION)
        `;

        this.conexao.query(query, erro =>{
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Telefones criada com sucesso')
            }                  
        })         
    }

    CriarAlunos(){
        const query = sql`
            CREATE TABLE IF NOT EXISTS Aluno (
            Id INT NOT NULL AUTO_INCREMENT,
            EscolaOrigem VARCHAR(150) NULL,
            Bolsa VARCHAR(45) NULL,
            PessoasId INT NOT NULL,
            PRIMARY KEY (Id),
            INDEX fk_Aluno_Pessoas1_idx (PessoasId ASC) VISIBLE,
            CONSTRAINT fk_Aluno_Pessoas1
                FOREIGN KEY (PessoasId)
                REFERENCES Pessoas (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION)
        `;
        this.conexao.query(query, erro =>{
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Aluno criada com sucesso')
            }                  
        })         
    }
    
    CriarGradeCurricular(){
        const query = sql`
            CREATE TABLE IF NOT EXISTS GradeCurricular (
            Id INT NOT NULL AUTO_INCREMENT,
            DisciplinasId INT NOT NULL,
            AnoLetivoId YEAR(4) NOT NULL,
            SeriesId INT NOT NULL,
            PRIMARY KEY (Id),
            INDEX fk_GradeCurricular_Disciplinas1_idx (DisciplinasId ASC) VISIBLE,
            INDEX fk_GradeCurricular_AnoLetivo1_idx (AnoLetivoId ASC) VISIBLE,
            INDEX fk_GradeCurricular_Series1_idx (SeriesId ASC) VISIBLE,
            CONSTRAINT fk_GradeCurricular_Disciplinas1
                FOREIGN KEY (DisciplinasId)
                REFERENCES Disciplinas (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT fk_GradeCurricular_AnoLetivo1
                FOREIGN KEY (AnoLetivoId)
                REFERENCES AnoLetivo (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT fk_GradeCurricular_Series1
                FOREIGN KEY (SeriesId)
                REFERENCES Series (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION)
        `;
        this.conexao.query(query, erro =>{
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Grade curricular criada com sucesso')
            }                  
        }) 
    }

    CriarMatriculas(){
        const query = sql`
            CREATE TABLE IF NOT EXISTS Matricula (
            AlunoId INT NOT NULL AUTO_INCREMENT,
            AnoLetivoId YEAR(4) NOT NULL,
            Descricao VARCHAR(255) NULL,
            SalaId INT NOT NULL,
            SeriesId INT NOT NULL,
            TurmaId INT NOT NULL,
            GradeCurricularId INT NOT NULL,
            INDEX FKSalas_AnoLetivo_idx (SalaId ASC) VISIBLE,
            PRIMARY KEY (AlunoId, AnoLetivoId),
            INDEX fk_AnosLetivo_Turma1_idx (TurmaId ASC) VISIBLE,
            INDEX fk_Matricula_Aluno1_idx (AlunoId ASC) VISIBLE,
            INDEX fk_Matricula_AnoLetivo1_idx (AnoLetivoId ASC) VISIBLE,
            INDEX fk_Matricula_GradeCurricular1_idx (GradeCurricularId ASC) VISIBLE,
            CONSTRAINT FKSalas_AnoLetivo
                FOREIGN KEY (SalaId)
                REFERENCES Salas (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT fk_AnosLetivo_Series1
                FOREIGN KEY (SeriesId)
                REFERENCES Series (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT fk_AnosLetivo_Turma1
                FOREIGN KEY (TurmaId)
                REFERENCES Turma (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT fk_Matricula_Aluno1
                FOREIGN KEY (AlunoId)
                REFERENCES Aluno (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT fk_Matricula_AnoLetivo1
                FOREIGN KEY (AnoLetivoId)
                REFERENCES AnoLetivo (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT fk_Matricula_GradeCurricular1
                FOREIGN KEY (GradeCurricularId)
                REFERENCES GradeCurricular (Id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION)
        `;
        this.conexao.query(query, erro =>{
            if(erro){
                console.log(erro)
            }else {
                console.log('Tabela de Matriculas criada com sucesso')
            }                  
        })         
    }
    





}

module.exports = new Tabelas