import request from 'supertest';
import Sequelize from 'sequelize';
import app from '../../app';
import models from '../../database/models';
import { errors } from '../errors/HttpError';

const { Location } = models;

describe('Location Endpoint', () => {
  afterEach(async () => {
    Location.destroy({
      truncate: true,
      // cascade: true
    });
  });
  describe('Create location', () => {
    test('should create new location', async () => {
      const population = {
        malePopulation: 10,
        femalePopulation: 13,
      };
      const res = await request(app)
        .post('/api/v1/locations')
        .send(population)
        .set({
          Accept: 'application/json',
        });
      expect(res.status)
        .toEqual(201);
      expect(res.body)
        .toEqual({
          ...population,
          id: res.body.id,
          parentId: null,
          totalPopulation: 23
        });
    });
    describe('Create sub location', () => {
      test('should return a 400 error when parent id does\'t  exist', async () => {
        const population = {
          malePopulation: 10,
          femalePopulation: 13,
          parent: 89
        };
        const res = await request(app)
          .post('/api/v1/locations')
          .send(population)
          .set({
            Accept: 'application/json',
          });
        expect(res.status)
          .toEqual(404);

        expect(res.body)
          .toEqual({
            code: 'LOC_03',
            field: 'parentId',
            message: errors.LOC_03('parentId'),
          });
      });
      test('should create sub location when parent id exist', async () => {
        const population = {
          malePopulation: 10,
          femalePopulation: 13,
          parent: null
        };
        const location = await Location.create(population);
        population.parent = location.id;

        const res = await request(app)
          .post('/api/v1/locations')
          .send(population)
          .set({
            Accept: 'application/json',
          });
        expect(res.status)
          .toEqual(201);
        expect(res.body)
          .toEqual({
            parentId: location.id,
            id: res.body.id,
            malePopulation: 10,
            femalePopulation: 13,
            totalPopulation: 23
          });
      });
    });
  });
  describe('Update location', () => {
    const population = {
      malePopulation: 10,
      femalePopulation: 13,
    };
    test('should update location', async () => {
      const parent = await Location.create(population);
      const location = await Location.create(population);
      const res = await request(app)
        .put(`/api/v1/locations/${location.id}`)
        .send({
          malePopulation: 20,
          parent: parent.id
        })
        .set({
          Accept: 'application/json',
        });

      expect(res.status)
        .toEqual(200);

      expect(res.body)
        .toEqual({
          ...population,
          id: res.body.id,
          parentId: parent.id,
          malePopulation: 20,
          totalPopulation: 33
        });
    });
    test('should return a 404 error when parent id does\'t  exist', async () => {
      const location = await Location.create(population);
      const res = await request(app)
        .put(`/api/v1/locations/${location.id}`)
        .send({
          malePopulation: 20,
          parent: 494
        })
        .set({
          Accept: 'application/json',
        });
      expect(res.status)
        .toEqual(404);
      expect(res.body)
        .toEqual({
          code: 'LOC_03',
          field: 'parentId',
          message: errors.LOC_03('parentId'),
        });
    });
  });
  describe('Get location and sub locations', () => {
    test('should return a 404 error when id does\'t  exist', async () => {
      const res = await request(app)
        .get('/api/v1/locations/1234')
        .set({
          Accept: 'application/json',
        });
      expect(res.status)
        .toEqual(404);
      expect(res.body)
        .toEqual({
          code: 'LOC_02',
          field: 'id',
          message: errors.LOC_02,
        });
    });
    test('should get and return location and sub location', async () => {
      const population = {
        malePopulation: 10,
        femalePopulation: 13,
      };
      const location = await Location.create(population);
      population.parentId = location.id;

      await Location.create(population);
      await Location.create(population);

      const res = await request(app)
        .get(`/api/v1/locations/${location.id}`)
        .send(population)
        .set({
          Accept: 'application/json',
        });

      expect(res.status)
        .toEqual(200);

      const { subLocation, ...body } = res.body;
      expect(body)
        .toEqual({
          parentId: null,
          id: body.id,
          malePopulation: 10,
          femalePopulation: 13,
          totalPopulation: 23
        });
      expect(subLocation.length)
        .toEqual(2);

      expect(subLocation[0])
        .toEqual({
          parentId: location.id,
          id: subLocation[0].id,
          malePopulation: 10,
          femalePopulation: 13,
          totalPopulation: 23
        });
    });
    test('should get and return location and sub location empty', async () => {
      const population = {
        malePopulation: 10,
        femalePopulation: 13,
      };
      const location = await Location.create(population);

      const res = await request(app)
        .get(`/api/v1/locations/${location.id}`)
        .send(population)
        .set({
          Accept: 'application/json',
        });

      expect(res.status)
        .toEqual(200);

      const { subLocation, ...body } = res.body;
      expect(body)
        .toEqual({
          parentId: null,
          id: body.id,
          malePopulation: 10,
          femalePopulation: 13,
          totalPopulation: 23
        });
      expect(subLocation.length)
        .toEqual(0);
    });
  });
  describe('Get all location', () => {
    test('should get empty list', async (done) => {
      const res = await request(app)
        .get('/api/v1/locations')
        .set({
          Accept: 'application/json',
        });

      expect(res.status)
        .toEqual(200);
      expect(res.body)
        .toEqual([]);
      done();
    });
    test('should get all top level location record', async () => {
      const population = {
        malePopulation: 10,
        femalePopulation: 13,
      };
      const location = await Location.create(population);
      await Location.create(population);

      const res = await request(app)
        .get('/api/v1/locations')
        .set({
          Accept: 'application/json',
        });

      expect(res.status)
        .toEqual(200);
      expect(res.body.length)
        .toEqual(2);

      expect(res.body[0])
        .toEqual({
          ...population,
          id: location.id,
          parentId: null,
          totalPopulation: 23
        });
      // done();
    });
  });
  describe('Delete Location', () => {
    test('should delete location and sub locations', async (done) => {
      const population = {
        malePopulation: 10,
        femalePopulation: 13,
      };
      const location = await Location.create(population);
      population.parentId = location.id;

      await Location.create(population);
      await Location.create(population);
      const res = await request(app)
        .delete(`/api/v1/locations/${location.id}`)
        .set({
          Accept: 'application/json',
        });
      expect(res.status)
        .toEqual(200);
      expect(res.body)
        .toEqual({
          status: 'Successful'
        });

      const { Op } = Sequelize;
      const locations = await Location.findAll({
        where: {
          [Op.or]: [
            {
              id: location.id
            },
            {
              parentId: location.id
            },
          ]
        }
      });
      expect(locations.length)
        .toEqual(0);
      done();
    });
  });
});
