
import React, {useState, useContext} from 'react'
import MealContext from '../../context/MealContext'
import LoggedInHeader from '../layout/LoggedInHeader'
import Header from '../layout/Header'
import Alert from '../layout/SuccessAlert'
import AlertContext from '../../context/AlertContext'



function CreateNewRecipe() {
  const {userId} = useContext(MealContext)
  const {makeAlert} = useContext(AlertContext)

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
  formData.append('userId', userId.id)
  console.log(image);
  setImage(null)
  setIngredients('')
  setInstructions('')
  setTitle('')
  setDescription('')
  makeAlert("Recipe Uploaded")
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

const textareaStyle = {
  whiteSpace: 'pre-wrap'
};

  return (
    <>
    {userId ? <LoggedInHeader/> : <Header/>}
      <h1 className="text-5xl font-bold text-center pt-10">Upload your Recipe!</h1>
            <Alert className='alert-success'/>
        <form action="" className='p-5 grid grid-cols-1 gap-8' onSubmit={handleSubmit} >
            <input type="file" className="file-input file-input-bordered file-input-primary w-full " onChange={handleFileChange} accept='image/*' required/>
            <input type="text" placeholder="Title" className="input input-bordered input-primary w-full" value={title} onChange={handleTitle} required/>
            <textarea className="textarea textarea-bordered textarea-primary h-36" placeholder="Description" value={description} onChange={handleDescription} style={textareaStyle} required></textarea>
            <textarea className="textarea textarea-bordered textarea-primary h-36" placeholder="Ingredients" value={ingredients} onChange={handleIngredients} style={textareaStyle} required></textarea>
            <textarea className="textarea textarea-bordered textarea-primary h-36" placeholder="Instructions" value={instructions} onChange={handleInstructions} style={textareaStyle} required></textarea>
            <input type='submit' className='btn btn-primary'  ></input>
        </form>
    </>
  )
}

export default CreateNewRecipe
