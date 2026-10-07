# Airbnb Clone API

API REST desarrollada con **Node.js, TypeScript, Express y MongoDB**, inspirada en plataformas de reservas como Airbnb.

El objetivo es construir un backend realista para portafolio, aplicando arquitectura por capas, tipado estricto, validación, autenticación, autorización y manejo centralizado de errores.

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

## 🏗️ Arquitectura

El proyecto utiliza una arquitectura por capas:

**Routes → Middlewares → Controllers → Services → Models → MongoDB**

Cada capa tiene una responsabilidad específica:

* **Routes:** definen los endpoints.
* **Middlewares:** validación, autenticación, autorización y errores.
* **Controllers:** gestionan HTTP y las respuestas.
* **Services:** contienen la lógica de negocio.
* **Models:** definen los documentos de MongoDB.
* **Schemas:** validan los datos recibidos mediante Zod.
* **Utils:** funcionalidades reutilizables y errores personalizados.

Los errores controlados utilizan `AppError` y son gestionados mediante un middleware global.

---

## 👤 Usuarios

La API cuenta con CRUD completo de usuarios:

* Crear usuario
* Obtener usuarios
* Obtener usuario por ID
* Actualizar usuario
* Eliminar usuario
* Validación con Zod
* Hash de contraseñas con bcrypt
* Protección de contraseñas en las respuestas
* Validación de emails duplicados

Los usuarios pueden tener los roles:

```text
user
admin
```

---

## 🔐 Autenticación y autorización

La autenticación utiliza **JWT**.

Durante el login se validan las credenciales mediante `bcrypt` y se genera un token que contiene información del usuario, incluyendo:

```text
userId
rol
```

Las rutas protegidas utilizan:

```http
Authorization: Bearer TOKEN
```

El `authMiddleware` valida el token y almacena la información del usuario autenticado en `req`.

La autorización se maneja de dos formas:

* **Por rol:** mediante `adminMiddleware`.
* **Por propietario:** un usuario solamente puede modificar o eliminar sus propias propiedades.

---

## 🏠 Propiedades

La API cuenta con CRUD de propiedades.

Una propiedad contiene información como:

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
```

El propietario se obtiene automáticamente desde el usuario autenticado:

```text
JWT → req.userId → Property.owner
```

El cliente no necesita enviar el `owner`.

Las propiedades utilizan autorización basada en propietario para operaciones como actualización y eliminación.

---

## 📅 Reservas

La API permite crear reservas asociadas a un usuario y una propiedad.

Una reserva contiene:

```text
user
property
checkIn
checkOut
totalPrice
status
```

El usuario autenticado se obtiene desde el JWT y no se recibe directamente desde el body.

El precio total también es calculado por el backend según:

```text
precio de la propiedad × cantidad de noches
```

Por ejemplo:

```text
Check-in:  10/10
Check-out: 15/10
5 noches
```

### Disponibilidad

Antes de crear una reserva, el backend comprueba que no exista otra reserva activa para la misma propiedad durante esas fechas.

Las reservas canceladas no bloquean la disponibilidad.

También se permite que una nueva reserva comience el mismo día en que termina la anterior:

```text
Reserva 1: 10 → 15
Reserva 2: 15 → 20
```

Esto permite reservas consecutivas sin solapamiento.

---

## ✅ Validación

Los datos recibidos por la API son validados mediante **Zod**.

Las validaciones incluyen:

* Tipos de datos
* Longitudes
* Emails
* URLs
* IDs de MongoDB
* Fechas
* Actualizaciones parciales
* Validación de datos requeridos

Las actualizaciones permiten enviar únicamente los campos que se desean modificar.

---

## ❌ Manejo de errores

El proyecto utiliza una clase personalizada:

```text
AppError
```

para representar errores controlados.

Principales códigos utilizados:

```text
400 → Datos inválidos
401 → No autenticado / credenciales inválidas
403 → Sin permisos
404 → Recurso no encontrado
409 → Conflicto / recurso no disponible
500 → Error interno
```

Los controllers y services utilizan `throw new AppError(...)` y el middleware global se encarga de generar la respuesta HTTP.

---

## 🔑 Seguridad

Actualmente se utilizan:

* bcrypt para contraseñas
* JWT para autenticación
* Middleware de autenticación
* Autorización por roles
* Autorización por propietario
* Zod para validación
* Variables de entorno para información sensible
* Protección de contraseñas en respuestas

Las contraseñas nunca se almacenan en texto plano.

---

## ⚙️ Configuración

Crear un archivo `.env` en la raíz:

```env
PORT=4000
MONGODB_URL=tu_connection_string
JWT_SECRET=tu_secret
```

El archivo `.env` no debe subirse al repositorio.

---

## 📦 Instalación

```bash
git clone <URL_DEL_REPOSITORIO>
cd airbnb-clone
npm install
```

Configurar las variables de entorno y ejecutar:

```bash
npm run dev
```

Servidor:

```text
http://localhost:4000
```

---

## 📌 Estado actual

### Completado

* [x] Node.js + TypeScript
* [x] Express
* [x] MongoDB Atlas + Mongoose
* [x] Variables de entorno
* [x] Arquitectura por capas
* [x] CRUD de usuarios
* [x] Validación con Zod
* [x] Hash de contraseñas con bcrypt
* [x] Manejo global de errores
* [x] Login y JWT
* [x] Autenticación mediante middleware
* [x] Roles `user` / `admin`
* [x] Autorización de administradores
* [x] CRUD de propiedades
* [x] Autorización por propietario
* [x] Actualización parcial de propiedades
* [x] CRUD inicial de reservas
* [x] Cálculo de noches y precio total
* [x] Validación de fechas
* [x] Validación de disponibilidad de propiedades

### Próximos pasos

* [ ] Obtener reservas
* [ ] Obtener reserva por ID
* [ ] Cancelación de reservas
* [ ] Tests
* [ ] Documentación de endpoints
* [ ] Mejoras de seguridad
* [ ] Deploy del backend
* [ ] Desarrollo del frontend con React

---

## 🎯 Objetivo

El proyecto busca simular un backend de una aplicación real de reservas, priorizando:

* Arquitectura limpia
* Separación de responsabilidades
* TypeScript estricto
* Validación de datos
* Seguridad
* Autenticación y autorización
* Manejo centralizado de errores
* Buenas prácticas de desarrollo
