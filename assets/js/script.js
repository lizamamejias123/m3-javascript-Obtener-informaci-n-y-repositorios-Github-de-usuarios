const baseUrl = 'https://api.github.com/users';

const request = async (url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
}
const getUser = async (usuario) => {
    const url = `${baseUrl}/${usuario}`
    return request(url);
}

const getRepo = async (usuario, pagina, repositorio) => {
    const url = `${baseUrl}/${usuario}/repos?page=${pagina}&per_page=${repositorio}`;
    return request(url);
}

let formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const pagina = document.getElementById('pagina').value;
    const repoPagina = document.getElementById('repoPagina').value;

    Promise.all([getUser(nombre), getRepo(nombre, pagina, repoPagina)])
        .then(resp => {
            let resultados = document.getElementById('resultados');
            if (resp[0].name === null || resp[0].name === undefined) {
                alert("No existe usuario - Not Found")
            } else {
                resultados.innerHTML = 
                ` <br> <div class='container row'>
                    <div class="col-6">
                        <h2>Datos de Usuario</h2>
                        <img src=${resp[0].avatar_url} width="100px" class="my-3">
                        <p>Nombre de usuario: ${resp[0].name}</p>
                        <p>Nombre de login: ${resp[0].login}</p>
                        <p>Cantidad de Repositorios: ${resp[0].public_repos}</p>
                        <p>Localidad: ${resp[0].location}</p>
                        <p>Tipo de usuario: ${resp[0].type}</p>
                        
                    </div>
                    <div class="col-6">
                    <h2>Nombre de Repositorios</h2>
                        <a id="Repo">
                    </div>
                    <br>
                </div>`;

                for (let i = 0; i < resp[1].length; i++) {
                   $("#Repo").append(`-${i+1}) ${resp[1][i].name}</br>`);
                }
            }
        })
        .catch(error => alert(error));
})