import { joiResolver } from "@hookform/resolvers/joi/dist/joi"
import { FormProvider, useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"

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
    <FormProvider {...methods}>
      <form
        className="w-[500px] flex flex-col gap-4"
        onChange={() => isError && clearErrors()}
        onSubmit={handleSubmit(submit)}
      >
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

        <div className="">
          No account yet?<NavLink to="/register">Sign up</NavLink>
        </div>
      </form>
    </FormProvider>
  )
}

export { RegisterPage }
