const divDeInformacao = document.getElementById('informacao');
const listaDeMensagens = document.getElementById('lista-de-mensagens');
const inputDeMensagem = document.getElementById('mensagem');

const parametros = new URLSearchParams(location.search);
const nomeDaSala = parametros.get('nomeDaSala');
const nomeDeUsuario = parametros.get('nomeDeUsuario');

divDeInformacao.innerHTML = `Usuário: ${nomeDeUsuario}<br>Sala: ${nomeDaSala}`;
document.title = `${nomeDeUsuario} — ${nomeDaSala}`;

atualizarListaDeMensagens();
setInterval(atualizarListaDeMensagens, 2000);

function atualizarListaDeMensagens() {
  const sala = pegarSala(nomeDaSala);

  if (sala) {
    listaDeMensagens.innerHTML = '';

    for (const mensagem of sala.mensagens) {
      listaDeMensagens.innerHTML += `
        <div class="mensagem">
          <div class="conteudo">${mensagem.conteudo}</div>
          <span class="usuario">${mensagem.usuario}</span> •
          <span class="data-de-envio">${new Date(mensagem.dataDeEnvio)}</span>
        </div>
      `;
    }
  }
}

function sairDaSala() {
  const sala = pegarSala(nomeDaSala);

  if (sala) {
    const index = sala.users.findIndex((usuario) => usuario === nomeDeUsuario);

    if (index >= 0) {
      sala.users.splice(index, 1);
    }

    atualizarSala(nomeDaSala, sala);

    if (sala.users.length === 0) {
      localStorage.removeItem(nomeDaSala);
    }
  }

  location.href = 'entrada.html';
}

function enviarMensagem() {
  if (inputDeMensagem.value) {
    const sala = pegarSala(nomeDaSala);

    if (sala) {
      const mensagem = {
        usuario: nomeDeUsuario,
        conteudo: inputDeMensagem.value,
        dataDeEnvio: Date.now(),
      };

      sala.mensagens.push(mensagem);

      atualizarSala(nomeDaSala, sala);
    }

    inputDeMensagem.value = '';

    atualizarListaDeMensagens();
  }

  return false;
}
