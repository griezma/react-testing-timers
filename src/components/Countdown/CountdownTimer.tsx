import { FC, useEffect, useState } from "react";

interface CountdownTimerProps {
    children: (next: number) => any;
    countdownSecs: number;
}

function useCountdownTimer(countdownSecs: number) {
    const [remaining, setRemaining] = useState(countdownSecs);

    function tick() {
        if (remaining > 0) {
            setRemaining(remaining - 1);
        }
    }

    // countdown must be mutable after started
    useEffect(() => {
        setRemaining(countdownSecs);
    }, [countdownSecs]);

    useEffect(() => {
        const timeoutId = setTimeout(tick, 1000);
        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remaining]);

    return remaining;
}

const CountdownTimer: FC<CountdownTimerProps> = ({ children, countdownSecs }) => {
    const remainingSecs = useCountdownTimer(countdownSecs);
    return remainingSecs > 0 && children(remainingSecs);
}

export default CountdownTimer;