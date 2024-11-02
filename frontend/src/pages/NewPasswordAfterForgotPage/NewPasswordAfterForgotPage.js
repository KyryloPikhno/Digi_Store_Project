import { joiResolver } from "@hookform/resolvers/joi/dist/joi"
import { Box, Modal } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { NavLink, useSearchParams } from "react-router-dom"

import { passwordForgotService } from "../../services"
import { newPasswordValidator } from "../../validators"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 34,
  p: 4,
  borderRadius: 5,
}

const NewPasswordAfterForgotPage = () => {
  const [query] = useSearchParams()

  let {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      password: null,
      password_confirmation: null,
    },
    resolver: joiResolver(newPasswordValidator),
    mode: "all",
  })

  const [open, setOpen] = useState(false)

  const [error, setError] = useState(false)

  const _actionTokenKey = "action"
  let submit = async (password) => {
    try {
      localStorage.setItem(_actionTokenKey, query.get("token").toString())

      await passwordForgotService.forgotPasswordAfterForgot(password)

      await setOpen(true)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div>
      <form className="" onSubmit={handleSubmit(submit)}>
        <h1>Reset your password</h1>
        <p>Enter your new password. After confirming, you will be asked to log in again.</p>
        <input type="password" placeholder={"password"} {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}

        <input
          type="password"
          placeholder={"confirm new password"}
          {...register("password_confirmation")}
        />
        {errors.password_confirmation && <span>{errors.password_confirmation.message}</span>}

        {error && <span>Token not valid. {error}</span>}

        <button className="" disabled={!isValid}>
          Reset password
        </button>
      </form>
      <Modal
        keepMounted
        open={open}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div className="">
            <h1>Your password changed </h1>
            <NavLink to={"/login"}>Go to login page</NavLink>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export { NewPasswordAfterForgotPage }
