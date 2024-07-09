import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import { ToyIndex } from "./pages/ToyIndex.jsx"
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { Home } from "./pages/Home.jsx"
import { store } from "./store/store.js"
import { AppHeader } from "./cmps/AppHeader.jsx"


import "../src/assets/style/main.css"

export function App() {

  return (
   
     <Provider store={store}>
            <Router>
                <div className="app-main-layout">
                    <AppHeader />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/toy" element={<ToyIndex />} />
                        <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                        <Route path="/toy/edit" element={<ToyEdit />} />

                        <Route path="/toy/:toyId" element={<ToyDetails />} />

                    </Routes>
                </div>
            
            </Router>
       </Provider>
  )
}


