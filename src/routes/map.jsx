import { BrowserRouter, Route, Routes } from "react-router"
import { HomePage } from "../pages/home.page"

export const Map = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="" Component={HomePage} />
            </Route>
        </Routes>
    </BrowserRouter>
}