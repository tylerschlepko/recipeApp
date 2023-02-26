const postgres = require('postgres');
const path = require('path');
const express = require('express')
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');

require('dotenv').config();

const PORT = process.env.PORT || 5002;
const secretKey = process.env.SECRET_KEY || 'my_secret_key';
const saltRounds = 10;

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')))

const directory = './build/uploads';
const upload = multer({ dest: './build/uploads/' });

const sql = postgres(process.env.DATABASE_URL);


//sends the user the initial html page
app.get('/', (req, res) =>{
  try {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  
  } catch (error) {
    console.error(error)
    res.status(500).send('server error')
  }
})

app.get('/checkToken', (req, res)=>{
  const token = req.cookies.jwt;

   if (token) {
     // If JWT exists, decode it
     try {
       const decoded = jwt.verify(token, secretKey);
       const userId = decoded;
      res.json({msg:'Success', ...userId })
     } catch (error) {
       // If JWT is invalid or has expired, clear the cookie and redirect to login page
       res.clearCookie('jwt');
       res.json({msg:'Jwt expired'})
     }
   } else {
     // If JWT does not exist, redirect to login page
     res.json({msg:'No jwt'})
   }
})

app.get('/logOut', (req, res)=>{
  try {
    res.clearCookie("jwt");
    res.redirect("/");
    
  } catch (error) {
    console.error(error)
  }
})

//Gets All recipes from the database
app.get('/recipes', async (req, res)=>{
  try {
    const data = await sql`
    SELECT * FROM recipes
    `
    res.json(data)
  
  } catch (error) {
    console.error(error)
    res.status(500).send('server error')
  }
})

//Gets All of the current users recipes via their user id
app.get('/userRecipes/:id', async (req, res)=>{
  const id = req.params.id
  try {
    const data = await sql`
    SELECT * FROM recipes
    WHERE user_id = ${id}
    `
    res.json(data)
  
  } catch (error) {
    console.error(error)
    res.status(500).send('server error')
  }
})

//Uploads recipe and image and renames the image to be a .jpg
app.post('/upload', upload.single('image'), async (req, res) =>{
  try {
    const {title, instructions, description, ingredients, userId} = req.body
    console.log(req.body)
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
      
        files.forEach(file => {
          const ext = path.extname(file);
          if (ext !== '.jpg') {
            const newFile = file + '.jpg';
            fs.rename(path.join(directory, file), path.join(directory, newFile), err => {
              if (err) throw err;
              console.log(`Renamed file ${file} to ${newFile}`);
            });
          }
        });
      });

    const filePath = `${req.file.filename}.jpg`
    await sql`
    INSERT INTO recipes (img_path, title, instructions, description, ingredients, user_id)
    VALUES (${filePath}, ${title}, ${instructions}, ${description}, ${ingredients}, ${userId})
    `
  
  } catch (error) {
    console.error(error)
    res.status(500).send('server error')
  }
})

//Gets single recipe by the id
app.get('/recipe/:id', async (req, res) =>{
  try {
    const id = req.params.id
    const data = await sql`
    SELECT * FROM recipes 
    WHERE id = ${id}
    `
    res.json(data)
  
  } catch (error) {
    console.error(error)
    res.status(500).send('server error')
  }
})

//Deletes the current recipe according to the id
app.delete('/recipe/:id', async (req, res) => {
  try {
    const id = req.params.id
    const {img} = req.body
    fs.unlinkSync(path.join(directory,img))
    await sql`
    DELETE FROM recipes
    WHERE id = ${id}
    `
  
  } catch (error) {
    console.error(error)
    res.status(500).send('server error')
  }
})


//Updates the current recipe via the users input
app.patch('/editRecipe/:id', async (req, res) => {
  try {
    const id = req.params.id
    const {title, description, instructions, ingredients} = req.body
  
    await sql`
    UPDATE recipes 
    SET title = ${title}, description = ${description}, instructions = ${instructions}, ingredients = ${ingredients}
    WHERE id = ${id}
    `
    res.status(200)
  } catch (error) {
    console.error(error)
    res.status(500).send('server error')
  }
})

//makes a new user
app.post('/makeUser', async (req, res) =>{
  const {username, name, email, password} = req.body
  
  //checks if the input username or email is already taken
  const compare = await sql`
  SELECT email, username FROM users
  `
  let isDup = false
  compare.forEach((data)=>{
    if(data.email === email || data.username === username){
      isDup = true
    }

  })
  
  
  try {
    //Encrypts the users password
    await bcrypt.hash(password, saltRounds, async (err, hash)=>{
      if(err){
        res.status(500).json({msg:'Error hashing password'})
      } else {
        if(isDup){
          res.json({msg:'Username or Email already exists'})
        } else {
        const data = await sql`
        INSERT INTO users (username, name, email, password)
        VALUES (${username},${name},${email},${hash})
        `
        res.json({msg: 'User Created'})
        }
      }
    })
    
  } catch (error) {
    if(error.code === '23505'){
      res.status(400).json({msg:'Username or Email already exists'})

    } else {
      res.status(500).json({msg: 'server error'})
    }
  }

})

//Checks if the user exists if they do it sends them a jwt as a cookie with their data 
//if the username and password combination does not exist then it sends back an error alert
app.post('/getUser', async (req,res)=>{
  const {username, password} = req.body
  try {
    const response = await sql`
    SELECT password, name, id FROM users
    WHERE username = ${username}
    `
    const data = response[0]
    const hash = `${data['password']}`
  
    //compares the encrypted password with the input password
    const match = await bcrypt.compare(password, hash)
    if(match){
      const payload = {userId: data.id, name: data.name}
      const token = jwt.sign(payload, secretKey, {expiresIn: '1h'})
      res.cookie('jwt', token, {httpOnly: true })
      res.json({msg:'logged in', id:data.id, name:data.name})
    } else {
      res.json({msg:'Username or password does not match'})
    }
    
  } catch (error) {
    res.json({msg:'Username or password does not match'})
  }

})

app.listen(PORT, (err)=>{
    if (err){
        throw err
    } else {
        console.log(`App listening on port ${PORT}`)
    }
})