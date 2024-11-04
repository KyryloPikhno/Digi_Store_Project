import { joiResolver } from "@hookform/resolvers/joi/dist/joi"
import { useForm, FormProvider } from "react-hook-form"
import { useDispatch } from "react-redux"
import { NavLink, useNavigate, useSearchParams } from "react-router-dom"

import { Button } from "../../components/Button/Button"
import { InputField } from "../../components/InputField/InputField"
import { accountActions } from "../../redux/slices"
import { authService } from "../../services"
import { loginValidator } from "../../validators"

const LoginPage = () => {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: joiResolver(loginValidator),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  const {
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods

  const [query] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submit = async (user) => {
    try {
      const { data } = await authService.login(user)

      authService.setTokens(data)
      dispatch(accountActions.getByAccess())
      navigate("/home")
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
    <div className="flex h-full justify-between">
      {query.has("expSession") && <h1>Session end</h1>}

      <FormProvider {...methods}>
        <form
          onChange={() => isError && clearErrors()}
          className="flex flex-col w-[60%] items-center justify-center"
          onSubmit={handleSubmit(submit)}
        >
          <div className="flex w-[500px] flex-col items-center justify-center gap-4">
            <p className="text-[30px]">Sign into Account</p>
            <InputField name="email" placeholder="Email" />
            <InputField name="password" type="password" placeholder="Password" />

            <Button
              text="Login"
              error={errors.root?.message}
              disabled={isError}
              isSubmitting={isSubmitting}
              isSubmit
            />
            <NavLink to="/password/forgot">Forgot your password?</NavLink>
          </div>
        </form>
      </FormProvider>

      <div className="rounded-tl-[50px] flex flex-col items-center justify-center h-full w-[40%] bg-[#000000] text-[#FFFFFF]">
        <p className="text-[30px]">Hello, Friend!</p>
        <p className="text-[14px] mb-4">Fill up personal information and start journey with us</p>

        <div>
          <Button
            text="Register"
            className="border-[2px] border-[#FFFFFF]"
            onClick={() => navigate("/register")}
          />
        </div>
      </div>
    </div>
  )
}

export { LoginPage }
