import { useState } from "react";
import Botao_navegacao from "../botao_navegacao/Botao_navegacao";
import axios from "axios";
import Input from "../inputs/Input";

export default function Listas() {
    const [texto, setTexto] = useState([]);
    const [textoP, setTextoP] = useState([]);
    const [chave, setChave] = useState('')

    const pega = (chave, ativador) => {
        // Defina as informações do repositório e do arquivo
        const owner = 'Greisonboff'; // Substitua pelo nome do proprietário do repositório
        const repo = 'data-center'; // Substitua pelo nome do repositório
        const pathToFile = ativador === "Listar certificados" ? 'certificate.json' : 'projetos.json'; // Substitua pelo caminho para o arquivo JSON
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
                if (ativador === "Listar certificados") {
                    setTexto(currentContent)
                    setTextoP([])
                } else {
                    setTextoP(currentContent)
                    setTexto([])
                }
                console.log(decodeURIComponent(escape(atob(response.data.content))))
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    }
    const ativaPega = () => {
        console.log(event.target.innerText)
        //pega(chave);
        pega('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', event.target.innerText);
    }
    return (
        <div className="flex flex-col w-full sm:w-3/5 lg:w-3/5 px-8">
            <div>
                <div className="break-all flex justify-center">
                    <Botao_navegacao funcao={ativaPega} text="Listar certificados" />
                    <Botao_navegacao funcao={ativaPega} text="Listar projetos" />
                </div>
                <div className="break-all flex flex-col justify-center">
                    <Input valor={chave} aoAlterado={valor => setChave(valor)} type='text' placeholder='Chave de acesso' />
                </div>
            </div>
            <div className="break-all">
                {texto.map(item =>
                    <>
                        <ul key={item.nome_curso} className="flex flex-col m-1 ">
                            <li className="flex ">{item.categoria}</li>
                            <li className="flex ">{item.nome_curso}</li>
                            <li className="flex ">{item.link}</li>
                        </ul>
                        <hr className="" />
                    </>
                )}

                {textoP.map(item =>
                    <>
                        <ul key={item.nome_curso} className="flex flex-col m-1 ">
                            <li className="flex ">Projeto: {item.nome_projeto}</li>
                            <li className="flex ">Descrição: {item.descricao}</li>
                            <li className="flex ">Link da imagem: {item.caminho_imagem}</li>
                            <li className="flex ">Link do projeto: {item.link}</li>
                        </ul>
                        <hr className="" />
                    </>
                )}
            </div>
        </div>
    )
}