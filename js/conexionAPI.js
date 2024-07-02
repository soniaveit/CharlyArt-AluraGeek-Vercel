//URL del proyecto desplegado en VERCEL
const apiURL="https://alura-geek-api-delta.vercel.app/cuadros";

async function listarCuadros(){
    const conexion= await fetch(apiURL);
    const conexionConvertida=conexion.json();
    //console.log(conexionConvertida);

    return conexionConvertida;
};

//Aquí debemos indicar el método y qué tipo de archivo se estará enviando
//eso en headers, y en body, el cuerpo del mensaje
async function enviarCuadro(titulo, tecnica, imagen){
    const conexion = await fetch(apiURL,{
        method: "POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
            titulo:titulo,
            tecnica:tecnica,
            imagen:imagen
        })
    })
    const conexionConvertida=conexion.json();
    
    return conexionConvertida;
};

const borrarCuadro = async (id) => {
    try{
        const res= await fetch(`${apiURL}/${id}`,{
            method: "DELETE"
        });
        return await res.json();
    } catch(err) {
        return console.log(err);
    }
}

export const conexionApi={
    listarCuadros,
    enviarCuadro,
    borrarCuadro
}