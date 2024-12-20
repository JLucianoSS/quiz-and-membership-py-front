"use client";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";
import { getComentarios, deleteComentario } from "@/actions";
import { CustomLoading } from "@/components";

export const TableComentarios = () => {
  const [comments, setComments] = useState([]);
  const [expandedComment, setExpandedComment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const commentsPerPage = 10; // Comentarios por página

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await getComentarios();
      if (response.success) {
        setComments(
          response.data.sort((a, b) => b.id_comentario - a.id_comentario)
        );
      }
    } catch (error) {
      console.error("Error al cargar comentarios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpand = (commentId) => {
    setExpandedComment(expandedComment === commentId ? null : commentId);
  };

  const handleDeleteClick = async (commentId) => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar este comentario? Esta acción no se puede deshacer."
      )
    ) {
      try {
        await deleteComentario(commentId);
        setComments(
          comments.filter((comment) => comment.id_comentario !== commentId)
        );
      } catch (error) {
        console.error("Error al eliminar comentario:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filtrar los comentarios por el término de búsqueda
  const filteredComments = comments.filter((comment) => {
    const userMatch = comment.user.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const commentMatch = comment.texto_comentario
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const preguntaMatch = comment.pregunta.texto_pregunta
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return userMatch || commentMatch || preguntaMatch;
  });

  // Implementar la paginación
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <CustomLoading
          color="#d9b16b"
          height={24}
          width={24}
          className="pt-4 flex justify-center"
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Campo de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por usuario, comentario o pregunta"
          className="w-full px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        {filteredComments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay comentarios disponibles
          </div>
        ) : (
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expandir
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comentario
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentComments.map((comment) => (
                <React.Fragment key={comment.id_comentario}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleExpand(comment.id_comentario)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {expandedComment === comment.id_comentario ? (
                          <FaChevronUp size={12} className="text-primary" />
                        ) : (
                          <FaChevronDown size={12} className="text-primary" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <div className="max-w-xs sm:max-w-md truncate">
                        {comment.user.nombre}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <div className="max-w-xs sm:max-w-md truncate">
                        {comment.texto_comentario}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                      {formatDate(comment.fecha_comentario)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {comment.user.username}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => handleDeleteClick(comment.id_comentario)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <FaTrashAlt size={15} />
                      </button>
                    </td>
                  </tr>
                  {expandedComment === comment.id_comentario && (
                    <tr>
                      <td colSpan="5" className="px-4 py-3">
                        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-gray-900">
                                Detalles del Usuario
                              </h4>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Nombre:</span>{" "}
                                  {comment.user.nombre}{" "}
                                  {comment.user.apellido}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Email:</span>{" "}
                                  {comment.user.email}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Rol:</span>{" "}
                                  {comment.user.role === "Visitante" ? "Estudiante" : comment.user.role}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">
                                    Fecha de registro:
                                  </span>{" "}
                                  {formatDate(comment.user.fecha_registro)}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold text-gray-900">
                                Detalles de la Pregunta
                              </h4>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">ID:</span>{" "}
                                  {comment.pregunta.id_pregunta}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Año:</span>{" "}
                                  {comment.pregunta.anio_pregunta}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">
                                    Texto:
                                  </span>{" "}
                                  {comment.pregunta.texto_pregunta}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from(
          { length: Math.ceil(filteredComments.length / commentsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 border ${
                currentPage === i + 1
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700"
              } rounded-md hover:bg-primary hover:text-white`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};
