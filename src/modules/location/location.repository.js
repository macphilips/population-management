import HttpError from '../errors/HttpError';

const callbackfn = (location) => {
  const {
    id, parentId, malePopulation, femalePopulation
  } = location;
  const totalPopulation = malePopulation + femalePopulation;
  return {
    id,
    malePopulation,
    femalePopulation,
    totalPopulation,
    parentId,
  };
};

class LocationRepository {
  constructor(locationModel) {
    this.locationModel = locationModel;
  }

  async createLocation(malePopulation, femalePopulation, parentId) {
    let parent = null;
    if (parentId) {
      parent = await this.locationModel.findByPk(parentId);
      if (!parent) {
        throw new HttpError('LOC_03', 'parentId', null, 404);
      }
      parent = parent.id;
    }
    const location = await this.locationModel.create({
      malePopulation,
      femalePopulation,
      parentId: parent
    });

    return callbackfn(location);
  }

  async updateLocation(id, { malePopulation, femalePopulation, parentId }) {
    let parent = null;
    if (parentId) {
      parent = await this.locationModel.findByPk(parentId);
      if (!parent) {
        throw new HttpError('LOC_03', 'parentId', null, 404);
      }
      parent = parent.id;
    }
    const location = await this.locationModel.findByPk(id);
    await location.update({
      malePopulation,
      femalePopulation,
      parentId: parent
    });
    return callbackfn(location);
  }

  async getLocations() {
    const locations = await this.locationModel.findAll({ where: { parentId: null } });
    return locations.map(callbackfn);
  }

  async getLocationById(id) {
    const location = await this.locationModel.findByPk(id, {
      include: [
        {
          as: 'subLocation',
          model: this.locationModel
        }
      ]
    });
    if (!location) {
      throw new HttpError('LOC_02', 'id', null, 404);
    }

    const json = callbackfn(location);
    const subLocation = location.subLocation.map(callbackfn);
    return {
      ...json,
      subLocation
    };
  }

  async deleteLocation(id) {
    await this.locationModel.destroy({
      where: { id },
      cascade: true
    });
  }
}

export default LocationRepository;
