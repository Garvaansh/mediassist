import { Link } from "react-router-dom";
// import logo from "../assets/logo.svg";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-base-100 shadow-sm">
      {/* Remove this line to make navbar full screen */}
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start flex-1 px-4">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl md:text-3xl text-primary flex items-center gap-2"
          >
            <img
              src="/stethoscope.png"
              alt="Logo"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            MediAssist
          </Link>
        </div>
        <div className="navbar-end flex-none">
          <ul className="menu menu-horizontal px-1 text-sm md:text-xl">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li className="hidden md:block">
              <Link to="/search" className="btn btn-primary">
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
