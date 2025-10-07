import { useState } from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  }
  return (
    <nav className="flex justify-between items-center w-screen h-28 bg-ookay margin-0 px-10 auto relative">
      {/* Hamburger Menu */}
      <button className="flex justify-center items-center gap-2 w-auto relative z-50" onClick={ handleClick }>
        <div className="flex flex-col gap-1">
          <span className="w-7 h-[3px] bg-yes rounded-sm"></span>
          <span className="w-6 h-[3px] bg-yes rounded-sm"></span>
          <span className="w-7 h-[3px] bg-yes rounded-sm"></span>
        </div>
      </button>
      <img src="./logo/Patteserie.svg" alt="Patteserie" className="w-48" />
      <a href="/" className=""><i className="bx bx-shopping-bag text-2xl text-yes"></i></a>
      
      {isOpen && <div className="absolute top-0 left-0 min-h-screen min-w-80 bg-blue-500 transition-all duration-300 ease-out">
        hello
      </div>}

    </nav>
  )
}

export default Navbar