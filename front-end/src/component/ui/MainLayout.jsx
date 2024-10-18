function MainLayout({ children, configWidth = 'w-[65rem]' }) {
  
  return (
    <div className="w-full flex items-center h-dvh bg-red-300">
      <div className={`${configWidth} max-w-[60rem] h-[32.5rem] max-h-[32.5rem] mx-auto flex bg-white rounded-xl overflow-hidden shadow-xl box-border`}>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
