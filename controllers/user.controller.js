const User = require("../models/user.model");

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  create a new user
exports.createUser = async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PATCH update a user
exports.updateUser = async (req, res) => {
  try {
    console.log("ID:", req.params.id); 
    console.log("Body:", req.body);    
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated User:", updatedUser); 
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update Error:", error.message); 
    res.status(400).json({ message: error.message });
  }
};

exports.getuserbyId = async (req, res) => {
try {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.status(200).json(user);
} catch (error) {
  res.status(400).json({ error: "Error fetching user" });
}
};


// DELETE a user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
