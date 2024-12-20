"use client"
import { useState, useEffect } from 'react';
import { FaUserCircle, FaPaperPlane } from 'react-icons/fa';
import { getComentariosByPregunta, createComentarioByPregunta, getUserById } from '@/actions';

export const CommentsSection = ({ user, idPregunta }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar comentarios
  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await getComentariosByPregunta(idPregunta);
        
        // Obtener los comentarios y enriquecerlos con la información del usuario
        const commentsWithUsers = await Promise.all(
          response.data.map(async (comentario) => {
            const userResponse = await getUserById(comentario.id_user);
            return {
              ...comentario,
              usuario: userResponse.data
            };
          })
        );

        setComments(commentsWithUsers);
      } catch (error) {
        console.error('Error al cargar comentarios:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [idPregunta]);

  // Manejar nuevo comentario
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      const commentData = {
        id_pregunta: idPregunta,
        texto_comentario: newComment,
        id_user: user.id_user
      };

      const response = await createComentarioByPregunta(idPregunta, commentData);
      
      if (response.data) {
        // Agregar el usuario al nuevo comentario
        const newCommentWithUser = {
          ...response.data,
          usuario: user // Asumiendo que el objeto user ya tiene la información necesaria
        };
        setComments(prevComments => [newCommentWithUser, ...prevComments]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error al crear comentario:', error);
    }
  };

  // Función auxiliar para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) return `${diffDays}d`;
    if (diffHours > 0) return `${diffHours}h`;
    if (diffMinutes > 0) return `${diffMinutes}m`;
    return 'ahora';
  };

  return (
    <div className="w-full bg-white rounded-lg">
      {/* Header */}
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Comentarios ({comments.length})
        </h3>
      </div>

      {/* Comment Input */}
      {user && (
        <div className="py-4">
          <form onSubmit={handleSubmitComment} className="flex gap-3">
            <div className="flex-shrink-0">
              <FaUserCircle className="w-10 h-10 text-gray-400" />
            </div>
            <div className="flex-grow">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:border-transparent resize-none"
                rows="2"
                placeholder="Escribe un comentario..."
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="inline-flex items-center text-sm md:text-base gap-2 py-1 px-4 md:py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <FaPaperPlane className="w-4 h-4" />
                  Comentar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4 mt-4">
        {isLoading ? (
          <div className="text-center py-4">Cargando comentarios...</div>
        ) : comments.length === 0 ? (
          <div className="text-sm md:text-base text-center py-4 text-gray-400 border rounded-md ">
            No hay comentarios aún. ¡Sé el primero en comentar!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id_comentario} className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <FaUserCircle className="w-10 h-10 text-gray-400" />
                </div>
                <div className="flex-grow">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-800">
                          {comment.usuario?.nombre || 'Usuario'}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {formatDate(comment.fecha_comentario)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">
                      {comment.texto_comentario}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};