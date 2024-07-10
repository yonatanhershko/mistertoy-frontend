import { NavLink } from "react-router-dom"


export function AppHeader() {
    return (
        <header className="header-container">
            <h2 className="logo">Mister Toy</h2>
            <nav className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </header>
    )
}