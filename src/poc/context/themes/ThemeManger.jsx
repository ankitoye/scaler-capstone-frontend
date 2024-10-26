import React, { useState } from 'react'
import Header from './Header';
import Article from './Article';
import Footer from './footer';
//1
export const ThemeWrapper = React.createContext();
function ThemeManger() {
    const [CTheme, setCTheme] = useState("light");
    const toggleTheme = () => {
        const newTheme =
            CTheme == "light" ? "dark" : "light";
        setCTheme(newTheme)
    }

    return (
        <ThemeWrapper.Provider
            value={{ CTheme }}>
            <h1>Theme Management</h1>
            <button
                onClick={toggleTheme}
            >Toggle Theme</button>
            <Header></Header>
            <Article></Article>
            <Footer></Footer>
        </ThemeWrapper.Provider >
    )
}

export default ThemeManger