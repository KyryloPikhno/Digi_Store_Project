const Button = ({ onClick, title, disabled, styles = "", isSubmit = false }) => {
  return (
    <button
      className={`px-[22px] whitespace-nowrap text-sm h-9 leading-[11px] font-medium transform sm:transform-none sm:h-12 ${styles} ${type} ${
        disabled ? "cursor-default" : ""
      }`}
      disabled={disabled}
      onClick={onClick}
      type={isSubmit ? "submit" : "button"}
    >
      {title}
    </button>
  )
}

export { Button }
