
/**
 * @openapi
 * tags:
 *   - name: Propiedades
 *     description: Gestión de propiedades
 */

/**
 * @openapi
 * /api/properties:
 *   get:
 *     tags:
 *       - Propiedades
 *     summary: Listar propiedades
 *     responses:
 *       200:
 *         description: Lista de propiedades obtenida correctamente
 *   post:
 *     tags:
 *       - Propiedades
 *     summary: Crear una propiedad
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - location
 *               - images
 *               - guests
 *               - bedrooms
 *               - bathrooms
 *             properties:
 *               title:
 *                 type: string
 *                 example: Departamento céntrico
 *               description:
 *                 type: string
 *                 example: Departamento cómodo cerca del metro
 *               price:
 *                 type: number
 *                 example: 50000
 *               location:
 *                 type: string
 *                 example: Santiago
 *               images:
 *                 type: array
 *                 minItems: 1
 *                 maxItems: 5
 *                 items:
 *                   type: string
 *                   format: uri
 *                 example:
 *                   - https://example.com/property.jpg
 *               guests:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *                 example: 2
 *               bedrooms:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *                 example: 1
 *               bathrooms:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *                 example: 1
 *     responses:
 *       201:
 *         description: Propiedad creada correctamente
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: No autenticado
 */

/**
 * @openapi
 * /api/properties/{id}:
 *   get:
 *     tags:
 *       - Propiedades
 *     summary: Obtener una propiedad por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID de MongoDB de la propiedad
 *     responses:
 *       200:
 *         description: Propiedad encontrada
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Propiedad no encontrada
 *   put:
 *     tags:
 *       - Propiedades
 *     summary: Actualizar una propiedad
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID de MongoDB de la propiedad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             minProperties: 1
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 1000
 *               price:
 *                 type: number
 *                 minimum: 0
 *               location:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *               images:
 *                 type: array
 *                 minItems: 1
 *                 maxItems: 5
 *                 items:
 *                   type: string
 *                   format: uri
 *               guests:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *               bedrooms:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *               bathrooms:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *     responses:
 *       200:
 *         description: Propiedad actualizada correctamente
 *       400:
 *         description: Datos o ID inválidos
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Propiedad no encontrada
 *   delete:
 *     tags:
 *       - Propiedades
 *     summary: Eliminar una propiedad
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID de MongoDB de la propiedad
 *     responses:
 *       200:
 *         description: Propiedad eliminada correctamente
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Propiedad no encontrada
 */
