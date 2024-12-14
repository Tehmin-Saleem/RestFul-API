const express = require("express");
const router = express.Router();
const session = require("express-session");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getuserbyId
} = require("../controllers/user.controller");


// router.use((req, res, next) => {
//   if (req.query.isAdmin) {
//     next();
//   } else {
//     res.send("Not admin");
//   }
// });
router.get("/setname", (req, res) => {

  res.cookie("userSession", "12345", {
  signed:true,
    maxAge: 24 * 60 * 60 * 1000, 
  });
  res.send('cookie has been set in browser')
  res.send("Cookie sent!");
});
router.get("/getname",(req,res)=>{
  res.send(req.signedCookies)
})
router.use(
  session({
    secret: "tehmina", 
    
  })
);
router.get("/count", (req, res) => {
  if (!req.session.visits) {
    req.session.visits = 1; 
  } else {
    req.session.visits += 1; 
  }
  res.send(`The user has visited this site ${req.session.visits} times`);
});


router.get("/", getAllUsers);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getuserbyId);
  
module.exports = router;
