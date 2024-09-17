

/* SIMULACIÓN DE PAGOS */
export const pagos = [
    {
      id: 1,
      subscriptionId: 1, // Corresponde a la suscripción de "Jorge Sánchez" (Anual, Activa)
      monto: 1200, // Precio anual
      fechaPago: "2024-01-01",
      estado: "completado",
    },
    {
      id: 2,
      subscriptionId: 2, // Corresponde a la suscripción de "Jorge Sánchez" (Anual, Inactiva)
      monto: 1200,
      fechaPago: "2023-01-01",
      estado: "completado",
    },
    {
      id: 3,
      subscriptionId: 3, // Corresponde a la suscripción de "David Peña" (Mensual, Activa)
      monto: 100, // Precio mensual
      fechaPago: "2024-02-01",
      estado: "completado",
    },
    {
      id: 4,
      subscriptionId: 4, // Corresponde a la suscripción de "David Peña" (Mensual, Inactiva)
      monto: 100,
      fechaPago: "2023-10-01",
      estado: "fallido",
    },
    {
      id: 5,
      subscriptionId: 3, // Pago recurrente para la suscripción activa de David Peña (Mensual)
      monto: 100,
      fechaPago: "2024-03-01",
      estado: "pendiente",
    },
  ];
  