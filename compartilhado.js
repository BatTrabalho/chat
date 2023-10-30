/**
 * @returns {{nome: string, users: Array<string>, mensagens: Array<{conteudo: string, usuario: string, dataDeEnvio: number}>}}
 */
function pegarSala(nomeDaSala) {
  const texto = localStorage.getItem(nomeDaSala);

  if (texto) {
    const objeto = JSON.parse(texto);

    return objeto;
  }

  return null;
}

function atualizarSala(nomeDaSala, sala) {
  const texto = JSON.stringify(sala);

  localStorage.setItem(nomeDaSala, texto);
}
