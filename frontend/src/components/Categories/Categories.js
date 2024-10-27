import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { categoryActions } from "../../redux/slices"

import css from "./Categories.module.css"

const Categories = () => {
  const { categories, error, loading } = useSelector((state) => state.categoryReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(categoryActions.getAll())
  }, [])

  return (
    <div className={css.container}>
      {error && <span className={css.error}> {error.message}</span>}
      <h3>All categories</h3>
      {categories &&
        categories.map((category) => (
          <div key={category._id}>
            {category.name}
            <button
              onClick={() => dispatch(categoryActions.deleteById({ categoryId: category._id }))}
            >
              <HighlightOffIcon color="warning" fontSize="small" />
            </button>
          </div>
        ))}
    </div>
  )
}

export { Categories }
