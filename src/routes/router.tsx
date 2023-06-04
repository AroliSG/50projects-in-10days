
import './router.css';
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorMessage from "./errorMessage";
import Dashboard from "./Dashboard";
import Projects from "../projectList";
import Navbar from "../navigation/navigation";

const Router = () => {
    useEffect (() => {
        document.title = '50 Projects';
    });

    return (
        <Routes>
            <Route path="/" element = {<Navbar />} >
            <Route index element = {<Dashboard/>} />
                {Projects.map ((list, idx) => {
                const dir = list.name.replace (' ', '').toLocaleLowerCase ();
                return (
                    <Route key = {idx * Math.random ()} path={`/${dir}`} element = {<list.Element/>}/>
                )
                })}

                {/* Using path="*"" means "match anything", so this route
                    acts like a catch-all for URLs that we don't have explicit
                    routes for. */}
                <Route path={`/*`} element={<ErrorMessage />} />
            </Route>
        </Routes>
    );
}

export default Router;