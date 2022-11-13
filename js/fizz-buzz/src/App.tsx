import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {computeFizzBuzz, decrement, increment} from "./fizzBuzzSlice";
import {RootState} from "./store";

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

    return (
        <div className="App flex flex-col">
            <button onClick={() => dispatch(decrement())}>DECREMENT</button>
            <span className={"font-semibold"}>Counter: {computeFizzBuzz(count)}</span>
            <button onClick={() => dispatch(increment())}>INCREMENT</button>
        </div>
    )
}

export default App
