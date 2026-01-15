const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { getUser, setUser } = require("../services/auth");
async function handleUserSignUp(req, res) {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: "All fields are required",
        missing: {
          name: !name,
          email: !email,
          password: !password
        }
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists with this email" });
    }
    
    // Create the user
    const newUser = await User.create({
      name,
      email,
      password,
    });
    
    // Automatically log in the user by setting auth token
    const token = setUser(newUser);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });
    
    return res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ 
      error: "Failed to create user",
      details: error.message 
    });
  }
}
async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = setUser(user);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });
    return res.json({ message: "Logged in", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ 
      error: "Login failed",
      details: error.message 
    });
  }
}

function handleMe(req, res) {
  if (!req.user) return res.status(200).json({ authenticated: false });
  return res.json({ authenticated: true, user: req.user });
}

function handleLogout(req, res) {
  res.clearCookie("token");
  return res.json({ message: "Logged out" });
}
module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleMe,
  handleLogout,
};
