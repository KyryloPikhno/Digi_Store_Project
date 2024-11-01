const Button = ({
  onClick,
  text,
  disabled,
  error = "",
  styles = "",
  isSubmit = false,
  isSubmitting = false,
}) => {
  return (
    <div>
      <button
        className={`px-[22px] border whitespace-nowrap text-sm h-9 leading-[11px] font-medium transform sm:transform-none sm:h-12 ${styles} ${
          disabled ? "cursor-default" : "bg-yellow-200"
        }`}
        disabled={disabled || isSubmitting}
        onClick={onClick}
        type={isSubmit ? "submit" : "button"}
      >
        {isSubmitting ? "Logging in..." : `${text}`}
      </button>

      {error ? (
        <span className="first-letter:uppercase top-full right-0 text-[9px] leading-3 text-[#FF1C5E]">
          {error}
        </span>
      ) : null}
    </div>
  )
}

export { Button }
