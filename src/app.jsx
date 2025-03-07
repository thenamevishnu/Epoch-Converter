import { Fragment } from "react"
import { createRoot } from "react-dom/client"
import { Map } from "./routes/map"
import "./app.css"

createRoot(document.getElementById("app")).render(<div className="w-full p-3 max-w-[768px] mx-auto">
    <Map />
</div>)