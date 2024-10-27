import { joiResolver } from "@hookform/resolvers/joi/dist/joi"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { brandActions, colorActions, categoryActions } from "../../redux/slices"
import { brandValidator, categoryValidator, colorValidator } from "../../validators"
import { Brands } from "../Brands/Brands"
import { Categories } from "../Categories/Categories"
import { Colors } from "../Colors/Colors"
import { CreateDeviceForm } from "../CreateDeviceForm/CreateDeviceForm"

import css from "./Admin.module.css"

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
    <div className={css.container}>
      <h3>Add new brand</h3>
      <form className={css.formCommon} onSubmit={handleSubmit(submit)}>
        <input type="text" placeholder={"Brand"} {...register("brand")} />
        {errors.brand && <span>{errors.brand.message}</span>}
        <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}>
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
    <div className={css.container}>
      <h3>Add new category</h3>
      <form className={css.formCommon} onSubmit={handleSubmit(submit)}>
        <input type="text" placeholder={"Category"} {...register("category")} />
        {errors.category && <span>{errors.category.message}</span>}
        <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}>
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
    <div className={css.container}>
      <h3>Add new color</h3>
      <form className={css.formCommon} onSubmit={handleSubmit(submit)}>
        <input type="text" placeholder={"Color"} {...register("color")} />
        {errors.color && <span>{errors.color.message}</span>}
        <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}>
          Save
        </button>
      </form>
    </div>
  )
}

const Admin = () => {
  return (
    <div className={css.container}>
      <div className={css.block}>
        <Categories />
        <Brands />
        <Colors />
      </div>
      <div className={css.block}>
        <div className={css.wrap}>
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

export { Admin }
