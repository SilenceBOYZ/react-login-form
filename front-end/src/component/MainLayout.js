function MainLayout({ children }) {
  return (
    <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" >
      {children}
    </div>
  )
}

export default MainLayout
