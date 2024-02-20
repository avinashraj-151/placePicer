import { useState, useEffect } from "react";

export default function ProgressBar() {
    const [remainingTime, setremainingTime] = useState(3000);
    // console.log('execute again');
    useEffect(() => {

        const clear_progress = setInterval(() => {
            console.log("Remaining time");
            setremainingTime(prevTime => prevTime - 10);
        }, 10)
        return () => {
            clearInterval(clear_progress);
        }
    }, [])
    return <>
        <progress value={remainingTime} max={3000}></progress>
    </>
}