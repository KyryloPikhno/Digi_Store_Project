const Button = ({
  onClick,
  text,
  disabled,
  error = "",
  className = "",
  isSubmit = false,
  isSubmitting = false,
}) => {
  return (
    <div className="w-full relative">
      <button
        className={`px-[22px] w-full rounded-[8px] whitespace-nowrap text-[#FFFFFF] text-[14px] leading-[14px] font-medium h-12 ${className} ${
          disabled ? "cursor-default bg-[#EEEEEE]" : "bg-[#000000]"
        }`}
        disabled={disabled || isSubmitting}
        onClick={onClick}
        type={isSubmit ? "submit" : "button"}
      >
        {isSubmitting ? "Logging in..." : `${text}`}
      </button>

      {error ? (
        <span className="absolute bottom-[-14px] text-center left-2 first-letter:uppercase text-[9px] leading-3 text-[#FF1C5E]">
          {error}
        </span>
      ) : null}
    </div>
  )
}

export { Button }
