import { joiResolver } from "@hookform/resolvers/joi/dist/joi"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { Button } from "../../components/Button/Button"
import { InputField } from "../../components/InputField/InputField"
import { authService } from "../../services"
import { registerValidator } from "../../validators"

const RegisterPage = () => {
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: joiResolver(registerValidator),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  const {
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods

  const navigate = useNavigate()

  const submit = async (user) => {
    try {
      const { confirmPassword, ...userWithoutConfirmPassword } = user

      await authService.register(userWithoutConfirmPassword)
      navigate("/login")
    } catch (e) {
      setError(e.response?.data)
    }
  }

  const isError = !!Object.entries(errors).length

  return (
    <div className="flex h-full justify-between bg-[#000000]">
      <div className="flex flex-col items-center justify-center h-full w-[40%] text-[#FFFFFF]">
        <p className="text-[30px]">Welcome Back!</p>
        <p className="text-[14px] mb-4 w-[220px] text-center">
          To keep connected with us please login with your personal info
        </p>

        <div>
          <Button
            text="Login"
            className="border-[2px] border-[#FFFFFF]"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>

      <FormProvider {...methods}>
        <form
          className="flex flex-col w-[60%] bg-[#FFFFFF] rounded-tl-[50px] rounded-bl-[50px] items-center justify-center"
          onChange={() => isError && clearErrors()}
          onSubmit={handleSubmit(submit)}
        >
          <div className="flex w-[500px] flex-col items-center justify-center gap-4">
            <p className="text-[30px]">Create Account</p>

            <InputField name="name" placeholder="Name" />
            <InputField name="email" placeholder="Email" />
            <InputField name="password" placeholder="Password" type="password" />
            <InputField name="confirmPassword" placeholder="Confirm password" type="password" />

            <Button
              text="Register"
              error={errors.root?.message}
              disabled={isError}
              isSubmitting={isSubmitting}
              isSubmit
            />
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export { RegisterPage }
