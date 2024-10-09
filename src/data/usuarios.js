/* SIMULACION DE USUARIOS REGISTRADOS EN LA BD */
// const usuarios = [
//   {
//     id: 1,
//     userName: "AdminJhon",
//     nombre: "Admin",
//     apellido: "Doe",
//     email: "admin@admin.com",
//     password: "admin123",
//     role: "Administrador",
//     fechaRegistro: "",
//     avatarImg: "",
//   },
//   {
//     id: 2,
//     userName: "Jorge",
//     nombre: "Jorge",
//     apellido: "Sánchez",
//     email: "test1@test.com",
//     password: "test123",
//     role: "Suscriptor",
//     fechaRegistro: "",
//     avatarImg: "",
//   },
//   {
//     id: 3,
//     userName: "David",
//     nombre: "David",
//     apellido: "Peña",
//     email: "test2@test.com",
//     password: "test123",
//     role: "Visitante",
//     fechaRegistro: "",
//     avatarImg: "",
//   },
// ];

/* SIMULACION DE USUARIOS REGISTRADOS EN LA BD */
const usuarios = [
  {
    id_user: 2,
    username: "Jorge Luciano",
    nombre: "Jorge Luciano",
    apellido: "Sánchez Sarango",
    email: "jorge@jorge.com",
    password: "luciano123",
    role: "Visitante",
    fecha_registro: "2024-10-09T01:43:24.642Z",
    avatar_img: "",
  },
  {
    id_user: 3,
    username: "Admin Doe",
    nombre: "Admin Rafael",
    apellido: "Doe Rodrigues",
    email: "admin@admin.com",
    password: "admin123",
    role: "Administrador",
    fecha_registro: "2024-10-09T02:21:06.923Z",
    avatar_img: "",
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
        id: user.id_user,
        userName: user.username,
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
  const user = usuarios.find((u) => u.id_user === id);
  return user || null;
}
