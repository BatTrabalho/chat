const listaDeSalas = document.getElementById('lista-de-salas');
const inputDoNomeDeUsuario = document.getElementById('nome-de-usuario');
const inputDoNomeDaSala = document.getElementById('nome-da-sala');
const divDeInformacao = document.getElementById('informacao');

atualizarListaDeSalas();
setInterval(atualizarListaDeSalas, 2000);

function atualizarListaDeSalas() {
  listaDeSalas.innerHTML = '';

  for (let i = 0; i < localStorage.length; i++) {
    const nomeDaSala = localStorage.key(i);

    const sala = pegarSala(nomeDaSala);

    listaDeSalas.innerHTML += `
      <li>
        <span>${sala.nome}</span>
        <button type="button" onclick="entrarNaSala('${sala.nome}')">Entrar</button>
      </li>
    `;
  }
}

function entrarNaSala(nomeDaSala) {
  const nomeDeUsuario = inputDoNomeDeUsuario.value;

  if (nomeDeUsuario) {
    if (salaExiste(nomeDaSala)) {
      if (usuarioEstaNaSala(nomeDaSala, nomeDeUsuario) === false) {
        adicionarUsuarioNaSala(nomeDaSala, nomeDeUsuario);
        location.href = `sala.html?nomeDaSala=${nomeDaSala}&nomeDeUsuario=${nomeDeUsuario}`;
      } else {
        divDeInformacao.innerText = 'Este nome de usuário já está em uso.';
      }
    }
  }
}

function criarEEntrarNaSala() {
  const nomeDeUsuario = inputDoNomeDeUsuario.value;
  const nomeDaSala = inputDoNomeDaSala.value;

  if (nomeDeUsuario && nomeDaSala) {
    if (salaExiste(nomeDaSala)) {
      divDeInformacao.innerText = 'Já existe uma sala com este nome.';
    } else {
      criarSala(nomeDaSala);
      adicionarUsuarioNaSala(nomeDaSala, nomeDeUsuario);
      location.href = `sala.html?nomeDaSala=${nomeDaSala}&nomeDeUsuario=${nomeDeUsuario}`;
    }
  }
}

function salaExiste(nomeDaSala) {
  const sala = pegarSala(nomeDaSala);

  if (sala) {
    return true;
  } else {
    return false;
  }
}

function criarSala(nomeDaSala) {
  const objeto = {
    nome: nomeDaSala,
    users: [],
    mensagens: [],
  };

  atualizarSala(nomeDaSala, objeto);
}

function adicionarUsuarioNaSala(nomeDaSala, nomeDeUsuario) {
  const sala = pegarSala(nomeDaSala);

  if (sala) {
    if (usuarioEstaNaSala(nomeDeUsuario) === false) {
      sala.users.push(nomeDeUsuario);

      atualizarSala(nomeDaSala, sala);
    }
  }
}

function usuarioEstaNaSala(nomeDaSala, nomeDeUsuario) {
  const sala = pegarSala(nomeDaSala);

  if (sala) {
    return sala.users.includes(nomeDeUsuario);
  }

  return false;
}
