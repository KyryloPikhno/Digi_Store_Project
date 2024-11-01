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
    formState: { isValid, errors, isSubmitting },
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
    <div className="">
      {query.has("expSession") && <h1>Session end</h1>}

      <FormProvider {...methods}>
        <form
          onChange={() => isError && clearErrors()}
          className="w-[500px] flex flex-col gap-4"
          onSubmit={handleSubmit(submit)}
        >
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
        </form>
      </FormProvider>
    </div>
  )
}

export { LoginPage }
