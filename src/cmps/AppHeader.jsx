import { NavLink } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home'
// import FilterAlt from '@mui/icons-material/FilterAlt'


export function AppHeader() {
    return (
        <section className=" header-bgcl full main-layout ">
            <header className="header-container" >
                    <h2 className="logo">Mister Toy</h2>
                    <nav className="nav-links">
                        <NavLink to="/"> <HomeIcon /></NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/toy">Toys</NavLink>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        {/* <FilterAlt/> */}
                    </nav>
            </header>
        </section>
    )
}