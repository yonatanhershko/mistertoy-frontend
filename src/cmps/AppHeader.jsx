import { NavLink } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu';

import { useEffect, useState } from 'react'
export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)



    return (
        <section className="header-bgcl full main-layout" >
            <header className="header-container " >
                <h2 className="logo">Yona's ToyShop</h2>
                <nav className="nav-links">
                    <NavLink to="/"> <HomeIcon /></NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </nav>
                <span className={`btn-toggle-menu ${isMenuOpen ? '' : 'menu-btn-display'}`} onClick={() => setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)}>
                    <div className="hamburger-lines">
                        <MenuIcon />
                    </div>
                </span>
            </header>

            {/* mobile */}
            <section className={`main-header-mobile ${isMenuOpen ? 'menu-open-display' : ''}`}>
                <nav className="header-mobile-text">
                    <span className="x-mobile-btn" onClick={() => setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)}>
                      
                    X
      
                    </span>
                    <NavLink to="/" > <HomeIcon /></NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>

            </section>

        </section>
    )
}