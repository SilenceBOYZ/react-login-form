import { useState } from "react"
import { HiEye, HiEyeSlash } from "react-icons/hi2"
import { HiMiniUser, HiEnvelope   } from "react-icons/hi2";



function Input({
  placeholder = "Ex: Type any value",
  name = "default",
  type = "text",
  width = "w-full",
  register,
  errorMessage,
  disable = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const style = "py-2 px-4 border-2 w-full rounded-3xl tracking-wider transition-all duration-300 bg-transparent outline-none text-white"

  if (type === "password") {
    return (
      <div className={`gap-2 relative transition-all duration-300 mb-2 ${width} `}>
        <input required id={name} type={!isOpen ? "password" : "text"} placeholder={placeholder} {...register} name={name} disabled={disable}
          className={`${style}`} />
        <button type="button" onClick={() => setIsOpen(open => !open)} className="absolute right-4 top-3"> {isOpen ? <HiEye size={20} className="text-white"/> : <HiEyeSlash size={20} className="text-white"/>} </button>
        {!errorMessage ? null : <p className="ps-3 mt-1 text-sm text-white font-semibold">{errorMessage[`${name}`]?.message}</p>}
      </div>
    )
  }

  return (
    <div className="gap-2 relative transition-all duration-300 mb-2 w-full ">
      <input
        id={name}
        type={type}
        disabled={disable}
        placeholder={placeholder}
        {...register}
        className={`${style}`}
      />
      <div className="absolute right-4 top-3 "> {type === "text" ?  <HiMiniUser size={20} className="text-white"/> : <HiEnvelope  size={20} className="text-white"/>} </div>
      {!errorMessage ? null : <p className="ps-3 mt-1 text-sm text-white font-semibold">{errorMessage[`${name}`]?.message}</p>}
    </div>
  )
}

export default Input
