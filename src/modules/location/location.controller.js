class LocationController {
  /**
   * @constructor
   *
   * @param {LocationRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  createLocation = async (req, res) => {
    const { malePopulation, femalePopulation, parent } = req.body;

    const population = await this.repository.createLocation(
      malePopulation, femalePopulation, parent
    );

    res.status(201)
      .json(population);
  };

  updateLocation = async (req, res) => {
    const { malePopulation, femalePopulation, parent: parentId } = req.body;
    const { id } = req.params;

    const result = await this.repository.updateLocation(id, {
      malePopulation,
      femalePopulation,
      parentId
    });
    res.status(200)
      .json(result);
  };

  getAllLocations = async (req, res) => {
    const locations = await this.repository.getLocations();
    res.status(200)
      .json(locations);
  };


  getLocationById = async (req, res) => {
    const { id } = req.params;
    const location = await this.repository.getLocationById(id);
    res.status(200)
      .json(location);
  };

  deleteLocation = async (req, res) => {
    const { id } = req.params;
    await this.repository.deleteLocation(id);
    res.status(200)
      .json({ status: 'Successful' });
  };
}

export default LocationController;
