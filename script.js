document.getElementById('formAluno').addEventListener('submit', function(e) {
    e.preventDefault();
    cadastrarAluno();
  });
  
  function obterDados() {
    const nome = document.getElementById('nome').value.trim();
    const idade = parseInt(document.getElementById('idade').value.trim());
    const curso = document.getElementById('curso').value.trim();
    const fase = parseInt(document.getElementById('fase').value.trim());
  
    if (!nome || isNaN(idade) || !curso || isNaN(fase)) {
      alert("Preencha todos os campos corretamente.");
      return null;
    }
  
    return { nome, idade, curso, fase };
  }
  
  function cadastrarAluno() {
    const aluno = obterDados();
    if (!aluno) return;
  
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    alunos.push(aluno);
    localStorage.setItem('alunos', JSON.stringify(alunos));
  
    atualizarLista();
    limparFormulario();
  }
  
  function atualizarLista() {
    const lista = document.getElementById('listaAlunos');
    lista.innerHTML = '';
  
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
  
    alunos.forEach((aluno, index) => {
      const li = document.createElement('li');
      li.textContent = `${aluno.nome} - ${aluno.idade} anos - ${aluno.curso} - ${aluno.fase}ª fase`;
      lista.appendChild(li);
    });
  }
  
  function limparFormulario() {
    document.getElementById('formAluno').reset();
  }
  
  function exportarDados() {
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(alunos, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "alunos.json");
    downloadAnchor.click();
  }
  
  // Inicializa lista ao carregar
  window.onload = atualizarLista;
  