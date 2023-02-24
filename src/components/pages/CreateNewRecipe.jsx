
import React, {useState} from 'react'




function CreateNewRecipe() {
  

  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
};

const handleTitle = (e) => {
  setTitle(e.target.value)
}

const handleIngredients = (e) => {
  setIngredients(e.target.value)
}

const handleInstructions = (e) => {
  setInstructions(e.target.value)
}

const handleDescription = (e) => {
  setDescription(e.target.value)
}

const handleSubmit = async (e) => {
  e.preventDefault()
  const formData = new FormData()
  formData.append('image', image)
  formData.append('title', title)
  formData.append('instructions', instructions)
  formData.append('description', description)
  formData.append('ingredients', ingredients)
  console.log(image);
  setImage(null)
  setIngredients('')
  setInstructions('')
  setTitle('')
  setDescription('')
  alert("Recipe Posted")
  await uploadData(formData)
}

const uploadData = async (formData) =>{
  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
      
    })

    const data = await response.json()
    console.log(data);
    
  } catch (error) {
    console.error(error)
  }
  
}

  return (
    <div className="flex justify-evenly m-16 mt-12 ">
        <form action="" className='p-5 grid grid-cols-1 gap-8' onSubmit={handleSubmit} >
            <h1 className='font-bold text-xl text-center'>Upload Your Recipe</h1>
            <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={handleFileChange} required/>
            <input type="text" placeholder="Title" className="input input-bordered input-primary w-full max-w-xs" value={title} onChange={handleTitle} required/>
            <textarea className="textarea textarea-bordered textarea-primary" placeholder="Description" value={description} onChange={handleDescription} required></textarea>
            <textarea className="textarea textarea-bordered textarea-primary" placeholder="Ingredients" value={ingredients} onChange={handleIngredients} required></textarea>
            <textarea className="textarea textarea-bordered textarea-primary" placeholder="Instructions" value={instructions} onChange={handleInstructions} required></textarea>
            <input type='submit' className='btn btn-primary'  ></input>
        </form>
    </div>
  )
}

export default CreateNewRecipe
