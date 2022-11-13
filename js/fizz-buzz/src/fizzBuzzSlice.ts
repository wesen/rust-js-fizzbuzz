import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 1,
}

export const fizzBuzzSlice = createSlice({
    name: 'fizzBuzz',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            if (state.value > 1) {
                state.value -= 1
            }
        },
        reset: (state) => {
            state.value = 1
        }
    },
})

export const computeFizzBuzz = (n: number): string => {
    if (n % 15 === 0) {
        return 'FizzBuzz'
    }
    if (n % 3 === 0) {
        return 'Fizz'
    }
    if (n % 5 === 0) {
        return 'Buzz'
    }

    return n.toString()
}

// Action creators are generated for each case reducer function
export const {increment, decrement, reset} = fizzBuzzSlice.actions

export default fizzBuzzSlice.reducer
