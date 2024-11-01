import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSearchParams, useNavigate } from "react-router-dom"

import { Banner } from "../../components/Banner/Banner"
import { UpButton } from "../../components/UpButton/UpButton"
import { categoryActions } from "../../redux/slices"

const HomePage = () => {
  const { categories, loading } = useSelector((state) => state.categoryReducer)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(categoryActions.getAll())
    window.scrollTo(0, 0)
  }, [])

  const navigator = (query) => {
    navigate({
      pathname: "/devices",
      search: createSearchParams(`category=${query}`).toString(),
    })
  }

  return (
    <div className="">
      <h1>Hi, dear friend!</h1>
      <div className="">
        <p className="">
          Welcome to <span className="">DigiStore</span> - your reliable source for the latest tech
          innovations! We offer a wide range of products, from smartphones to laptops and drones, at
          affordable prices. Shop with us and stay at the forefront of technology!
        </p>
      </div>
      <h1>Choice category</h1>
      {loading ? (
        <div className="">
          <div className=""></div>
        </div>
      ) : (
        <div className="">
          {categories &&
            categories.map((category) => (
              <div className="" key={category._id} onClick={() => navigator(category._id)}>
                {category.name}
              </div>
            ))}
        </div>
      )}
      <Banner />
      <button className="" onClick={() => navigate("/devices")}>
        View all devices
      </button>

      <UpButton />
    </div>
  )
}

export { HomePage }
