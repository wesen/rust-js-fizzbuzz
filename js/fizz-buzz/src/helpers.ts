import {useEffect, useRef} from "react";

export function useEventListener<K extends keyof WindowEventMap>(eventName: K, handler: (evt: WindowEventMap[K]) => any, element = window) {
    // Create a ref that stores handler
    const savedHandler = useRef<(evt: WindowEventMap[K]) => any>();

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            // Make sure element supports addEventListener
            // On
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            const handler = savedHandler.current;

            // Create event listener that calls handler function stored in ref
            if (handler != undefined) {
                // Add event listener
                console.log("add Event Listener", handler);
                element.addEventListener(eventName, handler);

                // Remove event listener on cleanup
                return () => {
                    console.log("remove Event Listener", handler);
                    element.removeEventListener(eventName, handler);
                };
            }
        },
        [eventName, element] // Re-run if eventName or element changes
    );
}

export function useTicker(tickInterval_ms: number, callback: () => void, deps: any[]) {
    useEffect(() => {
        const interval = setInterval(callback, tickInterval_ms);
        return () => clearInterval(interval);
    }, [tickInterval_ms, ...deps]);
}
