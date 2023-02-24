const express = require('express')
const postgres = require('postgres')
const path = require('path')
const multer = require('multer')
const app = express()
require('dotenv').config()
app.use(express.json())

const fs = require('fs')
const directory = './public/uploads'

app.use(express.static(path.join(__dirname, 'public')))
const upload = multer({dest: './public/uploads/'})

const sql = postgres(process.env.DATABASE_URL)
const PORT = 5002


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

app.listen(PORT, (err)=>{
    if (err){
        throw err
    } else {
        console.log(`App listening on port ${PORT}`)
    }
})