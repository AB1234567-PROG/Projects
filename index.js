const express = require("express");
const users = require("./MOCK_DATA.json")
const app = express();
const fs = require("fs");

// Middleware - Plugin
app.use(express.urlencoded({extended: false}));


// Routes
app.get('/users',(req,res)=>{
    const html = `
    <ul>
    ${users.map((user)=> `<li>${user.first_name}</li>`).join('')}
    </ul>`;
    res.send(html)
} );

// REST API
app.get("/api/users", (req,res)=>res.json(users));

app.
route('/api/users/:id')
.get((req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=> user.id===id)
    return res.json(user)})

    .patch((req,res)=>{
   
        return res.json({ status:"pending"});

    
    })
    .delete((req,res) =>
    //Delete user with id 
    res.json({status: "pending"}))


app.post('/api/users', (req,res)=>{
// TOOD: Create new user
  const body= req.body;
  users.push({...body, id: users.length +1})
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
    return res.json({ status:"success", id: users.length});
  })
  
  console.log("Body",body);
//   return res.json({status: "pending"})
})

// app.patch('/api/users/:id',(req,res)=>{
// // TOOD: Edit  the user with id
// const body = req.body;
// users.push(body)

// return res.json({status: "success"})})

app.delete('/api/users/:id',(req,res)=>
  // TOOD: Delete the user with id 
  res.json({status: "pending"})) 

app.listen(8000,()=>console.log("server started"))