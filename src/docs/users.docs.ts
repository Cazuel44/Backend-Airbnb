
/**
 * @openapi
 * tags:
 *   - name: Usuarios
 *     description: Gestión de usuarios
 */

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Registrar un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: Usuario de prueba
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@test.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 100
 *                 example: Password123!
 *               rol:
 *                 type: string
 *                 enum: [user, admin]
 *                 default: user
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Listar usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente
 *       401:
 *         description: No autenticado
 */

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Usuario no encontrado
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 100
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos o ID inválidos
 *       404:
 *         description: Usuario no encontrado
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Eliminar un usuario
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Permisos insuficientes
 *       404:
 *         description: Usuario no encontrado
 */
