import { ADD_USER, OUT_USER } from "./actionTypes";

export const addUserAction = (user) => ({
    type: ADD_USER,
    user,
})

export const OutUserAction = () => ({
    type: OUT_USER,
})