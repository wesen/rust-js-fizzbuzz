import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Key} from "react";

type KeyState = {
    state: 'HELD' | 'HANDLED' | 'RELEASED'
    timestamp_ms: number
}

export interface CounterState {
    value: number
    decrementKeyState: KeyState
    incrementKeyState: KeyState
}

const initialState: CounterState = {
    value: 1,
    decrementKeyState: {state: 'RELEASED', timestamp_ms: 0},
    incrementKeyState: {state: 'RELEASED', timestamp_ms: 0},
}

const HOLD_DURATION_MS = 1000;

function wereButtonsHeldLongEnough(
    currentTimestamp_ms: number,
    decrementKeyState: KeyState,
    incrementKeyState: KeyState) {
    return (decrementKeyState.state == 'HELD' && incrementKeyState.state == 'HELD'
        && currentTimestamp_ms - decrementKeyState.timestamp_ms > HOLD_DURATION_MS
        && currentTimestamp_ms - incrementKeyState.timestamp_ms > HOLD_DURATION_MS
    )
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
        tick: (state, action: PayloadAction<number>) => {
            console.log("tick", action.payload, state.decrementKeyState, state.incrementKeyState)
            if (wereButtonsHeldLongEnough(action.payload, state.decrementKeyState, state.incrementKeyState)) {
                state.decrementKeyState.state = 'HANDLED';
                state.incrementKeyState.state = 'HANDLED';
                state.value = 1
            }

        },
        pressButtonDecrement: (state, action: PayloadAction<number>) => {
            if (state.decrementKeyState.state == 'RELEASED') {
                state.decrementKeyState.state = 'HELD';
                state.decrementKeyState.timestamp_ms = action.payload;
                if (state.incrementKeyState.state != 'HELD') {
                    if (state.value > 1) {
                        state.value -= 1
                    }
                }
            }
        },
        releaseButtonDecrement: (state, action: PayloadAction<number>) => {
            state.decrementKeyState.state = 'RELEASED';
        },
        pressButtonIncrement: (state, action: PayloadAction<number>) => {
            if (state.incrementKeyState.state == 'RELEASED') {
                state.incrementKeyState.state = 'HELD';
                state.incrementKeyState.timestamp_ms = action.payload;
                if (state.decrementKeyState.state != 'HELD') {
                    state.value += 1
                }
            }
        },
        releaseButtonIncrement: (state, action: PayloadAction<number>) => {
            state.incrementKeyState.state = 'RELEASED';
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
    releaseButtonIncrement,
    tick
} = fizzBuzzSlice.actions

export default fizzBuzzSlice.reducer
