import { createContext } from "react";
import { useState, useEffect } from "react";

const MealContext = createContext()

export const MealProvider = ({children}) =>{
    
    const [recipes, setRecipes] = useState([])
    const [button, setButton] = useState(false)
    const [edit, setEdit] = useState(false)
    const [single, setSingle] = useState({})
    
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
          console.log(data);
          await setSingle({...obj}) 
          console.log(single)
          setButton(true)
        } catch (error) {
          console.error(error)
        }
        
      }

    useEffect(() => {
        getData()
        setSingle({})
    },[])

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
            handleEdit,
            handleDelete,
            button,
            setButton,
            edit,
            setSingle,
            single,
            getOne

        }}>
            {children}
        </MealContext.Provider>
    )
}

export default MealContext