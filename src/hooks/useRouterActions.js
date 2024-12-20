"use client"
import { useEffect, useState } from 'react';
import { 
  IoAddOutline, 
  IoBarChartOutline, 
  IoFilterOutline, 
  IoPersonOutline, 
  IoPlayOutline, 
  IoStarOutline, 
  IoTimeOutline 
} from "react-icons/io5";

// Función auxiliar para obtener el progreso del quiz
const getQuizProgress = () => {
  try {
    const progress = JSON.parse(localStorage.getItem('quiz_progress'));
    return progress || null;
  } catch {
    return null;
  }
};

// Función auxiliar para limpiar el progreso
const clearQuizProgress = () => {
  localStorage.removeItem('quiz_progress');
};

// Hook personalizado que devuelve las acciones según el progreso
export const useRouteActions = (userId) => {
  const [quizProgress, setQuizProgress] = useState(null);

  useEffect(() => {
    const progress = getQuizProgress();
    setQuizProgress(progress);
  }, []);

  const hasStarted = quizProgress && 
                     quizProgress.userId === userId && 
                     !quizProgress.completed;
  const hasCompleted = quizProgress?.completed;

  return [
    {
      action: hasCompleted 
        ? "Nuevo" 
        : (hasStarted ? "Continuar" : "Nuevo"),
      icon: hasStarted 
        ? <IoPlayOutline size={20} /> 
        : <IoAddOutline size={20} />,
      link: hasStarted 
        ? `${quizProgress?.currentUrl}` 
        : "/inicio/iniciar-quiz",
      onClick: hasCompleted ? clearQuizProgress : undefined
    },
    {
      action: "Filtrar",
      icon: <IoFilterOutline size={20} />,
      link: "/inicio/filtros",
    },
    {
      action: "Desempeño",
      icon: <IoBarChartOutline size={20} />,
      link: "/inicio/desempeno",
    },
    {
      action: "Favoritas",
      icon: <IoStarOutline size={20} />,
      link: "/inicio/favoritos",
    },
    {
      action: "Historial",
      icon: <IoTimeOutline size={20} />,
      link: "/inicio/historial",
    },
    {
      action: "Perfil",
      icon: <IoPersonOutline size={20} />,
      link: "/inicio/perfil",
    }
  ];
};
