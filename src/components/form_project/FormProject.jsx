import { useState } from "react";
import Botao from "../botao/botao";
import Input from "../inputs/Input";
import TituloForm from "../title_from/TituloFrom";
import axios from 'axios';
import Texto from "../texto/Texto";

export default function FormProject() {
    const envia = (descricao, link, nome, img, msg, chave) => {
        // Defina as informações do repositório e do arquivo
        const owner = 'Greisonboff'; // Substitua pelo nome do proprietário do repositório
        const repo = 'data-center'; // Substitua pelo nome do repositório
        const pathToFile = 'projetos.json'; // Substitua pelo caminho para o arquivo JSON
        const token = chave; // Substitua pelo seu token de acesso pessoal

        // Construa a URL da API do GitHub
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${pathToFile}`;

        const headers = {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',// Exemplo de cabeçalho de tipo de conteúdo
            // Outros cabeçalhos personalizados, se necessário
        };

        // Objeto de configuração da requisição
        const config = {
            headers: headers,
            // Outras opções de configuração, como method, data, params, etc.
        };

        axios.get(apiUrl, config)
            .then((response) => {
                const currentContent = JSON.parse(decodeURIComponent(escape(atob(response.data.content))));

                // Modifique o conteúdo do arquivo conforme necessário
                var dataAdd = { nome_projeto: nome, descricao: descricao, link: link, caminho_imagem: img }
                currentContent.unshift(dataAdd);

                // Construa os dados para a atualização
                const newData = {
                    message: msg,
                    content: btoa(unescape(encodeURIComponent(JSON.stringify(currentContent)))),
                    sha: response.data.sha // Inclua o SHA atual do arquivo
                };

                // Faça uma solicitação PUT para atualizar o arquivo
                axios.put(apiUrl, JSON.stringify(newData), { headers })
                    .then((response) => {
                        //console.log(response)
                    })
                    .catch((error) => {
                        console.error('Erro:', error);
                    });
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    }

    const [descricao, setDescricao] = useState('')
    const [link, setLink] = useState('')
    const [nome, setNome] = useState('')
    const [chave, setChave] = useState('')
    const [msg, setMsg] = useState('')
    const [img, setImg] = useState('')

    const salvarInfoProjeto = () => {
        event.preventDefault();
        envia(descricao, link, nome, img, msg, chave)
        //setDescricao('')
        //setLink('')
        //setNome('')
        //setMsg('')
        //setImg('')
        //setChave('')
    }

    return (
        <form onSubmit={salvarInfoProjeto} className="shadow-white shadow flex flex-col h-full lg:w-5/5 w-auto bg-transparent p-9 rounded-lg m-2 lg:m-5">
            <TituloForm titulo={'Cadastrar novo projeto'} />
            <Input valor={nome} aoAlterado={valor => setNome(valor)} type='text' placeholder='Nome do projeto' />
            <Input valor={link} aoAlterado={valor => setLink(valor)} type='text' placeholder='Link do projeto' />
            <Texto valor={descricao} aoAlterado={valor => setDescricao(valor)} type='text' placeholder='Descição do projeto' />
            <Input valor={img} aoAlterado={valor => setImg(valor)} type='text' placeholder='Caminho das imagens' />
            <Input valor={msg} aoAlterado={valor => setMsg(valor)} type='text' placeholder='Mensegem de atualização da versão' />
            <Input valor={chave} aoAlterado={valor => setChave(valor)} type='text' placeholder='Chave de acesso' />
            <Botao texto='Salvar' />
        </form>
    )
}