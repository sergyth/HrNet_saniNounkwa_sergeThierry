import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        // Ajoutez vos slices au store
        user: userReducer,
    },
})
