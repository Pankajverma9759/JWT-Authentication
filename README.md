# JWT-Authentication
In This Repo we learn JWT Authentication  with scratch level step by step



step 1
  make project folder  = JWT Authentication
  inside JWT Authentication make backend folder
  
   backend = npm init 
               it make package.json file


  Now Install express , JWT Token Package
    npm i express 
    npm i jsonwebtoken

  Now make index.js
     
  PORT = 5000
   
 Now make login API
    
    const secretKey = "secretkey";
     
        app.post("/login",(req,resp)=>{
           const user ={
               id:1,
               username:"Pankaj",
               email:"pankaj@test.com"
           }
       
           jwt.sign( {user} ,secretKey, {expiresIn:'300s'}, (err,token)=>{
                 resp.json({
                   token
                 })
           })
       })

    
    Now we make Profile API

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

       NOTE : ish  api  postman me post method me check kare 
              Aur headers me Autherization search karke select karo and jo token generate hua hai vo value field me dale check karo then response aayega

                        {
                              "message": "Profile Accessed",
                              "authData": {
                                  "user": {
                                      "id": 1,
                                      "username": "Pankaj",
                                      "email": "pankaj@test.com"
                                  },
                                  "iat": 1770042261,
                                  "exp": 1770042561
                              }
                        }                          


    Now we make verifyToken Function

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
