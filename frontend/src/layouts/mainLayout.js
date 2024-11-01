import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"

import { Footer, Header } from "../components"
import { accountActions } from "../redux/slices"

const MainLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(accountActions.getByAccess())
  }, [dispatch])

  return (
    <div>
      <div className="border">
        <Header />
      </div>
      <div className="border h-[90vh] flex items-center justify-center">
        <Outlet />
      </div>
      <div className="border">
        <Footer />
      </div>
    </div>
  )
}

export { MainLayout }
