describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
    cy.clearLocalStorage();
  });

  it('Deve desabilitar o botão de login quando os campos estiverem vazios', () => {
    // Verifica se o botão está desabilitado no início
    cy.get('#buttonLogin').should('be.disabled');
  });

  it('Deve adicionar um email no localstorage', () => {
    // Preencher o campo de email
    cy.get('input[formControlName="email"]').type('cida@teste123.com');

    // Preencher o campo de senha
    cy.get('input[formControlName="password"]').type('Teste@123');

    // Clica no checkbox lembrar email no localstorage
    cy.get('#rememberEmail').click();

    // Verifica se o checkbox está habilitado
    cy.get('#rememberEmail').should('not.be.disabled');

    // Verifica se o botão está habilitado
    cy.get('#buttonLogin').should('not.be.disabled');
  });

  it('Deve manter o botão desabilitado se apenas o campo de email for preenchido', () => {
    // Preenche o campo de email
    cy.get('[data-test=input-email]').type('usuario@example.com');

    // Verifica se o botão continua desabilitado
    cy.get('[data-test=login-button]').should('be.disabled');
  });

  it('Não deve salvar o email no localStorage se o checkbox não estiver marcado', () => {
    const email = 'luna@example.com';

    // Preenche o campo de email e senha
    cy.get('[data-test=input-email]').type(email);
    cy.get('input[formControlName="password"]').type('Luna123');

    // Deixa o checkbox desmarcado
    cy.get('#rememberEmail').uncheck();

    // Clica no botão de login
    cy.get('[data-test=login-button]').click();

    // Verifica se o email não foi salvo no localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem('email')).to.be.null;
    });
  });

  it('Deve exibir "Email obrigatório" após limpar o conteúdo do campo de email', () => {
    // Localiza o campo de senha pelo id, digita uma senha
    cy.get('#email').type('cidaluna@cypress.com');
    cy.get('#email').clear();
    cy.get('#email').blur(); // desfoca/sai do campo

    // Verifica se a mensagem de erro "Email obrigatório" é exibida
    cy.get('.msg__erro p').should('contain', 'Email obrigatório');
    cy.contains('Email obrigatório').should('be.visible'); // outra forma de verificar
  });

  it('Deve exibir "Senha obrigatória" após limpar o conteúdo do campo de senha', () => {
    cy.get('#password').type('minhaSenha123');
    cy.get('#password').clear();
    cy.get('#email').focus();

    // Verifica se a mensagem de erro "Senha obrigatória" é exibida
    cy.get('.msg__erro p').should('contain', 'Senha obrigatória');
    cy.contains('Senha obrigatória').should('be.visible'); // outra forma de verificar
  });

  it('Deve encontrar a frase "Não possui conta?" ', () => {
    cy.contains('span', 'Não possui conta?').should('be.visible');
  });

  it('Deve encontrar o botão "Registre-se aqui" habilitado', () => {
    cy.get('span').contains('button', 'Registre-se aqui').should('be.visible');

    // Depurar o botao de Registre-se aqui
    cy.get('#btnRegistry').then(($btn) => {
      cy.log('Botão encontrado:', $btn);
      expect($btn).to.be.visible; // Verifica se está visível
    });

    cy.get('#btnRegistry').should('be.enabled');
  });

  it('Deve navegar para a página books se usuário e senha estiverem corretos', () => {
    cy.get('#email').type('cida@luna.com');
    cy.get('#password').type('1234!');
    cy.get('#buttonLogin').click();
    cy.url().should('include', '/books'); // Confirma que a navegação ocorreu
  });

  it('Deve ver o botão mesmo em telas de celular', () => {
    cy.viewport('iphone-6'); // Simula iPhone 6
    cy.get('#buttonLogin').should('be.visible');
  });

  it('Deve ver o botão mesmo em telas macbook', () => {
    cy.viewport('macbook-13');
    cy.get('#buttonLogin').should('be.visible');
  });

  it('Deve se ajustar corretamente para dispositivos móveis 375px', () => {
    // Testa em um tamanho de tela mobile (375px)
    cy.viewport(375, 667); // Tamanho típico de um iPhone 6/7/8
    //cy.get('h1').should('be.visible');
    //cy.get('form').should('be.visible');
    cy.get('nav').should('be.visible'); // Verifica se o menu de navegação está visível no mobile
    cy.get('.navbar-toggler').click();
    // Verifica se o menu foi aberto
    cy.get('.navbar-collapse').should('have.class', 'show'); // Verifica que o menu agora tem a classe 'show'

    // Clica novamente no botão hambúrguer para fechar o menu
    cy.get('.navbar-toggler').click();

    // Verifica se o menu foi fechado
    cy.get('.navbar-collapse').should('not.have.class', 'show');
  });

  it('Deve se ajustar corretamente para dispositivos móveis 768px', () => {
    cy.viewport(768, 1024);
    cy.get('nav').should('be.visible');
    cy.get('.navbar-toggler').click();
    cy.get('.navbar-collapse').should('have.class', 'show');
    cy.get('.navbar-toggler').click();
    cy.get('.navbar-collapse').should('not.have.class', 'show');
  });
});
