import { createContext } from "react";
import { useState, useEffect } from "react";

const MealContext = createContext()

export const MealProvider = ({children}) =>{
    
    const [recipes, setRecipes] = useState([])
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [button, setButton] = useState(false)
    const [edit, setEdit] = useState(false)
    
    const getData = async () => {
        try {
        const response = await fetch ('/recipes', {
            method: "GET"
        }) 
        const data = await response.json()
        setRecipes(data)
        console.log(recipes);
        } catch (error) {
        console.error(error)
        }
    }

    useEffect(() => {
        getData()
    },[])
    

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
      console.log(image)
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
    
    

    const handleDelete = async (id) => {
        await fetch(`/recipe/${id}` ,{
        method: 'DELETE'
        })
        setButton(true)
    }

    const handleEdit = () => {
        setEdit(!edit)
    }

    return(
        <MealContext.Provider value={{
            recipes,
            handleDescription,
            handleFileChange,
            handleIngredients,
            handleInstructions,
            handleTitle,
            handleSubmit,
            handleEdit,
            handleDelete,
            button,
            setButton,
            edit,

        }}>
            {children}
        </MealContext.Provider>
    )
}

export default MealContext