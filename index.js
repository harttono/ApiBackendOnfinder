const express             = require("express");
const bodyparser          = require("body-parser");
                            require("express-group-routes");
const { authenticated }   = require("./middleware");
const logginController    = require("./controllers/login");
const registerController  = require("./controllers/registration");
const speciesController   = require("./controllers/species");
const petController       = require('./controllers/pet')
const detailController    = require('./controllers/detailPet')
const userController      = require('./controllers/user')
const paymentController   = require("./controllers/payment")
const matchController     = require("./controllers/match")
const app = express();
// const port = Procces.env.PORT||4003;
app.set("port",4030);
app.use(bodyparser.json());
app.group("/api/v1", router => {
  router.post("/register", registerController.register);
  router.post("/login", logginController.login);

  // species router
  router.post("/species",authenticated,speciesController.store);
  router.get("/species", speciesController.getAll);


  // //pet router
  router.post("/pet", authenticated,petController.Insert);
  router.get("/pet", authenticated,petController.getAllPet);
  router.put("/pet/:id", authenticated,petController.updating);
  router.delete("/pet/:id", authenticated,petController.deleting);

  // // detail pet router
  router.get("/pet/:id", authenticated,detailController.getDetail);
``
  // // user router
  router.get("/user/:id", authenticated,userController.showUser);
  router.put("/user/:id", authenticated,userController.updateUser);
  router.delete("/user/:id", authenticated,userController.deleting);
  //payment router
  router.post("/payment", authenticated,paymentController.paying);
  router.put("/payment/:id",paymentController.updatePayment);

  // match router
  router.get("/match", authenticated,matchController.checkmatch);
  router.post("/match", authenticated,matchController.checkmatch);
  router.patch("/match/:id", authenticated, MatchController.UpMat);
  router.get("/match", authenticated, MatchController.TrueMat);
});



app.listen(app.get("port"), () => {
  console.log("port is running"+"  "+ app.get("port"));
});