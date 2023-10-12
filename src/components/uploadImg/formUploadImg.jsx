import { useEffect, useState } from "react";
import Botao from "../botao/botao";
import InputElement from "../inputs/InputElement";
import TituloForm from "../titleFrom/TituloFrom";
import axios from 'axios';
import Imagem from "./Imagem";
import Loader from "../../load/Loader";
import Status from "../../status/Status";

export default function UpImg({ dataChave }) {
    const [chave, setChave] = useState(dataChave())
    const [img, setImg] = useState('')
    const [load, setLoad] = useState('')
    const [retorno, setRetorno] = useState('')

    const uploadImage = (imgTxt, tk) => {
        event.preventDefault();
        const token = tk;
        const username = 'Greisonboff';
        const repoName = 'data-center';
        const fileInput = document.getElementById('imageInput').files;

        if (fileInput.length === 0) {
            console.log('Selecione pelo menos uma imagem para enviar.');
            setRetorno('Selecione pelo menos uma imagem para enviar.');
            return;
        }

        // Loop sobre cada arquivo selecionado

        //Array.from(fileInput).forEach((file, index) => {
        const send = (file, index, imgTxt) => {
            let txt = imgTxt + index;
            let apiUrl = `https://api.github.com/repos/${username}/${repoName}/contents/imagens/${txt + '.png'}`;
            let reader = new FileReader();

            reader.onload = function (event) {
                let content = event.target.result.split(',')[1];
                let data = {
                    message: `Adicionar imagem ${imgTxt + index}`,
                    content: content,
                };

                axios.put(apiUrl, data, {
                    headers: {
                        'Authorization': `token ${token}`
                    },
                })
                    .then(function (response) {
                        console.log(response.status);
                        if (fileInput[index + 1]) {
                            send(fileInput[index + 1], index + 1, imgTxt);
                        } else {
                            localStorage.setItem('chave_de_acesso_github', token);
                            setLoad('')
                            setRetorno('Imagens enviadas com sucesso!')
                        }
                    })
                    .catch(function (error) {
                        // Lida com erros de requisição
                        console.error('Erro na requisição:', error);
                        setLoad('')
                        setRetorno('Erro tente novamente!')
                    });

            };

            reader.readAsDataURL(file);
        }
        if (fileInput) {
            send(fileInput[0], 0, imgTxt)
        }
    }

    const salvarInfoProjeto = () => {
        setLoad(true)
        event.preventDefault();
        uploadImage(img, chave)
        setImg('')
        //setChave('')
        setImgFiles([])
    }

    const [imgFiles, setImgFiles] = useState([])

    const mostraImagens = () => {
        const files = event.target.files;
        var fileGrup = [];
        for (let file of files) {
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    fileGrup.push(event.target.result);
                    if (fileGrup.length === files.length) {
                        setImgFiles(fileGrup)
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    }

    return (
        <>
            <form onSubmit={salvarInfoProjeto} className="shadow-black dark:shadow-white shadow flex flex-col w-full sm:w-2/3 bg-transparent p-5 pb-0 rounded-lg m-2 lg:m-5">
                <TituloForm titulo={'Carregar imagens'} />
                <label className="dark:bg-zinc-800 font-semibold bg-zinc-400 dark:text-slate-300 text-slate-900 m-6 h-16 w-2/3 mx-auto rounded-md flex justify-center items-center">
                    <input className="hidden" onChange={mostraImagens} type="file" id="imageInput" accept="image/*" multiple></input>
                    Adicionar imagens
                </label>
                <div className="flex flex-wrap justify-center">
                    {imgFiles.map((imagem, index) => (
                        <Imagem key={index} link={imagem} alt={`Imagem ${index}`} />
                    ))
                    }
                </div>
                {imgFiles.length > 0 ?
                    <>
                        <InputElement valor={img} aoAlterado={valor => setImg(valor)} type='text' placeholder='Nome das imagens' />
                        <InputElement valor={chave} aoAlterado={valor => setChave(valor)} type='text' placeholder='Chave de acesso' />
                        <Botao texto='Salvar' />
                    </>
                    : ''}
                {load == true ? <Loader /> : ''}
                {retorno != '' ? <Status estado={setRetorno} retorno={retorno} /> : ''}
            </form>
            <div className="h-5 w-full bg-transparent"></div>
        </>
    )
}