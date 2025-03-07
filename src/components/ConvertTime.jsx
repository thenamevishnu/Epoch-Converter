import { useEffect, useState } from "react"
import { FaArrowRight } from "react-icons/fa"

export const ConvertTime = ({ selected="" }) => {
    
    const [query, setQuery] = useState({timestamp: Math.floor(new Date().getTime() / 1000), datetime: "2025-03-20T14:08"})
    const [error, setError] = useState("")
    const [timeOutput, setTimeOutput] = useState({
        UNIX_SECONDS: "",
        UNIX_MILLISECONDS: "",
        UTC_ISO: "",
        LOCAL_DATE_TIME: ""
    })

    const handleTimeUpdate = () => {
        try {
            const date = selected == "Timestamp" ? new Date(query.timestamp * 1000) : new Date(query.datetime)
            const time = date.toLocaleString("default", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })
            setTimeOutput({
                UNIX_SECONDS: Math.floor(date.getTime() / 1000),
                UNIX_MILLISECONDS: date.getTime(),
                UTC_ISO: date.toISOString(),
                LOCAL_DATE_TIME: time
            })
            return setError("")
        } catch (err) {
            return setError(err.message)
        }
    }

    useEffect(() => {
        handleTimeUpdate()
    }, [query, selected])

    return <div className="border border-secondary rounded p-2">
        <div className="text-sm text-center uppercase tracking-widest my-3">Convert {selected} to {selected == "Timestamp" ? "Date Time" : "Timestamp"}</div>
        {selected == "Timestamp" ? <input type="text" placeholder={`Enter ${selected}`} value={query.timestamp} onChange={(e) => setQuery(prev => ({ ...prev, timestamp: isNaN(e.target.value) ? prev.timestamp : e.target.value }))} className="outline-none border border-secondary rounded p-2 w-full" /> : <input type="datetime-local" placeholder={`Enter ${selected}`} value={query.datetime} onChange={(e) => setQuery(prev => ({ ...prev, datetime: e.target.value }))} className="outline-none border border-secondary rounded p-2 w-full" />}
        <div className="mt-3 flex flex-col gap-2">
            {
                !error && Object.entries(timeOutput).map(([key, value]) => {
                    return <div key={key} className="flex border gap-2 items-center flex-col rounded sm:flex-row border-secondary p-3">
                        <div className="text-xs w-full">{key.replaceAll("_", " ")}</div>
                        <div className="w-full text-start sm:text-end truncate flex items-center justify-between">
                            <div className="hidden sm:block"><FaArrowRight /></div>
                            <div>{value}</div>
                        </div>
                    </div>
                })
            }
        </div>
        <div className="text-red-500 text-sm text-center">{error}</div>
    </div>
}
