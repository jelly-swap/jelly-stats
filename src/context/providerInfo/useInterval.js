import { useEffect, useRef } from 'react';

export default function useInterval(callback, delay, params) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(
        () => {
            savedCallback.current = callback;
        },
        [callback]
    );

    // Set up the interval.
    useEffect(
        () => {
            function tick() {
                savedCallback.current(params);
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        },
        [delay, params]
    );
}
