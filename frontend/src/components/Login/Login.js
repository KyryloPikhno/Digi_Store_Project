import { joiResolver } from "@hookform/resolvers/joi/dist/joi"
import { useForm, FormProvider } from "react-hook-form"
import { useDispatch } from "react-redux"
import { NavLink, useNavigate, useSearchParams } from "react-router-dom"

import { accountActions } from "../../redux/slices"
import { authService } from "../../services"
import { loginValidator } from "../../validators"
import { InputField } from "../InputField/InputField"

const Login = () => {
  const methods = useForm({
    defaultValues: {
      email: "mr.test@i.ua",
      password: "qwerty123",
    },
    resolver: joiResolver(loginValidator),
    mode: "onSubmit",
  })

  const {
    setError,
    handleSubmit,
    formState: { isValid, errors },
  } = methods

  const [query] = useSearchParams()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  let submit = async (user) => {
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

  return (
    <div className="">
      {query.has("expSession") && <h1>Session end</h1>}

      <FormProvider {...methods}>
        <form className="w-[500px] flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
          <InputField name="email" placeholder="Email" />
          <InputField name="password" type="password" placeholder="Password" />

          {errors.root?.message ? (
            <span className="first-letter:uppercase top-full right-0 text-[9px] leading-3 text-[#FF1C5E]">
              {errors.root.message}
            </span>
          ) : null}

          <button type="submit" className="border" disabled={!isValid}>
            Login
          </button>

          <NavLink to="/password/forgot">Forgot your password?</NavLink>
        </form>
      </FormProvider>
    </div>
  )
}

export { Login }
