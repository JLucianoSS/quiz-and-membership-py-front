

export { getUsers } from "./usuario/getUsers";
export { createUser } from "./usuario/createUser";
export { getUserById } from "./usuario/getUserById";
export { updateUsuario } from "./usuario/updateUser";

export { createModulo } from "./modulo/createModulo";
export { getModulos } from "./modulo/getModulos";
export { getModuloById } from "./modulo/getModuloById";
export { updateModulo } from "./modulo/updateModule";
export { deleteModulo } from "./modulo/deleteModulo";

export { createTema } from "./tema/createTema";
export { getTemas } from "./tema/getTemas";
export { getTemaById } from "./tema/getTemaById";
export { updateTema } from "./tema/updateTema";
export { deleteTema } from "./tema/deleteTema";

export { createSubtema } from "./subtema/createSubtema";
export { getSubtemas } from "./subtema/getSubtemas";
export { updateSubtema } from "./subtema/updateSubtema";
export { getSubtemaById } from "./subtema/getSubtemaById";
export { deleteSubTema } from "./subtema/deleteSubtema";

export { createPregunta } from "./pregunta/createPregunta";
export { getPreguntas } from "./pregunta/getPreguntas";
export { getPreguntaById } from "./pregunta/getPreguntaById";
export { updatePregunta } from "./pregunta/updatePregunta";
export { deletePregunta } from "./pregunta/deletePregunta";

export { createOpcion } from "./opcion/createOpcion";
export { getOpciones } from "./opcion/getOpciones";
export { updateOpcion } from "./opcion/updateOpcion";
export { deleteOpcion } from "./opcion/deleteOpcion";

export { createFavorito } from "./favoritos/createFavorito";
export { deleteFavorito } from "./favoritos/deleteFavorito";

export { getResultados } from "./resultado/getResultados";
export { createResultado } from "./resultado/createResultado";

export { getComentariosByPregunta } from "./comentarios/getComentariosByPregunta";
export { createComentarioByPregunta } from "./comentarios/createComentarioByPregunta";

export { loginUser } from "./auth/login";