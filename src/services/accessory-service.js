const Accessory = require('../models/accessory-model');

function getAccessories() {
  return Accessory.find().lean();
}

async function getAvailableAccessories(cubeId) {
  return (await this.getAccessories()).filter(x => !x.cubes.some(x => x == cubeId));
}

function getAccessoryById(id) {
  return Accessory.findById(id);
}

function createAccessory(accessoryData) {
  return Accessory.create(accessoryData);
}

async function attachAccessory(cubeService, cubeId, accessoryId) {
  const accessory = await this.getAccessoryById(accessoryId);

  if (!accessory) {
    throw new Error('Invalid accessory ID');
  }

  const cube = await cubeService.getCubeById(cubeId);

  if (!cube) {
    throw new Error('Invalid cube ID');
  }

  if (!accessory.cubes.includes(cubeId)) {
    accessory.cubes.push(cubeId);
    await accessory.save();
  }

  if (!cube.accessories.includes(accessoryId)) {
    cube.accessories.push(accessoryId);
    await cube.save();
  }
}

exports.attachAccessoryServiceMiddleware = (req, res, next) => {
  req.accessoryService = {
    getAccessories,
    getAccessoryById,
    getAvailableAccessories,
    createAccessory,
    attachAccessory
  };

  next();
};
