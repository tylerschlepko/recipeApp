import { createContext } from "react";
import { useState, useEffect } from "react";

const MealContext = createContext()

export const MealProvider = ({children}) =>{
    
    const [recipes, setRecipes] = useState([])
    const [showSingle, setShowSingle] = useState(false)
    const [edit, setEdit] = useState(false)
    const [single, setSingle] = useState({})
    const [userId, setUserId] = useState(null)
    const [userRecipes, setUserRecipes] = useState([])

    useEffect(() => {
        getData()
        setSingle({})
    },[userId])
    
    //Gets the initial data for all of the recipes 
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

    //Filters out the users recipes
    const getUserRecipes = async () => {
        const filteredItems = recipes.filter((recipe) => recipe.user_id === userId.id);
        setUserRecipes(filteredItems)
        setShowSingle(false)
    }


    //Gets one recipe by id
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

    
    //Deletes the recipe by id
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

    //Brings the user back to the inital state
    const setHome = async () => {
        await getData()
        setShowSingle(false)
        setUserRecipes([])
    }

    //sets edit to the opposite of what it is
    const handleEdit = () => {
        setEdit(!edit)
    }

    //sets the user
    const setUser = async (data) => {
        await setUserId(await data)
        console.log(userId);

    }

    //checks if the user matches the user id tied to the recipe
    const checkUser = (recipeId) =>{
        if(userId){
            if(userId.id === recipeId){
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    //checks if there is anything in the userRecipes Array
    const checkUserRecipes = () =>{
        if(userRecipes[0]){
            return true
        } else {
            return false
        }
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
            userId,
            setUserId,
            setUser,
            checkUser,
            getData,
            checkUserRecipes,
            getUserRecipes,
            userRecipes
        }}>
            {children}
        </MealContext.Provider>
    )
}

export default MealContext