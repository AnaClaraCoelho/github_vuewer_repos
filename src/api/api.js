async function fetch_all_pages(url){
    let continua = true
    let result = []
    let page = 1
    while(continua) {
        const response = await fetch(`${url}?page=${page}`)
        const tmpitens= await response.json()
        if(tmpitens.length > 0) {
            result = result.concat(tmpitens)
            page ++
        } else {
            continua = false
        }
        result = result.concat()
    }
    return result
}

export const api = {
    async search_users(searchstring){
        const url = `https://api.github.com/search/users?q=${searchstring}` 
        const response = await fetch(url)
        return await response.json()
    },
    async lista_repos(username){
        const url = `https://api.github.com/users/${username}/repos`
        const data = await fetch_all_pages(url)
        return data
    },
    async listaInfos(owner, name, path='') {
        const url = `https://api.github.com/repos/${owner}/${name}/contents/${path}`
        const response = await fetch(url)
        return await response.json()
    }
}

