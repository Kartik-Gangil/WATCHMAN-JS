# 🚀 WATCHMAN JS

**One place to handle OAuth for all platforms.**

WATCHMAN JS is a lightweight authentication library that simplifies OAuth integration across multiple platforms. Instead of handling different OAuth flows separately, you get a unified and easy-to-use interface.

---

## 🌐 Supported Platforms

- Google  
- LinkedIn  
- GitHub  

---

## ✨ Why Use WATCHMAN JS?

- ⚡ Simple plug-and-play setup  
- 🧩 Clean and minimal API  
- 📦 One-command installation  
- 👶 Beginner-friendly  
- 🔄 Unified OAuth handling across platforms  

---

## 📦 Installation

```bash
npm install @kartikgangil/watchman_js
```

## ⚙️ Usage Guide
### 🔐 GitHub Authentication

#### Import Package
##### CommonJS
``` javascript
const { GithubLogin, GithubCallback } = require("watchman-js");
```
##### ES Modules
``` javascript
import { GithubLogin, GithubCallback } from "watchman-js";
```
##### Initiate Login
``` javascript
app.get("/github", async (req, res) => {
  const uri = await GithubLogin(
    "http://localhost:8000/api/auth/github/callback",
    clientId
  );

  return res.redirect(uri);
});
```
#### Handle Callback
``` javascript
app.get("/api/auth/github/callback", async (req, res) => {
  const data = await GithubCallback(
    req.query.code,
    clientId,
    clientSecret
  );

  console.log(data);
  return res.json(data);
});
```
### 🔐 Google Authentication
``` javascript
// import package
const { GoogleLogin, GoogleCallback } = require("watchman-js");

// initate login uisng google O'auth
app.get("/google", (req, res) => {
  const uri = GoogleLogin(
    googleClientId,
    "http://localhost:8000/api/auth/google/callback"
  );

  return res.redirect(uri);
});

// handle Callback
app.get("/api/auth/google/callback", async (req, res) => {
  const data = await GoogleCallback(
    req.query.code,
    googleClientId,
    googleClientSecret,
    "http://localhost:8000/api/auth/google/callback"
  );

  console.log(data);
  return res.json(data);
});
```
### 🔐 LinkedIn Authentication
``` javascript
// import package
const { LinkedInLogin, LinkedInCallback } = require("watchman-js");

// initate login with Linked In 
app.get("/linkedin", (req, res) => {
  const uri = LinkedInLogin(
    linkedinClientId,
    "http://localhost:8000/api/auth/linkedin/callback"
  );

  return res.redirect(uri);
});

// handle callback
app.get("/api/auth/linkedin/callback", async (req, res) => {
  const data = await LinkedInCallback(
    req.query.code,
    linkedinClientId,
    linkedinClientSecret,
    "http://localhost:8000/api/auth/linkedin/callback"
  );

  console.log(data);
  return res.json(data);
});
```

### 🧠 How It Works
1. User hits your login route
2. WATCHMAN JS generates the OAuth URL
3. User is redirected to the provider (Google, GitHub, LinkedIn)
4. Provider redirects back with a code
5. You exchange the code using the callback function
6. Get user data instantly

### 🛠️ Use Cases
- SaaS applications with multiple login options
- Developer tools & dashboards
- Rapid MVP development
- Projects needing quick authentication setup
### 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request
### ⭐ Support

If this project helps you:

- Star ⭐ the repo
- Share it with others
- Report issues or suggest features