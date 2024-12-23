import { joiResolver } from "@hookform/resolvers/joi/dist/joi"
import { Box, Modal } from "@mui/material"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { NavLink } from "react-router-dom"

import { ModalWindow } from "../../components"
import { Button } from "../../components/Button/Button"
import { InputField } from "../../components/InputField/InputField"
import { passwordForgotService } from "../../services"
import { passwordForgotValidator } from "../../validators"

const SuccessModal = ({ open, onClose }) => {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={onClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box className="border gap-20 bg-[#FFFFFF] flex flex-col justify-center items-center">
        <h1>Check your email</h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUufwNUpDO-QJgbjTP78P6r1XxX9pHyfVwJg&usqp=CAU"
          alt="smiley-icon"
        />
        <p>
          Check your<span>email</span>inbox for instructions from us on how to reset your password.
        </p>
        <NavLink to="/login">Go back to login screen</NavLink>
      </Box>
    </Modal>
  )
}

const PasswordForgotPage = () => {
  const [open, setOpen] = useState(false)

  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    resolver: joiResolver(passwordForgotValidator),
    mode: "onSubmit",
  })

  const {
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods

  const submit = async (user) => {
    try {
      await passwordForgotService.forgotPassword(user)
      setOpen(true)
    } catch (e) {
      if (e.response) {
        setError("root", { type: "manual", message: e.response.data.message })
      } else {
        setError("root", { type: "manual", message: "An unexpected error occurred." })
      }
    }
  }

  const isError = !!Object.entries(errors).length

  return (
    <div className="flex h-full justify-center items-center">
      <FormProvider {...methods} className="">
        <form
          onChange={() => isError && clearErrors()}
          className="w-[500px] flex flex-col gap-4 justify-center items-center"
          onSubmit={handleSubmit(submit)}
        >
          <p className="text-center">
            Enter the name and email address you use to login to reset your password.{" "}
          </p>

          <InputField name="name" placeholder="Name" />
          <InputField name="email" placeholder="Email" />

          <Button
            error={errors.root?.message}
            text="Get reset link"
            disabled={isError}
            isSubmit
            isSubmitting={isSubmitting}
          />
        </form>
      </FormProvider>

      <SuccessModal open={open} onClose={() => setOpen(false)} />

      <ModalWindow open={open} onClose={() => setOpen(false)}>
        <h1>Check your email</h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUufwNUpDO-QJgbjTP78P6r1XxX9pHyfVwJg&usqp=CAU"
          alt="smiley-icon"
        />
        <p>
          Check your<span>email</span>inbox for instructions from us on how to reset your password.
        </p>
        <NavLink to="/login">Go back to login screen</NavLink>
      </ModalWindow>
    </div>
  )
}

export { PasswordForgotPage }
