import { useCallback, useEffect, useRef } from "react";

export default function useTimeout(callback, delay){
    // delay - how you want it to wait until callback runs
    // useRef(callback) - makes sure you call back same function, not new one everytime it renders
    const callbackRef = useRef(callback)
    const timeoutRef = useRef()

    useEffect(() => {
        // updating callback ref not the callback itself
        // same reason for using useRef?
        callbackRef.current = callback
    }, [callback])

    // use useCallback so everytime delay changes reset timeout
    const set = useCallback(() => {
        // save current timeout so it can be cleared later
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
    }, [delay])

    const clear = useCallback(() => {
        // timeoutRef.current -> clear timer
        // clearTimeout -> clears timeoutRef is exists
        timeoutRef.current && clearTimeout(timeoutRef.current)
    }, [])

    // if any changes to delay, set, clear
    // set the timer then clear the ref
    useEffect(() => {
        set()
        return clear
    }, [delay, set, clear])

    // clears timeout then resets it
    const reset = useCallback(() => {
        clear()
        return set()
    }, [clear, set])

    return { reset, clear }
}

 