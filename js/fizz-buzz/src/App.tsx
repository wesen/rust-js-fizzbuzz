import './App.css'
import {useDispatch, useSelector, useStore} from "react-redux";
import {
    computeFizzBuzz,
    decrement,
    increment,
    pressButtonDecrement,
    pressButtonIncrement,
    releaseButtonDecrement,
    releaseButtonIncrement, tick
} from "./fizzBuzzSlice";
import {RootState} from "./store";
import {useEventListener, useTicker} from "./helpers";

/**
 * I am trying to build a fizz buzz application which has:
 * - 2 buttons: one to increase the counter, one to decrease the counter
 * - a display: it shows the current number or FIZZ or BUZZ or FIZZBUZZ
 * - if you hold both buttons for one second, it resets the counter
 *
 * Holding two buttons is going to be weird in the web version,
 * but we can do it with the keyboard.
 */
function App() {
    const dispatch = useDispatch()
    const count = useSelector((state: RootState) => state.fizzBuzz.value)
    const store = useStore<RootState>()

    useTicker(505, () => {
        const shouldTick = store.getState().fizzBuzz.decrementKeyState.state == 'HELD' && store.getState().fizzBuzz.incrementKeyState.state == 'HELD'
        if (shouldTick) { store.dispatch(tick(Date.now())) }
    }, [store] )

    const handleKeyDown = (event: KeyboardEvent) => {
        // if I press "a", then decrement
        // if I press "d", then increment
        // if I hold both for more than one second, then reset
        if (event.key === "a") {
            event.preventDefault()
            dispatch(pressButtonDecrement(Date.now()))
        } else if (event.key === "d") {
            event.preventDefault()
            dispatch(pressButtonIncrement(Date.now()))
        }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key === "a") {
            event.preventDefault()
            dispatch(releaseButtonDecrement(Date.now()))
        } else if (event.key === "d") {
            event.preventDefault()
            dispatch(releaseButtonIncrement(Date.now()))
        }
    }

    useEventListener('keydown', handleKeyDown)
    useEventListener('keyup', handleKeyUp)

    return (
        <div className="App flex flex-col">
            <button onClick={() => dispatch(decrement())}>DECREMENT</button>
            <span className={"font-semibold"}>Counter: {computeFizzBuzz(count)}</span>
            <button onClick={() => dispatch(increment())}>INCREMENT</button>
        </div>
    )
}

export default App
