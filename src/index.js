// nova sintaxe de exportação baseada no ECMAScript para isso é necessario add  "type":"module" no package.json
import chalk from 'chalk';
import fs from 'fs';


function pegaLinks(texto) {
     const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
     const capturas = [...texto.matchAll(regex)]
     const links = capturas.map(captura => ({
          [captura[1]]: captura[2]
     }))
     // console.log(links)
     return links.length!=0 ? links : 'Não existe links no arquivo'
}


function trataErros(erro) {
     throw new Error(chalk.red(erro.code, "Não ha arquivo no diretorio"))
}

async function pegaArquivo(path) {
     try {
          const encoding = 'utf-8'
          const texto = await fs.promises.readFile(path, encoding)
          return pegaLinks(texto)
     } catch (erro) {
          trataErros(erro)
     }

}

export default pegaArquivo;


