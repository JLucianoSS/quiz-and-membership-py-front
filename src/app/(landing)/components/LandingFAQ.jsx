import { AccordionItem } from ".";

export const LandingFAQ = () => {
    const faqs = [
        {
            question: '¿Cómo puedo inscribirme en los planes de Quiz Premium?',
            answer: 'Para inscribirte en un plan de Quiz Premium, primero necesitas crear una cuenta. Luego, puedes seleccionar el plan que mejor se ajuste a tus necesidades en la sección de planes y proceder al pago de manera segura.'
        },
        {
            question: '¿Qué ventajas ofrece el Plan Pro frente al gratuito?',
            answer: 'El Plan Pro ofrece acceso ilimitado a todos los cuestionarios, estadísticas detalladas de rendimiento, la posibilidad de crear tus propios quizzes y soporte prioritario, mientras que el plan gratuito tiene un límite de quizzes diarios y funciones básicas.'
        },
        {
            question: '¿Puedo compartir mis resultados con amigos?',
            answer: 'Sí, puedes compartir tus resultados en redes sociales como Facebook y Twitter directamente desde la plataforma, o enviar los resultados a tus amigos por correo electrónico.'
        },
        {
            question: '¿Qué incluye el Plan de Preparación para Exámenes?',
            answer: 'El Plan de Preparación para Exámenes incluye acceso a quizzes especializados en diferentes temas académicos, simulacros de exámenes, un seguimiento de tu progreso y recomendaciones personalizadas para mejorar tu rendimiento.'
        }
    ];
    
    return (
    <div className="max-w-4xl mx-auto py-6 rounded-lg ">
        <h2 className="text-2xl text-center font-semibold mb-6">Preguntas frecuentes</h2>
        {faqs.map((faq, index) => (
            <AccordionItem key={index} question={faq.question} answer={faq.answer} />
        ))}
    </div>
    );
}
