import models from '../../database/models';
import ExampleController from './example.controller';
import { errorCatcher } from '../errors';
import ExampleRepository from './example.repository';

const express = require('express');

const router = express.Router();
const service = new ExampleRepository();
const controller = new ExampleController(service);

/**
 * @swagger
 * parameters:
 *   id:
 *    in: path
 *    name: id
 *    required: true
 *    type: integer
 *    description: Example ID
 *    example: 1
 */

/**
 * @swagger
 * definitions:
 *   ExampleModel:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         example: 1
 *       message:
 *         type: string
 *         example: This is a message
 *       status:
 *         type: string
 *         enum:
 *         - Sent
 *         - Failed
 *         example: Sent
 *   Examples:
 *     type: array
 *     items:
 *       $ref: '#/definitions/ExampleModel'
 *
 */

/**
 * @swagger
 *
 * /example:
 *   get:
 *     description: Send example to another contact
 *     produces:
 *       - application/json
 *     tags:
 *       - Example
 *     parameters:
 *       - in: body
 *         name: send_message
 *         schema:
 *          properties:
 *            message:
 *              type: string
 *              example: The is a message
 *     responses:
 *       200:
 *         description: Returns the created contact
 *         schema:
 *          properties:
 *            status:
 *              type: string
 *              enum:
 *              - Sent
 *              - Failed
 *              example: Sent
 */
router.get('', errorCatcher((req, res) => {
  res.status(200)
    .json('Successful');
}));

export default (app, baseUrl) => {
  app.use(`${baseUrl}/example`, router);
};
