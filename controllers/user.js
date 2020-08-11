const User      = require("../models").user;
//show data user based on id
exports.showUser = (req,res) =>{
const idUser = req.params.id
User.findAll({where :{id:idUser}}).then(user=>{

    if (user) {
      res.send({ message: "this is a user that you find", data: user });
      
    } else {
      res.send({ error:true,message: "make sure you check id user first" });
    }



})
}

// update for data user
exports.updateUser = (req,res) =>{
const idUser = req.params.id;
const Cbody = req.body;
const updateUser = {
    breeder :Cbody.breeder,
    phone   :Cbody.phone,
    address :Cbody.address
     }
 User.update(updateUser,{where:{id:idUser}}).then(result =>{
    // if(result){
            User.findOne({ where: {id:idUser } }).then(alluser => {
                  const resData = {
                    name: result.breeder,
                    phone: result.phone,
                    address: result.address,
                    createdAt :result.createdAt,
                    updateAt:result.updateAt
                  };
              res.send({
                message: "Data has been updated successfully",
                data:alluser
              });
            });
    // }
 
   })
 }

// delete data user
exports.deleting = (req,res) =>{
const  idUser =req.params.id;
User.destroy({where:{id:idUser}}).then(deletedData =>{
    res.send({message :"Data has been deleted",data:idUser})
})
}
