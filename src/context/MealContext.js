import { createContext } from "react";
import { useState, useEffect } from "react";

const MealContext = createContext()

export const MealProvider = ({children}) =>{
    
    const [recipes, setRecipes] = useState([])
    const [showSingle, setShowSingle] = useState(false)
    const [edit, setEdit] = useState(false)
    const [single, setSingle] = useState({})

    useEffect(() => {
        getData()
        setSingle({})
    },[])
    
    const getData = async () => {
        try {
        const response = await fetch ('/recipes', {
            method: "GET"
        }) 
        const data = await response.json()
        await setRecipes(data)
        } catch (error) {
        console.error(error)
        }
    }

    const getOne = async (id) => {
      try {
          const response = await fetch (`/recipe/${id}`, {
              method: "GET"
          }) 
          let data = await response.json()
          const obj = await data[0]
          await setSingle({...obj})
          setEdit(false) 
          setShowSingle(true)
        } catch (error) {
          console.error(error)
        }
        
      }

    

    const handleDelete = async (id, img) => {
        const updatedRecipes = recipes.filter((recipe)=> recipe.id !== id)
        await setRecipes(updatedRecipes)
        await setShowSingle(false)
        await fetch(`/recipe/${id}` ,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            img: img
        })
        })

    }

    const setHome = async () => {
        await getData()
        setShowSingle(false)
    }

    const handleEdit = () => {
        setEdit(!edit)
    }


    return(
        <MealContext.Provider value={{
            recipes,
            handleEdit,
            handleDelete,
            showSingle,
            setShowSingle,
            edit,
            setSingle,
            single,
            getOne,
            setHome,
            

        }}>
            {children}
        </MealContext.Provider>
    )
}

export default MealContext