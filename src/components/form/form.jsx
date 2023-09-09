import { useState } from "react";
import Botao from "../botao/botao";
import Input from "../inputs/input";

export default function Form() {
    const envia = (categoria, link, nome, msg, chave) => {
        // Defina as informações do repositório e do arquivo
        const owner = 'Greisonboff'; // Substitua pelo nome do proprietário do repositório
        const repo = 'data-center'; // Substitua pelo nome do repositório
        const pathToFile = 'certificate.json'; // Substitua pelo caminho para o arquivo JSON
        const token = chave; // Substitua pelo seu token de acesso pessoal

        // Construa a URL da API do GitHub
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${pathToFile}`;

        // Faça uma solicitação GET para obter o conteúdo atual do arquivo
        const xhr = new XMLHttpRequest();
        xhr.open('GET', apiUrl, true);
        xhr.setRequestHeader('Authorization', `token ${token}`);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    const currentContent = JSON.parse(decodeURIComponent(escape(atob(response.content))));
                    //console.log(currentContent)

                    // Modifique o conteúdo do arquivo conforme necessário
                    var dataAdd = {categoria: categoria,link: link,nome_curso: nome};
                    currentContent.unshift(dataAdd);
                    
                    console.log(currentContent)
                    // Construa os dados para a atualização
                    const newData = {
                        message: msg,
                        content: btoa(unescape(encodeURIComponent(JSON.stringify(currentContent)))),
                        sha: response.sha // Inclua o SHA atual do arquivo
                    };

                    // Faça uma solicitação PUT para atualizar o arquivo
                    const updateXhr = new XMLHttpRequest();
                    updateXhr.open('PUT', apiUrl, true);
                    updateXhr.setRequestHeader('Authorization', `token ${token}`);
                    updateXhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

                    updateXhr.onreadystatechange = function () {
                        if (updateXhr.readyState === 4) {
                            if (updateXhr.status === 200) {
                                console.log('Arquivo JSON atualizado com sucesso:', JSON.parse(updateXhr.responseText));
                            } else {
                                console.error('Erro ao atualizar o arquivo JSON:', updateXhr.status, updateXhr.statusText);
                            }
                        }
                    };

                    updateXhr.send(JSON.stringify(newData));
                } else {
                    console.error('Erro ao buscar o arquivo JSON:', xhr.status, xhr.statusText);
                }
            }
        };

        xhr.send();

    }

    const [categoria, setCategoria] = useState('')
    const [link, setLink] = useState('')
    const [nome, setNome] = useState('')
    const [chave, setChave] = useState('')
    const [msg, setMsg] = useState('')

    const salvarInfo = () => {
        event.preventDefault();
        envia(categoria, link, nome, msg, chave)
        console.log(categoria)
        console.log(link)
        console.log(nome)
        console.log(chave)
        setCategoria('')
        setLink('')
        setNome('')
        setMsg('')
        //setChave('')
    }

    return (
        <form onSubmit={salvarInfo} className="flex flex-col h-auto sm:h-4/5 md:h-4/5 lg:h-4/5 lg:w-5/5 w-auto bg-red-500 p-9 rounded-lg">
            <Input valor={categoria} aoAlterado={valor => setCategoria(valor)} type='text' placeholder='Categoria do curso' />
            <Input valor={link} aoAlterado={valor => setLink(valor)} type='text' placeholder='Link certificação' />
            <Input valor={nome} aoAlterado={valor => setNome(valor)} type='text' placeholder='Nome do curso' />
            <Input valor={msg} aoAlterado={valor => setMsg(valor)} type='text' placeholder='Mensegem de atualização da versão' />
            <Input valor={chave} aoAlterado={valor => setChave(valor)} type='text' placeholder='Chave de acesso' />
            <Botao texto='Salvar' />
        </form>
    )
}