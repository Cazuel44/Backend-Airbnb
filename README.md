# Airbnb Clone API

API REST desarrollada con **Node.js, TypeScript, Express y MongoDB**, inspirada en el funcionamiento de plataformas de reservas como Airbnb.

El proyecto tiene como objetivo construir un backend realista para mi portafolio, aplicando separación de responsabilidades, validación de datos, autenticación, autorización, manejo centralizado de errores y buenas prácticas de desarrollo.

> 🚧 Proyecto en desarrollo

---

## 🚀 Tecnologías

* Node.js
* TypeScript
* Express 5
* MongoDB Atlas
* Mongoose
* Zod
* bcrypt
* JSON Web Token (JWT)
* dotenv
* tsx

---

## 📁 Arquitectura

El proyecto utiliza una arquitectura por capas para separar responsabilidades:

```text
src/
├── config/
│   ├── database.ts
│   └── env.ts
│
├── controllers/
│   ├── user.controller.ts
│   └── auth.controller.ts
│
├── middlewares/
│   ├── validate.middleware.ts
│   ├── error.middleware.ts
│   └── auth.middleware.ts
│
├── models/
│   ├── User.ts
│   └── Property.ts
│
├── routes/
│   ├── user.routes.ts
│   └── auth.routes.ts
│
├── schemas/
│   ├── user.schema.ts
│   ├── auth.schema.ts
│   └── property.schema.ts
│
├── services/
│   ├── user.services.ts
│   └── auth.services.ts
│
├── types/
│   ├── users.ts
│   ├── auth.ts
│   ├── express.d.ts
│   └── property.ts
│
├── utils/
│   ├── user.utils.ts
│   └── app-error.ts
│
├── app.ts
└── server.ts
```

### Flujo de la aplicación

```text
Route
  ↓
Middleware de validación
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
```

Los errores de negocio utilizan `AppError` y son manejados por un middleware global:

```text
Service
  ↓
AppError
  ↓
Error Middleware
  ↓
Respuesta HTTP
```

---

## 👤 Usuarios

Actualmente la API cuenta con CRUD de usuarios.

### Funcionalidades

* Crear usuario
* Obtener usuarios
* Obtener usuario por ID
* Actualizar usuario
* Eliminar usuario
* Validación de datos con Zod
* Hash de contraseñas con bcrypt
* Protección de contraseñas en las respuestas
* Validación de email duplicado
* Manejo de errores mediante `AppError`

### Roles

Los usuarios pueden tener uno de los siguientes roles:

```text
user
admin
```

El rol se almacena en MongoDB y también forma parte del JWT.

---

## 🔐 Autenticación

La autenticación utiliza **JWT (JSON Web Token)**.

El flujo es:

```text
Login
  ↓
Validación de credenciales
  ↓
bcrypt.compare()
  ↓
Generación del JWT
  ↓
Token
```

El token contiene información del usuario autenticado:

```text
userId
rol
```

Las rutas protegidas utilizan:

```text
Authorization: Bearer TOKEN
```

### Middleware de autenticación

`authMiddleware` se encarga de:

* Obtener el token del header `Authorization`
* Verificar que sea un Bearer token
* Validar el JWT
* Obtener `userId`
* Obtener `rol`
* Guardar estos datos en `req`

De esta manera, los controllers y services pueden conocer qué usuario está realizando la petición.

---

## 🛡️ Autorización

La autorización está separada de la autenticación.

### Autenticación

Determina:

> ¿Quién eres?

Se realiza mediante:

```text
authMiddleware
```

### Autorización por rol

Determina:

> ¿Tienes permisos para realizar esta acción?

Se realiza mediante:

```text
adminMiddleware
```

Por ejemplo, una ruta exclusiva para administradores:

```text
validate
   ↓
authMiddleware
   ↓
adminMiddleware
   ↓
controller
```

Un usuario normal recibirá:

```http
403 Forbidden
```

---

## 🏠 Propiedades

La API también cuenta con CRUD de propiedades.

Una propiedad contiene:

```text
title
description
price
location
images
guests
bedrooms
bathrooms
owner
createdAt
updatedAt
```

El campo `owner` almacena el `ObjectId` del usuario propietario.

### Creación de propiedades

Cuando un usuario autenticado crea una propiedad, el propietario se obtiene directamente desde el JWT:

