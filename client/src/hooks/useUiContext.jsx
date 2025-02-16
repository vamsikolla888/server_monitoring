import { useContext } from "react"
import { UiContext } from "../context/UiContext"

export const useUiContext = () => {
    return useContext(UiContext)
}