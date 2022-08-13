// SELECTORS
const loginEmail = document.querySelector('#inputEmail');
const loginPassword = document.querySelector('#inputPass');
const loginButton = document.querySelector('#loginButton');
const agreeCheck = document.querySelector('#agreement');
const evaluationSubmitButton = document.querySelector('#submit-btn');
const textarea = document.querySelector('textarea');
const paraCounter = document.querySelector('#counter');
const submitButton = document.querySelector('#submit-btn');
const main = document.querySelector('main');
const data = document.querySelector('#form-data');

// INPUT TO PRINT SELECTORS
const printName = document.querySelector('#input-name');
const printLastname = document.querySelector('#input-lastname');
const printEmail = document.querySelector('#input-email');
const printHouse = document.querySelector('#house');
const printFamily = document.querySelectorAll('[name=family]');
const printSubject = document.querySelectorAll('.subject');
const printRate = document.querySelectorAll('[name=rate]');
const printTextarea = document.querySelector('#textarea');

// FUNCTIONS
// Funcao que compara email e senha e retorna true ou false
const compareData = (loginInputed, passInputed) =>
  loginInputed === loginEmail.value && passInputed === loginPassword.value;

// Funcao que observa se o check esta marcado e retorna true ou falso
const toggler = (toggle) => {
  const checkState = toggle.checked;
  return checkState;
};

// Funcao que valida o login com base no email e senha digitados nos inputs
const validateLogin = (e) => {
  const email = 'tryber@teste.com';
  const password = '123456';

  // Previne que a tela seja recarregada e a informacao perdida
  e.preventDefault();

  // Regra de negocio com base na comparacao entro dado inputado e registrado
  if (compareData(email, password)) {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
};

// Funcao que observa e habilita o botao de enviar
const validateCheck = (e) => {
  if (toggler(e.target)) {
    evaluationSubmitButton.disabled = false;
  } else {
    evaluationSubmitButton.disabled = true;
  }
};

// Funcao que conta os caracteres restante do campo 'textarea'
const countChar = (e) => {
  paraCounter.innerText = 500 - e.target.value.length;
};

// Funcao que faz o tratamento dos elemento do tipo Node e retorna uma string pronta
const cleanerNode = (input) => {
  let temp = '';

  input.forEach((value) => {
    if (value.checked === true) {
      temp += `${value.nextElementSibling.innerText}, `;
    }
  });
  return temp.substring(0, temp.length - 2);
};

// Funcao que organiza como a funcao printInfo ira funcionar, recebendo os paramentos de elemento pai e elemento filho que sera criado junto com o seu conteudo tambem passado por parametro
const append = (parent, content) => {
  const para = document.createElement('p');
  para.innerHTML = content;
  parent.append(para);
};

// Funcao que cria os elementos do tipo paragrafo e atribui os valores do objeto com os dados do formulario
const printInfos = (obj) => {
  append(data, `Nome: ${obj.nome} ${obj.sobrenome}`);
  append(data, `Email: ${obj.email}`);
  append(data, `Casa: ${obj.casa}`);
  append(data, `Família: ${obj.familia}`);
  append(data, `Matérias: ${obj.materias}`);
  append(data, `Avaliação: ${obj.avaliacao}`);
  append(data, `Observações: ${obj.observacoes}`);
};

// Funcao que recebe os valores para serem salvos no objeto e redireciona os dados que sao necessario limpeza
const cleanInfos = (e) => {
  e.preventDefault();

  const printObject = {
    nome: printName.value,
    sobrenome: printLastname.value,
    email: printEmail.value,
    casa: printHouse.value,
    familia: cleanerNode(printFamily),
    materias: cleanerNode(printSubject),
    avaliacao: cleanerNode(printRate),
    observacoes: printTextarea.value,
  };

  main.classList.toggle('is-hidden');
  data.classList.toggle('is-hidden');
  printInfos(printObject);
};

// EVENTS
loginButton.addEventListener('click', validateLogin);
agreeCheck.addEventListener('change', validateCheck);
textarea.addEventListener('input', countChar);
submitButton.addEventListener('click', cleanInfos);
