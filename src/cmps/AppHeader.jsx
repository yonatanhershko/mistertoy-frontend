import { NavLink } from "react-router-dom"


export function AppHeader() {
    return (
        <header className="header-container">
            <h2>Toys</h2>
            <nav className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
            </nav>
        </header>
    )
}