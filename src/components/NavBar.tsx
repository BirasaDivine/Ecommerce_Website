import { Link } from "react-router-dom";


export default function NavBar(){
    return(
        <header className="border-b bg-white ">
        <div className="flex items-center justify-between py-5 bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] font-medium">
        <Link to="/"
        className="md:text-4xl text-2xl font-bold leading-relaxed prata-regular">
        VINBA
        </Link>
        </div>
        </header>
    )
}