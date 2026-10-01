# Airbnb Backend API

Backend REST API para una aplicación de reservas de alojamientos, desarrollada con Node.js, TypeScript, Express y MongoDB.

El proyecto está siendo desarrollado siguiendo una arquitectura por capas, separando responsabilidades entre **routes, middlewares, controllers, services y models**.

## 🚀 Tecnologías

* Node.js
* TypeScript
* Express
* MongoDB
* Mongoose
* Zod
* Bcrypt
* Dotenv

## 📁 Estructura del proyecto

```text
src/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── schemas/
├── services/
├── utils/
├── app.ts
└── server.ts
```

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
cd airbnb
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=4000
MONGODB_URI=tu_connection_string
```

Iniciar el servidor en desarrollo:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:4000
```

## 🏗️ Arquitectura

El proyecto utiliza una arquitectura por capas para mantener las responsabilidades separadas.

### Routes

Define los endpoints disponibles y conecta las rutas con sus respectivos controllers y middlewares.

### Middlewares

Se encargan de tareas que deben ejecutarse antes de llegar al controller, como la validación de datos y el manejo centralizado de errores.

### Controllers

Reciben la petición, obtienen los datos necesarios y utilizan los services. Su responsabilidad principal es manejar la respuesta HTTP.

### Services

Contienen la lógica de negocio y las operaciones relacionadas con la base de datos.

### Models

Definen la estructura de los documentos almacenados en MongoDB mediante Mongoose.

### Schemas

Utilizan Zod para validar los datos recibidos por la API antes de procesarlos.

## 👤 Usuarios

Actualmente la API permite:

* Crear usuarios
* Obtener usuarios por ID
* Actualizar usuarios
* Eliminar usuarios
* Validar los datos recibidos
* Evitar usuarios duplicados
* Hashear contraseñas antes de almacenarlas
* Manejar errores mediante `AppError`

### Crear usuario

**POST** `/api/users`

Ejemplo de datos enviados:

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

### Actualizar usuario

**PUT** `/api/users/:id`

Ejemplo:

```json
{
  "name": "Juan Pérez",
  "email": "juan.nuevo@example.com"
}
```

## 🏠 Propiedades

Actualmente la API permite trabajar con propiedades de alojamiento.

### Crear propiedad

**POST** `/api/properties`

Ejemplo de datos enviados:

```json
{
  "title": "Departamento",
  "description": "Departamento equipado",
  "price": 61000,
  "location": "Santiago Centro",
  "images": [
    "https://ejemplo.com/departamento.jpg"
  ],
  "guests": 3,
  "bedrooms": 2,
  "bathrooms": 1,
  "owner": "USER_ID"
}
```

Respuesta exitosa:

```json
{
  "message": "Propiedad creada exitosamente",
  "property": {
    "title": "Departamento",
    "description": "Departamento equipado",
    "price": 61000,
    "location": "Santiago Centro",
    "images": [
      "https://ejemplo.com/departamento.jpg"
    ],
    "guests": 3,
    "bedrooms": 2,
    "bathrooms": 1,
    "owner": "USER_ID"
  }
}
```

## ❌ Manejo de errores

El proyecto utiliza errores personalizados mediante `AppError` y un middleware centralizado para devolver respuestas consistentes.

Ejemplo:

```json
{
  "message": "El usuario ya existe"
}
```

Las validaciones incorrectas devuelven información sobre los campos que no cumplen con el esquema definido.

## 🔐 Seguridad

Actualmente se utilizan:

* Variables de entorno mediante `.env`
* Validación de datos con Zod
* Hash de contraseñas con Bcrypt
* Manejo centralizado de errores



## 📌 Próximos pasos

* [ ] Completar CRUD de propiedades
* [ ] Implementar autenticación
* [ ] Implementar autorización
* [ ] Middleware de autenticación
* [ ] Crear sistema de reservas
* [ ] Validar disponibilidad de propiedades
* [ ] Relacionar usuarios, propiedades y reservas
* [ ] Mejorar documentación de endpoints
* [ ] Agregar tests
* [ ] Preparar deployment

## 🛠️ Estado del proyecto

**En desarrollo.**

Este proyecto forma parte de mi práctica y desarrollo de conocimientos de backend con Node.js y TypeScript, aplicando una arquitectura organizada y buenas prácticas para aproximarlo progresivamente a un proyecto real.
