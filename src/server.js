import express from "express";
import cors from "cors";

const app = express();

// ✅ CORS FIXED
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json());

// Root route ✅
app.get("/", (req, res) => {
  res.send("Server Running Successfully 🚀");
});

// Health route ✅
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend Connected ✅" });
});

// ✅ SIGNUP ROUTE (Your frontend calls this)
app.post("/api/auth/signup", (req, res) => {
  console.log("📱 SIGNUP:", req.body);
  
  const { name, email, password } = req.body;
  
  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required!" });
  }
  
  // Mock user data (replace with real DB later)
  const user = {
    id: Date.now(),
    name,
    email
  };
  
  res.json({ 
    success: true, 
    user,
    message: "Account created successfully! 🎉" 
  });
});

// ✅ LOGIN ROUTE (Your frontend calls this)
app.post("/api/auth/login", (req, res) => {
  console.log("🔐 LOGIN:", req.body);
  
  const { email, password } = req.body;
  
  // Mock login (replace with real auth later)
  if (email === "admin@team.com" && password === "password123") {
    res.json({ 
      success: true, 
      user: { id: 1, name: "Admin User", email },
      message: "Login successful! 🎉" 
    });
  } else {
    res.status(401).json({ error: "Invalid credentials!" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server started on http://localhost:5000 ✅");
  console.log("📱 Signup: POST /api/auth/signup");
  console.log("🔐 Login: POST /api/auth/login");
});