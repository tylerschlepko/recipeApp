import React from "react";
import App from "./App";
import  ReactDOM  from "react-dom/client";
import './index.css'
import { MealProvider } from './context/MealContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <MealProvider>
        <App/>
        </MealProvider>
    </React.StrictMode>
)