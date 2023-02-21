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
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/recipes', async (req, res)=>{
    const data = await sql`
    SELECT * FROM recipes
    `
    res.json(data)
})

app.post('/upload', upload.single('image'), async (req, res) =>{
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
})

app.delete('/recipe/:id', async (req, res) => {
  const id = req.params.id

  await sql`
  DELETE FROM recipes
  WHERE id = ${id}
  `
})

app.listen(PORT, (err)=>{
    if (err){
        throw err
    } else {
        console.log(`App listening on port ${PORT}`)
    }
})