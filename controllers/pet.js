const Model = require("../models");
const Pet = Model.pet;
const User = Model.user;
const Species = Model.species;


// insert data pet 
exports.Insert = (req, res) => {
   const Body  = req.body;
   const dataPet = {
     name: Body.name,
     gender: Body.gender,
     id_species:Body.species.id,
     age:Body.age.id,
     id_user:Body.user.id,
     about: Body.about,
     photo: Body.photo
   };
  
  Pet.create(dataPet).then(resPet => {
    User.findOne({ where: { id: Body.user.id } }).then(user => {
      Species.findOne({ where: { id: Body.species.id } }).then(species => {
          const resData = {
            id: resPet.id,
            name: resPet.name,
            gender: resPet.gender,
            species,
            age:resPet.age.id,
            user,
            photo: resPet.photo,
            about: resPet.about
          };
          res.send({
            message: "Data has been successfully",
            resData
          }); 
      });
    });
  });
};


   exports.getAllPet = (req, res) => {
     Pet.findAll({
       attributes: [
         "id",
         "name",
         "age",
         "gender",
         "photo",
         "about"
       ],
       include: [
         {
           model: Species,
           attributes: ["id", "name"],
           as: "species"
         },
         {
           model: User,
           attributes: ["id", "breeder", "phone", "address"],
           as: "user"
         }
       ]
     }).then(pets => {
       if (pets) {
         res.send(pets);
       } else {
         res.status(400).send({
           error: true,
           message: "Error has Happened,make sure check your connection"
         });
       }
     });
   };

   // update and select data
exports.updating = (req,res) =>{
const idPet = req.params.id;

Pet.findOne({where:{id:idPet}}).then(data =>{
if(data){
  const updateData = { 
   name:req.body.name,
   gender:req.body.gender,
   id_species:req.body.id_species,
   age:req.body.age.id,
   id_user:req.body.id_user,
   photo:req.body.photo,
   about:req.body.about
  };
Pet.update(updateData,{where:{id:idPet}}).then(updateResult => {
  if(updateResult){
     Pet.findOne({
         include:[
         {
           model:Species,
           attributes:["id","name"],
           as:"species"
         },
         {
          model :User,
          attributes:["id","breeder","phone","address"],
          as:"user" 
         }
       ],
       where:{id:idPet},
       attributes:["id","name","gender","photo","about","createdAt","updatedAt"]
     }).then(data =>{
       if(data){
         res.send(data)
       }else{
         res.status(400).send({
             error:true,
             message:" Update pet'data failed "
         })
       }
     })
    }
   })
  }else{
   res.send(400).send({
     error:true,
     message:'there is something wrong in inserting data pet'
   })
   }
})
}

// delete pet based on id'pet
exports.deleting = (req,res) =>{
  const idpet = req.params.id
  Pet.destroy({where:{id:idpet}}).then(deleted=>{
    if(deleted){
      res.send({message:"Data has been deleted successfully",id:idpet})
    }else{
      res.send({ message: "failure in deleting" });
    }
  })
}










































