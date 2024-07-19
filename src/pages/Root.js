import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import { useState } from "react";

function RootLayout(){
    const [searchQuery, setSearchQuery] = useState('');

    return <>
        <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Outlet context={[searchQuery, setSearchQuery]} />
    </>
}

export default RootLayout;