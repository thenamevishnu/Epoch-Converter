import { useEffect, useState } from "react"
import { ConvertTime } from "../components/ConvertTime"

export const HomePage = () => {

    const [currentTimeZone, setCurrentTimeZone] = useState("Asia/kolkata")
    const [timeZones, setTimeZones] = useState([])
    const [showTimeZone, setShowTimeZone] = useState(false)
    const [selectedTimeConvertion, setSelectedTimeConvertion] = useState("Timestamp")
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString("default", {
        timeZone: currentTimeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }))

    const resetTimeZone = () => {
        setCurrentTimeZone("Asia/kolkata")
    }

    useEffect(() => {
        const timeZones = Intl.supportedValuesOf("timeZone")
        setTimeZones(timeZones)
    }, [])

    useEffect(() => {
        setCurrentTime(new Date().toLocaleString("default", {
            timeZone: currentTimeZone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }))
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleString("default", {
                timeZone: currentTimeZone,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }))
        }, 1000);
        return () => clearInterval(timer);
    }, [currentTimeZone])

    return <div>
        <h1 className="text-2xl font-medium text-white uppercase tracking-widest">Epoch Converter</h1>
        <div className="mt-10 flex gap-2 items-center">
            <div className="w-full relative">
                <input type="text" value={currentTimeZone} readOnly onClick={() => setShowTimeZone(prev => !prev)} className="border w-full cursor-pointer outline-none border-secondary p-2 rounded" />
                <section className={`absolute top-[2.8rem] right-0 text-white rounded w-auto ${showTimeZone ? "h-40 py-3 border-2" : "h-0"} border-secondary px-3 duration-200 overflow-auto bg-primary scroll-none`}>
                    {
                        timeZones.map(timeZone => <div key={timeZone} onClick={() => {
                            setCurrentTimeZone(timeZone);
                            setShowTimeZone(false)
                        }} className="cursor-pointer p-2">{timeZone}</div>)
                    }
                </section>
            </div>
            <button className="border border-secondary p-2 rounded px-4 cursor-pointer" onClick={resetTimeZone}>Reset</button>
        </div>
        <div className="border border-secondary mt-2 p-3 rounded">
            <h5 className="text-xs uppercase mb-2">Current Time - {currentTimeZone}</h5>
            <p className="text-2xl">{currentTime}</p>
        </div>
        <div className="flex gap-1 flex-col xs:flex-row">
            <div className="border w-full border-secondary mt-2 p-3 rounded">
                <h5 className="text-xs uppercase mb-2">Unix Seconds</h5>
                <p className="text-2xl">{Math.floor(new Date().getTime()/1000)}</p>
            </div>
            <div className="border w-full border-secondary mt-2 p-3 rounded">
                <h5 className="text-xs uppercase mb-2">Unix Milliseconds</h5>
                <p className="text-2xl">{new Date().getTime()}</p>
            </div>
        </div>
        <div className="flex justify-start">
            <div className="bg-tertiary my-2 rounded p-1 gap-2 flex text-sm">
                <button onClick={() => setSelectedTimeConvertion("Timestamp")} className={`${selectedTimeConvertion == "Timestamp" && "bg-primary"} text-white/90 p-1.5 px-2.5 rounded cursor-pointer`}>Timestamp</button>
                <button onClick={() => setSelectedTimeConvertion("DateTime")} className={`${selectedTimeConvertion == "DateTime" && "bg-primary"} text-white/90 p-1.5 px-2.5 rounded cursor-pointer`}>Date Time</button>
            </div>
        </div>
        <ConvertTime selected={selectedTimeConvertion}/>
    </div>
}