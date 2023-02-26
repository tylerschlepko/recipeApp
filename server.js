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

const directory = './public/uploads';
const upload = multer({ dest: './public/uploads/' });

const sql = postgres(process.env.DATABASE_URL);



function authMiddleware(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}



app.get('/', (req, res) =>{
  try {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  
  } catch (error) {
    console.error(error)
    res.status(500).send('server error')
  }
})

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

app.post('/upload', upload.single('image'), async (req, res) =>{
  try {
    const {title, instructions, description, ingredients} = req.body
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
    INSERT INTO recipes (img_path, title, instructions, description, ingredients)
    VALUES (${filePath}, ${title}, ${instructions}, ${description}, ${ingredients})
    `
  
  } catch (error) {
    console.error(error)
    res.status(500).send('server error')
  }
})

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



app.patch('/editRecipe/:id', async (req, res) => {
  try {
    const id = req.params.id
    const {title, description, instructions, ingredients} = req.body
    console.log(req.body);
  
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

app.post('/makeUser', async (req, res) =>{
  const {username, name, email, password} = req.body
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

app.post('/getUser', async (req,res)=>{
  const {username, password} = req.body
  try {
    const response = await sql`
    SELECT password, name, id FROM users
    WHERE username = ${username}
    `
    const data = response[0]
    const hash = `${data['password']}`
  
    const match = await bcrypt.compare(password, hash)
    if(match){
      const payload = {userId: data.id, name: data.name}
      const token = jwt.sign(payload, secretKey, {expiresIn: '1h'})
      res.cookie('jwt', token, {httpOnly: true })
      res.json({msg:'logged in', id:data.id})
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