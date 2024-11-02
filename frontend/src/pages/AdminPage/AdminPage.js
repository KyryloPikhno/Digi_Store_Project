import { joiResolver } from "@hookform/resolvers/joi/dist/joi"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { Categories, CreateDeviceForm, Brands, Colors } from "../../components"
import { brandActions, categoryActions, colorActions } from "../../redux/slices"
import { brandValidator, categoryValidator, colorValidator } from "../../validators"

const BrandForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      brand: null,
    },
    resolver: joiResolver(brandValidator),
    mode: "all",
  })

  const dispatch = useDispatch()

  const submit = async (obj) => {
    try {
      if (obj) {
        await dispatch(brandActions.create({ brand: obj }))
        reset()
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className="">
      <h3>Add new brand</h3>
      <form className="" onSubmit={handleSubmit(submit)}>
        <input type="text" placeholder={"Brand"} {...register("brand")} />
        {errors.brand && <span>{errors.brand.message}</span>}
        <button className="" disabled={!isValid}>
          Save
        </button>
      </form>
    </div>
  )
}

const CategoryForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      category: null,
    },
    resolver: joiResolver(categoryValidator),
    mode: "all",
  })

  const dispatch = useDispatch()

  const submit = async (obj) => {
    try {
      if (obj) {
        await dispatch(categoryActions.create({ category: obj }))
        reset()
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className="">
      <h3>Add new category</h3>
      <form className="" onSubmit={handleSubmit(submit)}>
        <input type="text" placeholder={"Category"} {...register("category")} />
        {errors.category && <span>{errors.category.message}</span>}
        <button className="" disabled={!isValid}>
          Save
        </button>
      </form>
    </div>
  )
}

const ColorForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      color: null,
    },
    resolver: joiResolver(colorValidator),
    mode: "all",
  })

  const dispatch = useDispatch()

  const submit = async (obj) => {
    try {
      if (obj) {
        await dispatch(colorActions.create({ color: obj }))
        reset()
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className="">
      <h3>Add new color</h3>
      <form className="" onSubmit={handleSubmit(submit)}>
        <input type="text" placeholder={"Color"} {...register("color")} />
        {errors.color && <span>{errors.color.message}</span>}
        <button className="" disabled={!isValid}>
          Save
        </button>
      </form>
    </div>
  )
}

const AdminPage = () => {
  return (
    <div className="">
      <div className="">
        <Categories />
        <Brands />
        <Colors />
      </div>
      <div className="">
        <div className="">
          <CategoryForm />
          <BrandForm />
          <ColorForm />
        </div>
        <div>
          <CreateDeviceForm />
        </div>
      </div>
    </div>
  )
}

export { AdminPage }
