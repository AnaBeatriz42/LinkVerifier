// Criando a CLI para permitir a utilização da biblioteca pelo terminal
import pegaArquivo from "./index.js"
import chalk from 'chalk';
import fs from 'fs';
import listValidada from './http-validacao.js'

const caminho = process.argv

//retornando para o terminal o processamento
async function imprimindo(valida, results, identificador = '') {
     if (valida) {
          console.log(
               chalk.yellow("Lista Validada"),
               chalk.black.bgGreen(identificador),
              await listValidada(results));

     } else {
          console.log(
               chalk.yellow("Lista de Links"),
               chalk.black.bgGreen(identificador),
               results);
     }
}


// Tratando caso o usuario insira um caminho ou um diretory
async function processTexto(argumento) {
     const path = argumento[2]
     const valida = argumento[3] === '--valida'

     try {
          fs.lstatSync(path)// verificando o caminho
          if (fs.lstatSync(path).isFile()) {
               const retorno = await pegaArquivo(path)
               imprimindo(valida,retorno)
          } else if (fs.lstatSync(path).isDirectory()) {
               const arquivos = await fs.promises.readdir(path)
               arquivos.forEach(async (nome) => {
                    const lista = await pegaArquivo(`${path}/${nome}`)
                    imprimindo(valida,lista, nome)
               })
          }
     } catch (erro) {
          if (erro.code == 'ENOENT') {
               console.log("Arquivo ou diretorio não existe")
               return
          }
     }

}

processTexto(caminho)

