import {configureStore} from '@reduxjs/toolkit'
import {fizzBuzzSlice} from "./fizzBuzzSlice";

export const store = configureStore({
    reducer: {
        fizzBuzz: fizzBuzzSlice.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
