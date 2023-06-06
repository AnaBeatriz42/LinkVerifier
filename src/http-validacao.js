
function extraiLinks(arrLinks) {
     return arrLinks.map((objLink) => Object.values(objLink).join())
}

async function checkStatus(links) {
     const arryStatus = await Promise.all(
          links.map(async (link) => {
               try{
                    const response = await fetch(link)
                    return response.status

               }catch (erro){
                   return trataErros(erro)
               }
          })
     )
     return arryStatus
}

function trataErros(erro){
     if (erro.cause.code === 'ENOTFOUND'){
          return 'Link não encontrado'
     }else{
          return "Algo deu errado"
     }
}

export default async function listValid(links) {
     const listLinks = extraiLinks(links)
     const status = await checkStatus(listLinks)

     return links.map((objeto, indice) => ({
          ...objeto,
          status: status[indice]
     }))
     
}
