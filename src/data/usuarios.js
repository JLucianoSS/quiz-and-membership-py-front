/* SIMULACION DE USUARIOS REGISTRADOS EN LA BD */
const usuarios = [
  {
    id: 1,
    userName: "AdminJhon",
    nombre: "Admin",
    apellido: "Doe",
    email: "admin@admin.com",
    password: "admin123",
    role: "Administrador",
    fechaRegistro: "",
  },
  {
    id: 2,
    userName: "Jorge",
    nombre: "Jorge",
    apellido: "Sánchez",
    email: "test1@test.com",
    password: "test123",
    role: "Suscriptor",
    fechaRegistro: "",
  },
  {
    id: 3,
    userName: "David",
    nombre: "David",
    apellido: "Peña",
    email: "test2@test.com",
    password: "test123",
    role: "Visitante",
    fechaRegistro: "",
  },
];

/* FUNCION QUE SIMULA EL LOGIN */
export function login(email, password) {
  const user = usuarios.find(
    (usuario) => usuario.email === email && usuario.password === password
  );
  if (user) {
    return {
      success: true,
      message: "Login exitoso",
      user: {
        id: user.id,
        userName: user.userName,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        role: user.role,
      },
    };
  }
  return {
    success: false,
    message: "Error: Usuario o contraseña incorrectos",
  };
}

// Función para obtener todos los usuarios
export function getUsers() {
  return usuarios;
}

// Función para obtener un usuario por ID
export function getUser(id) {
  const user = usuarios.find((u) => u.id === id);
  return user || null;
}
