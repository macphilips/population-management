import models from '../../database/models';
import LocationController from './location.controller';
import { errorCatcher } from '../errors';
import LocationRepository from './location.repository';

const express = require('express');

const router = express.Router();
const service = new LocationRepository(models.Location);
const controller = new LocationController(service);

/**
 * @swagger
 * parameters:
 *   id:
 *    in: path
 *    name: id
 *    required: true
 *    type: integer
 *    description: Location ID
 *    location: 1
 */

/**
 * @swagger
 * definitions:
 *   Location:
 *     type: object
 *     properties:
 *       malePopulation:
 *         type: number
 *         example: 100
 *       femalePopulation:
 *         type: number
 *         example: 150
 *       parent:
 *         type: number
 *         example: 1
 *   Locations:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Location'
 *
 */

/**
 * @swagger
 *
 * /locations:
 *   post:
 *     description: Send location to another contact
 *     produces:
 *       - application/json
 *     tags:
 *       - Location
 *     parameters:
 *       - in: body
 *         name: create_location
 *         schema:
 *          properties:
 *            malePopulation:
 *              type: number
 *              example: 100
 *            femalePopulation:
 *              type: number
 *              example: 150
 *            parent:
 *              type: number
 *              example: 1
 *     responses:
 *       200:
 *         description: Returns the created contact
 *         schema:
 *          properties:
 *            malePopulation:
 *              type: number
 *              example: 100
 *            femalePopulation:
 *              type: number
 *              example: 150
 *            totalPopulation:
 *              type: number
 *              example: 250
 */
router.post('', errorCatcher(controller.createLocation));

/**
 * @swagger
 *
 * /locations:
 *   get:
 *     description: Get all top level locations
 *     produces:
 *       - application/json
 *     tags:
 *       - Location
 *     responses:
 *       200:
 *         description: Returns the created contact
 *         schema:
 *           $ref: '#/definitions/Location'
 */
router.get('', errorCatcher(controller.getAllLocations));

/**
 * @swagger
 *
 * /locations/{id}:
 *   put:
 *     description: Update location
 *     produces:
 *       - application/json
 *     tags:
 *       - Location
 *     parameters:
 *       - $ref: '#/parameters/id'
 *       - in: body
 *         name: create_location
 *         schema:
 *          properties:
 *            malePopulation:
 *              type: number
 *              example: 100
 *            femalePopulation:
 *              type: number
 *              example: 150
 *            parent:
 *              type: number
 *              example: 1
 *     responses:
 *       200:
 *         description: Returns the created contact
 *         schema:
 *          properties:
 *            malePopulation:
 *              type: number
 *              example: 100
 *            femalePopulation:
 *              type: number
 *              example: 150
 *            totalPopulation:
 *              type: number
 *              example: 250
 */
router.put('/:id', errorCatcher(controller.updateLocation));

/**
 * @swagger
 *
 * /locations/{id}:
 *   get:
 *     description: Get location information for a given ID
 *     produces:
 *       - application/json
 *     tags:
 *       - Location
 *     parameters:
 *       - $ref: '#/parameters/id'
 *     responses:
 *       200:
 *         description: Returns the created contact
 *         schema:
 *          properties:
 *            malePopulation:
 *              type: number
 *              example: 100
 *            femalePopulation:
 *              type: number
 *              example: 150
 *            totalPopulation:
 *              type: number
 *              example: 250
 *            subLocation:
 *              refs: '#/definitions/locations'
 */
router.get('/:id', errorCatcher(controller.getLocationById));

/**
 * @swagger
 *
 * /locations/{id}:
 *   delete:
 *     description: Delete a location and all sub-location
 *     produces:
 *       - application/json
 *     tags:
 *       - Location
 *     parameters:
 *       - $ref: '#/parameters/id'
 *     responses:
 *       200:
 *         description: Returns the created contact
 *         schema:
 *          properties:
 *            status:
 *               type:string
 *               #example: 'Successful'
 */
router.delete('/:id', errorCatcher(controller.deleteLocation));

export default (app, baseUrl) => {
  app.use(`${baseUrl}/locations`, router);
};
