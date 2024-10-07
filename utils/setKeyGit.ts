export function getDataKey() {
  const chaveLocal = localStorage.getItem("chave_de_acesso_github");
  if (chaveLocal != null) {
    return chaveLocal;
  } else {
    return "";
  }
}

export function setDataKey(chave: string) {
  localStorage.setItem("chave_de_acesso_github", chave);
}
