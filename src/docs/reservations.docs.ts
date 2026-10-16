
/**
 * @openapi
 * tags:
 *   - name: Reservas
 *     description: Gestión de reservas
 */

/**
 * @openapi
 * /api/reservations:
 *   post:
 *     tags:
 *       - Reservas
 *     summary: Crear una reserva
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - property
 *               - checkIn
 *               - checkOut
 *             properties:
 *               property:
 *                 type: string
 *                 pattern: '^[0-9a-fA-F]{24}$'
 *                 example: 507f1f77bcf86cd799439011
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *                 example: "2030-01-10T00:00:00.000Z"
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *                 example: "2030-01-13T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: Reserva creada correctamente
 *       400:
 *         description: Datos o fechas inválidas
 *       401:
 *         description: No autenticado
 *       409:
 *         description: La propiedad no está disponible
 *   get:
 *     tags:
 *       - Reservas
 *     summary: Listar las reservas del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reservas obtenidas correctamente
 *       401:
 *         description: No autenticado
 */

/**
 * @openapi
 * /api/reservations/{id}:
 *   get:
 *     tags:
 *       - Reservas
 *     summary: Obtener una reserva por ID
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
 *         description: Reserva obtenida correctamente
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Sin permisos para consultar esta reserva
 *       404:
 *         description: Reserva no encontrada
 *   put:
 *     tags:
 *       - Reservas
 *     summary: Actualizar las fechas de una reserva
 *     security:
 *       - bearerAuth: []
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
 *             minProperties: 1
 *             properties:
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *                 example: "2030-01-10T00:00:00.000Z"
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *                 example: "2030-01-13T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Reserva actualizada correctamente
 *       400:
 *         description: Fechas inválidas o reserva cancelada
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Sin permisos para actualizar esta reserva
 *       404:
 *         description: Reserva no encontrada
 *       409:
 *         description: La propiedad no está disponible para esas fechas
 */

/**
 * @openapi
 * /api/reservations/{id}/cancel:
 *   patch:
 *     tags:
 *       - Reservas
 *     summary: Cancelar una reserva
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
 *         description: Reserva cancelada correctamente
 *       400:
 *         description: La reserva ya está cancelada
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Sin permisos para cancelar esta reserva
 *       404:
 *         description: Reserva no encontrada
 */
