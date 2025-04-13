//2nd and 3rd views in figma, should have big search and log in / out
import React from "react";
import Navbar from "../Navbar";

const SearchPage = () => {
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const searchParam = new FormData(e.target as HTMLFormElement);
        const search = searchParam.get('search');
        
    }
    return (
        <>
            <Navbar />
            <form>
                <input type="text"
                placeholder="Enter search here"
                name="search"></input>
                <input type="hidden" value="./polls"></input>
                <input type="submit" onSubmit={onSubmit}></input>
            </form>
        </>
    );
};
export default SearchPage;