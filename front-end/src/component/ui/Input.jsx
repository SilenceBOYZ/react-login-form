import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { HiMiniUser, HiEnvelope } from "react-icons/hi2";

function Input({
  placeholder = "Ex: Type any value",
  name = "default",
  labelField = "Field name",
  type = "text",
  width = "w-full",
  register,
  errorMessage,
  disable = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const style =
    "py-1 px-4 border-2 w-full rounded-md tracking-wider transition-all duration-300  outline-none text-black text-lg placeholder:font-medium placeholder:text-base";
  const labelStyle =
    "capitalize font-semibold text-neutral-500 block  text-base";

  if (type === "password") {
    return (
      <div className={`gap-2 relative transition-all duration-300 ${width} `}>
        <label className={labelStyle}>{labelField}</label>
        <input
          required
          id={name}
          type={!isOpen ? "password" : "text"}
          placeholder={placeholder}
          {...register}
          name={name}
          disabled={disable}
          className={`${style}`}
        />
        <button
          type="button"
          disabled={disable}
          onClick={() => setIsOpen((open) => !open)}
          className="absolute right-4 top-8"
        >
          {" "}
          {isOpen ? (
            <HiEye size={20} className="text-neutral-500" />
          ) : (
            <HiEyeSlash size={20} className="text-neutral-500" />
          )}{" "}
        </button>
        {!errorMessage ? null : (
          <p className=" mt-1 text-sm text-red-600 font-semibold mb-0">
            {errorMessage[`${name}`]?.message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="gap-2 relative transition-all duration-300 mb-2 w-full ">
      <div className="flex justify-between items-center">
        <label className={labelStyle}>{labelField} </label>
        {!errorMessage ? null : (
          <p className="mt-1 text-sm text-red-600 font-semibold">
            {errorMessage[`${name}`]?.message}
          </p>
        )}
      </div>
      <input
        id={name}
        type={type}
        disabled={disable}
        placeholder={placeholder}
        {...register}
        className={`${style}`}
      />
      <div className="absolute right-4 top-8 ">
        {" "}
        {type === "text" ? (
          <HiMiniUser size={20} className="text-neutral-500" />
        ) : (
          <HiEnvelope size={20} className="text-neutral-500" />
        )}{" "}
      </div>
    </div>
  );
}

export default Input;
