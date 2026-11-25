const textoTitulo = document.querySelector("#titulo")
const idUsuario = document.querySelector("#userid")
const formulario = document.querySelector("#formulario")
const alerta = document.querySelector("#alerta")
const saida = document.querySelector("#saida")

formulario.addEventListener("submit", function (form) {
    form.preventDefault();

    const titulo = textoTitulo.value.trim()
    const id = Number(idUsuario.value)

    const conteudo = {
        userId: id,
        title: titulo,
    }

    fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(conteudo)
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Erro: " + resposta.status);

            }
            return resposta.json()
        })
        .then(function (mostrar) {
            alerta.textContent = "Criado com sucesso!"
            alerta.className = "alert alert-success"
            saida.textContent = JSON.stringify(mostrar, null, 2)
        })
        .catch(function (erro) {
            console.error(erro)
        })
})

const idBusca = document.querySelector("#idBusca")
const btnCarregar = document.querySelector("#btnCarregar")
const formEditar = document.querySelector("#formEditar")
const tituloEdit = document.querySelector("#tituloEdit")

btnCarregar.addEventListener("click", function () {
    fetch(`https://jsonplaceholder.typicode.com/todos/${idBusca.value}`)
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Erro: " + resposta.status);

            }
            return resposta.json()
        })
        .then(function (mostrar) {
            alerta.textContent = "busca realizada com sucesso!"
            alerta.className = "alert alert-success"
            tituloEdit.value = mostrar.title
            saida.textContent = JSON.stringify(mostrar, null, 2)
        })
        .catch(function (erro) {
            console.error(erro)
        })

})

formEditar.addEventListener("submit", function (resposta) {
    resposta.preventDefault();
    const tituloNovo = tituloEdit.value.trim();
    const edit = {
        title: tituloNovo
    }
    fetch(`https://jsonplaceholder.typicode.com/todos/${idBusca.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(edit)
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Erro: " + resposta.status);

            }
            return resposta.json()
        })
        .then(function (mostrar) {
            alerta.textContent = "Editado com sucesso!"
            alerta.className = "alert alert-success"
            saida.textContent = JSON.stringify(mostrar, null, 2)
        })
        .catch(function (erro) {
            console.error(erro)
        })
})


btnExcluir.addEventListener("click", function () {
    const confirmar = confirm("Deseja mesmo deletar?")


    if (confirmar) {
        fetch(`https://jsonplaceholder.typicode.com/todos/${idBusca.value}`, {
            method: "DELETE"
        })
            .then(function (resposta) {
                if (!resposta.ok) {
                    throw new Error("Erro: " + resposta.status);

                }
                return resposta.json()
            })
            .then(function (mostrar) {
                alerta.textContent = "Deletado com sucesso!"
                alerta.className = "alert alert-success"
                saida.textContent = JSON.stringify(mostrar, null, 2)
            })
            .catch(function (erro) {
                console.error(erro)
            })
    }else{
        alerta.textContent="Não foi deletado"
        alerta.className="alert alert-secondary"
    }

})