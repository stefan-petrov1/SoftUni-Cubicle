const Cube = require('../models/cube-model');

async function getCubes() {
  return Cube.find().lean();
}

function getCubeById(id) {
  return Cube.findById(id);
}

async function addCube(cubeData) {
  await Cube.create(cubeData);
}

async function getCubeAccessories(cubeId, accessoryService) {
  const cube = await this.getCubeById(cubeId).lean();
  return Promise.all(cube.accessories.map(x => accessoryService.getAccessoryById(x).lean()));
}

async function deleteCube(cubeId) {
  await Cube.deleteOne({ _id: cubeId });
}

async function editCube(cubeId, newData) {
  await Cube.findByIdAndUpdate(cubeId, { $set: newData });
}

function searchCube(searchBody) {
  const options = {};

  const { search, from, to } = searchBody;

  if (search) {
    options.name = { $regex: new RegExp(search, 'i') };
  }

  if (from) {
    options.difficultyLevel = { $gte: Number(from) };
  }

  if (to) {
    if (!options.difficultyLevel) {
      options.difficultyLevel = {};
    }

    options.difficultyLevel.$lte = Number(to);
  }

  return Cube.find(options).lean();
}

exports.attachCubeServiceMiddleware = (req, res, next) => {
  req.cubeService = {
    getCubes,
    getCubeById,
    addCube,
    getCubeAccessories,
    searchCube,
    deleteCube,
    editCube
  };

  next();
};
