import { useState } from "react"
import { useFormContext, Controller } from "react-hook-form"
import InputMask from "react-input-mask"

const InputField = ({
  name,
  title,
  onFocus,
  mask = "",
  type = "text",
  className = "",
  placeholder = "...",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const [passwordVisible, setPasswordVisible] = useState(true)

  const error = errors[name]?.message ?? ""

  return (
    <div className="w-full">
      {title ? (
        <span className="text-[11px] leading-[11px] text-[#232734] mb-1">{title}</span>
      ) : null}

      <div className="relative">
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => (
            <InputMask
              className={`h-12 focus:outline-none px-4 border text-[#000000] w-full text-[14px] ${className} ${
                error ? "border-[#FF1C5E]" : "border-[#000000]"
              }`}
              mask={mask}
              maskChar=" "
              onChange={onChange}
              onFocus={onFocus}
              placeholder={placeholder}
              type={passwordVisible ? type : "text"}
              value={value}
            />
          )}
        />

        {type === "password" ? (
          <button
            className={`text-[14px] absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#FFFFFF] ${
              passwordVisible ? "text-[#000000]" : "text-[#a8aaac]"
            } ${error ? "border-[#FF1C5E]" : "border-[#000000]"}`}
            onClick={() => setPasswordVisible((state) => !state)}
            type="button"
          >
            see pass
          </button>
        ) : null}

        {error ? (
          <span className="first-letter:uppercase absolute top-full right-0 text-[9px] leading-3 text-[#FF1C5E] text-right">
            {error}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export { InputField }