```text
JWT
 ↓
req.userId
 ↓
Property.owner
```

El cliente no necesita enviar el `owner` en el body.

---

## 🔒 Autorización por propietario

Las operaciones sobre propiedades utilizan autorización basada en propietario.

Por ejemplo, para actualizar una propiedad:

```text
Usuario autenticado
        ↓
authMiddleware
        ↓
req.userId
        ↓
Service
        ↓
¿Es el propietario?
        ↓
Sí → actualizar
No → 403 Forbidden
```

Esto permite que un usuario solamente pueda modificar sus propias propiedades.

La misma lógica se utilizará para operaciones como eliminar propiedades.

---

## ✅ Validación con Zod

Los datos recibidos por la API son validados utilizando **Zod**.

Por ejemplo, una propiedad debe cumplir determinadas reglas:

```text
title        → string
description  → string
price        → number
location     → string
images       → array de URLs
guests       → number
bedrooms     → number
bathrooms    → number
```

Las actualizaciones son parciales, por lo que solamente es necesario enviar los campos que se desean modificar.

Ejemplo:

```json
{
    "price": 85000,
    "guests": 6
}
```

También se valida que una actualización contenga al menos un campo:

```json
{}
```

produce un error de validación.

---

## ❌ Manejo de errores

El proyecto utiliza una clase personalizada:

```text
AppError
```

para representar errores controlados de la aplicación.

Ejemplos:

```text
400 → Datos inválidos
401 → Usuario no autenticado / credenciales inválidas
403 → Sin permisos
404 → Recurso no encontrado
409 → Recurso duplicado
500 → Error interno del servidor
```

Los controllers no necesitan manejar cada error individualmente mediante `try/catch`.

Los errores son enviados al middleware global:

```text
Controller / Service
        ↓
throw new AppError(...)
        ↓
errorMiddleware
        ↓
HTTP Response
```

---

## 🔑 Seguridad

Actualmente se utilizan:

* bcrypt para almacenar contraseñas de forma segura
* JWT para autenticación
* Middleware de autenticación
* Middleware de autorización por rol
* Autorización por propietario
* Variables de entorno para información sensible
* Validación de datos con Zod
* Eliminación de la contraseña de las respuestas públicas

Las contraseñas nunca se almacenan en texto plano.

---

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=4000
MONGODB_URL=tu_connection_string
JWT_SECRET=tu_secret
```

El archivo `.env` no debe subirse al repositorio.

---

## 📦 Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd airbnb-clone
```

Instalar dependencias:

```bash
npm install
```

Configurar las variables de entorno:

```env
PORT=4000
MONGODB_URL=tu_connection_string
JWT_SECRET=tu_secret
```

Iniciar el servidor en desarrollo:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:4000
```

---

## 📌 Estado actual

### Completado

* [x] Configuración inicial de Node.js + TypeScript
* [x] Express
* [x] MongoDB Atlas
* [x] Mongoose
* [x] Variables de entorno
* [x] Arquitectura por capas
* [x] CRUD de usuarios
* [x] Validación con Zod
* [x] Hash de contraseñas con bcrypt
* [x] Manejo global de errores
* [x] AppError
* [x] Login
* [x] JWT
* [x] Middleware de autenticación
* [x] Roles `user` / `admin`
* [x] Middleware de autorización para administradores
* [x] CRUD de propiedades
* [x] Relación propiedad → propietario
* [x] Autorización basada en propietario
* [x] Actualización parcial de propiedades
* [x] Validación de actualizaciones vacías

### Próximos pasos

* [ ] Completar eliminación de propiedades
* [ ] Sistema de reservas
* [ ] Validación de disponibilidad
* [ ] Relaciones entre usuarios, propiedades y reservas
* [ ] Tests
* [ ] Documentación de endpoints
* [ ] Mejoras de seguridad
* [ ] Deploy del backend
* [ ] Desarrollo del frontend con React

---

## 🎯 Objetivo del proyecto

Este proyecto busca simular un backend de una aplicación real de reservas, priorizando:

* Arquitectura limpia
* Separación de responsabilidades
* Tipado estricto con TypeScript
* Validación de datos
* Seguridad
* Autenticación y autorización
* Manejo centralizado de errores
* Buenas prácticas de desarrollo


