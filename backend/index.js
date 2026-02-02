const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const secretKey = "secretkey";
const PORT = 5000;

app.get("/", (req, resp) => {
  resp.send("API working");
});

// ============ Login API ===========
app.post("/login", (req, resp) => {
  const user = {
    id: 1,
    username: "Pankaj",
    email: "pankaj@test.com",
  };

  jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
    if (err) {
      resp.status(500).json({ error: "Token generation failed" });
    } else {
      resp.json({ token });
    }
  });
});

// ============== Profile API ===============
app.post("/profile", verifyToken, (req, resp) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      resp.status(403).json({ result: "Invalid Token" });
    } else {
      resp.json({
        message: "Profile Accessed",
        authData,
      });
    }
  });
});

// ========== Verify Token Middleware ============
function verifyToken(req, resp, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    req.token = bearer[1];
    next();
  } else {
    resp.status(403).json({
      result: "Token not provided",
    });
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
