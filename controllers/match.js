const models = require("../models");
const Match = models.match;
const Pet = models.pet;
const Spesies = models.species;
const Age = models.age;
const User = models.user;

exports.checkmatch = async (req, res) => {
  try {
    const { id_pet, id_pet_liked } = req.query;
    const resultmacthes = await Match.findOne({
      where: { id_pet, id_pet_liked }
    });
    if (resultmacthes) {
      const pet = await Pet.findOne({
            where: { id: resultMatch.id_pet },
            attributes: ["id", "name", "gender","photo","about"],
             include: [
          { model: Spesies, attributes: ["id", "name"] },
          { model: Age, attributes: ["id","name"] },
          { model: User, attributes: ["id", "breeder","phone","address" ] }
        ]
      });
      const pet_liked = await Pet.findOne({
        where: { id: resultMatch.id_pet_liked },
        attributes: ["id", "name", "gender", "aboutpet", "photo"],
        include: [
          { model: Spesies, attributes: ["id", "name"] },
          { model: Age, attributes: ["id","name"] },
          { model: User, attributes: ["id", "breeder","phone","address", ] }
        ]
      });
      res.status(200).send({
        status: 200,
        message: "success",
        data: {
          id: resultMatch.id,
          status: resultMatch.status,
          pet,
          pet_liked,
          createdAt: resultMatch.createdAt,
          updatedAt: resultMatch.updatedAt
        }
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "not found"
      });
    }
  } catch (error) {}
  res.status(400).send({
    status: 400,
    message: "bad request"
  });
};


// --- Create data match
exports.InsertMat = async (req, res) => {
  try {
    const { pet_id, pet_id_liked } = req.body;
    if (pet_id != "" && pet_id_liked != "") {
      const storePet = await Match.create(req.body);
      if (storePet) {
        const pet = await Pet.findOne({
          where: { id: storePet.pet_id },
          attributes: ["id", "name", "gender", "aboutpet", "photo"],
          include: [
            { model: Spesies, attributes: ["id", "name"] },
            { model: Age, attributes: ["name"] },
            { model: User, attributes: ["id", "breeder", "address", "phone"] }
          ]
        });
        const pet_liked = await Pet.findOne({
          where: { id: storePet.pet_id_liked },
          attributes: ["id", "name", "gender", "aboutpet", "photo"],
          include: [
            { model: Spesies, attributes: ["id", "name"] },
            { model: Age, attributes: ["name"] },
            { model: User, attributes: ["id", "breeder", "address", "phone"] }
          ]
        });
        res.status(200).send({
          status: 200,
          message: "success",
          data: {
            id: storePet.id,
            status: storePet.status,
            pet,
            pet_liked,
            createdAt: storePet.createdAt,
            updatedAt: storePet.updatedAt
          }
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "not found",
          id
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};
