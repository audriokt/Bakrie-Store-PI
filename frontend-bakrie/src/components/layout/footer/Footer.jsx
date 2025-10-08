const Footer = () => {
  return (
    <footer className="flex justify-center items-center w-screen h-40 bg-ookay">
      <div>
        <img src="./logo/Patteserie.svg" alt="Patteserie" className="w-48" />
        {/* Copyright */}
        <div className="flex items-center gap-[2px] text-yes px-12">
          <span className="text-sm md:text-xl">&copy;</span>
          <p className="text-[10px] font-semibold pt-[2px]">
            2025 Patteserie
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer