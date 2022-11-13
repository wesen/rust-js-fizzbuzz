import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface CounterState {
    value: number
    buttonDecrementDown: number | null
    buttonIncrementDown: number | null
}

const initialState: CounterState = {
    value: 1,
    buttonDecrementDown: null,
    buttonIncrementDown: null,
}

const HOLD_DURATION_MS = 1000;

function wereButtonsHeldLongEnough(currentTimestamp_ms: number, buttonDecrementDown: number|null, buttonIncrementDown: number|null) {
    return buttonDecrementDown != null && buttonIncrementDown != null && currentTimestamp_ms - buttonDecrementDown > HOLD_DURATION_MS && currentTimestamp_ms - buttonIncrementDown > HOLD_DURATION_MS
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
        pressButtonDecrement: (state, action: PayloadAction<number>) => {
            state.buttonDecrementDown = action.payload
        },
        releaseButtonDecrement: (state, action: PayloadAction<number>) => {
            state.buttonDecrementDown = null
            if (state.buttonIncrementDown == null) {
                if (state.value > 1) {
                    state.value -= 1
                }
            } else if (wereButtonsHeldLongEnough(action.payload, state.buttonDecrementDown, state.buttonIncrementDown)) {
                state.value = 1
            }
        },
        pressButtonIncrement: (state, action: PayloadAction<number>) => {
            state.buttonIncrementDown = action.payload
        },
        releaseButtonIncrement: (state, action: PayloadAction<number>) => {
            state.buttonIncrementDown = null
            if (state.buttonDecrementDown == null) {
                state.value += 1
            } else if (wereButtonsHeldLongEnough(action.payload, state.buttonDecrementDown, state.buttonIncrementDown)) {
                state.value = 1
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
export const {
    increment,
    decrement,
    reset,
    pressButtonDecrement,
    pressButtonIncrement,
    releaseButtonDecrement,
    releaseButtonIncrement
} = fizzBuzzSlice.actions

export default fizzBuzzSlice.reducer
