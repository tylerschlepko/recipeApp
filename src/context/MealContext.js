import { createContext } from "react";
import { useState, useEffect } from "react";

const MealContext = createContext()

export const MealProvider = ({children})