import { conexionApi } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]"); //contenedor de los cuadros

function crearCard(id,titulo, tecnica, imagen){
    //creamos el marco fluor que tendrá el cuadro, titulo y tecnica...
    const card = document.createElement("div");
    card.className="marco-fluor";

    //Creamos la estructura dentro del div <<marcoFluor>>
    card.innerHTML=`<img src="${imagen}" alt="Imagen cuadro" class="imagen-cuadro">
        <p class="titulo-cuadro">"${titulo}"</p>
        <p class="tecnica">"${tecnica}"</p>
        <button class="eliminar" data-id="${id}">
            <div class="icono-papelera">
                <img src="img/icons8-papelera-emoji-48.png" alt="Eliminar">
            </div>
        </button>`;
    
    //Código para eliminar un cuadro desde el botón "papelera"
    const botonEliminar =card.querySelector(".eliminar");
    botonEliminar.addEventListener("click", () => {
        conexionApi.borrarCuadro(id)
        .then(() => {
            card.remove();
        })
        .catch(err => console.log(err));
    });

    lista.appendChild(card);

    return card;

}

const cuadro = async () => {
    try{
        const listaApi= await conexionApi.listarCuadros()

        listaApi.forEach(card => {
            lista.appendChild(
                crearCard(
                    card.id,
                    card.titulo,
                    card.tecnica,
                    card.imagen)
                );
    });

    } catch(error) {
        console.log(error)
    };

};

cuadro()

/*
async function listarCuadros(){
    const listaApi= await conexionApi.listarCuadros()

    listaApi.forEach(card => {
        lista.appendChild(
            crearCard(
                card.id,
                card.titulo,
                card.tecnica,
                card.imagen)
            );
    });

}

/Código para la creación de un cuadro nuevo agregado desde el formulario
const formulario = document.querySelector("[data-formulario]");

async function crearCuadro(evento){

    evento.preventDefault();

    const titulo=document.querySelector("[data-titulo]").value;
    const tecnica=document.querySelector("[data-tecnica]").value;
    const imagen=document.querySelector("[data-imagen]").value;

    await conexionApi.enviarCuadro(titulo,tecnica,imagen);
    //hasta aquí se envía los datos del nuevo cuadro
    console.log("Envío concluido");
}

formulario.addEventListener("submit",evento => crearCuadro(evento));
*/

//listarCuadros()