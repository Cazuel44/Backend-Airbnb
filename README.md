# Airbnb API

API REST de reservas de propiedades desarrollada con **Node.js, TypeScript, Express 5 y MongoDB**.

## Tecnologías

- Node.js + TypeScript
- Express 5
- MongoDB + Mongoose
- Zod
- bcrypt + JWT
- Vitest
- Swagger / OpenAPI

## Funcionalidades

- **Usuarios:** CRUD, roles `user` y `admin`, contraseñas hasheadas.
- **Autenticación:** login, JWT, logout y rutas protegidas.
- **Propiedades:** CRUD y autorización por propietario.
- **Reservas:** creación, consulta, actualización y cancelación.
- **Disponibilidad:** validación de fechas y prevención de reservas solapadas.
- **Validación:** schemas con Zod.
- **Errores:** manejo centralizado mediante middleware.
- **Testing:** tests automatizados con Vitest.
- **Documentación:** Swagger UI para explorar los endpoints.

## Arquitectura

```text
Routes → Middlewares → Controllers → Services → Models
```

## Instalación

```bash
git clone <URL_DEL_REPOSITORIO>
cd airbnb
npm install
```

Crear un archivo `.env` en la raíz:

```env
PORT=3000
MONGODB_URL=tu_connection_string
JWT_SECRET=tu_secret
MONGODB_TEST_URL=tu_test_connection_string
```

Iniciar el servidor:

```bash
npm run dev
```

Ejecutar los tests:

```bash
npm test
```

## Documentación API

Con el servidor iniciado:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Estado del proyecto

- [x] CRUD de usuarios y propiedades
- [x] Autenticación y autorización
- [x] Gestión de reservas y disponibilidad
- [x] Validación y manejo de errores
- [x] Tests automatizados
- [x] Documentación Swagger

