import { joiResolver } from "@hookform/resolvers/joi"
import { Box, Modal } from "@mui/material"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import imgChip from "../../img/card.png"
import imgMaster from "../../img/mastercard.png"
import { orderActions } from "../../redux/slices"
import { paymentValidator } from "../../validators"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 34,
  p: 4,
  borderRadius: 5,
}

const PaymentPage = () => {
  const { orderId } = useParams()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const { orderStatus, error } = useSelector((state) => state.orderReducer)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(paymentValidator),
    mode: "all",
  })

  let submit = async (orderInfo) => {
    try {
      await dispatch(orderActions.update({ orderId, orderInfo }))

      setOpen(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (orderStatus) {
      dispatch(orderActions.reset())
    }
  }, [orderStatus, dispatch])

  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const years = Array.from({ length: 15 }, (_, i) => 2023 + i)

  return (
    <div className="">
      <form onSubmit={handleSubmit(submit)} className="">
        <div className="">
          <img className="" src={imgChip} alt={imgChip} />
          <img className="" src={imgMaster} alt={imgMaster} />

          <input
            className=""
            type="number"
            placeholder="XXXX  XXXX  XXXX  XXXX"
            {...register("card")}
          />
          {errors.card && <span>{errors.card.message}</span>}

          <select {...register("month")} className="" id="monthSelect">
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          {errors.month && <span>{errors.month.message}</span>}

          <select {...register("year")} className="" id="monthSelect">
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          {errors.year && <span>{errors.year.message}</span>}
        </div>

        <div className="">
          <input className="" type="text" placeholder={"Country"} {...register("country")} />
          {errors.country && <span>{errors.country.message}</span>}

          <input className="" type="text" placeholder={"City"} {...register("city")} />
          {errors.city && <span>{errors.city.message}</span>}

          <input className="" type="text" placeholder={"Zip"} {...register("zip")} />
          {errors.zip && <span>{errors.zip.message}</span>}
        </div>

        <input className="" type="text" placeholder={"Address"} {...register("address")} />
        {errors.address && <span>{errors.address.message}</span>}

        <input className="" type="text" placeholder={"Phone"} {...register("phone")} />
        {errors.phone && <span>{errors.phone.message}</span>}

        <button className="" disabled={!isValid}>
          Pay for it
        </button>
        {error && <span>{error.message}</span>}
      </form>
      <Modal
        keepMounted
        open={open}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div className="">
            <h1>Success 😊</h1>
            <div className="">
              <button className="" onClick={() => navigate("/account")}>
                Go to account
              </button>
              <button className="" onClick={() => navigate("/devices")}>
                Continue shopping
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export { PaymentPage }
