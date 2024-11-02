import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { baseURL } from "../../configs"
import { accountActions, orderActions } from "../../redux/slices"

const OrderPage = () => {
  const { account } = useSelector((state) => state.accountReducer)

  const { deviceList, totalPrice, quantity, error, orderInfo } = useSelector(
    (state) => state.orderReducer,
  )

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(accountActions.getByAccess())
  }, [dispatch])

  const orderCreator = () => {
    try {
      dispatch(
        orderActions.create({
          orderInfo: {
            user: account._id,
            deviceList,
            totalPrice,
          },
        }),
      )
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!error && orderInfo._id) {
      navigate(`payment/${orderInfo._id}`)
      dispatch(orderActions.reset())
    }
  }, [error, orderInfo])

  const incrementDevice = (device) => {
    dispatch(orderActions.addDevice(device))
  }

  const decrementDevice = (_id) => {
    dispatch(orderActions.removeDevice(_id))
  }

  const deleteDevice = (_id) => {
    dispatch(orderActions.deleteDevice(_id))
  }

  const removeOrder = () => {
    dispatch(orderActions.reset())
  }

  return (
    <div className="">
      {!!deviceList.length && (
        <h1>
          Order by <span className="">{account.name}</span>
        </h1>
      )}{" "}
      {deviceList.length ? (
        deviceList.map((device) => (
          <div key={device._id} className="">
            <div className="">
              <img src={`${baseURL}/${device.image}`} alt="" />
            </div>
            <div className="">id: {device._id.slice(-4)}</div>
            <div className="">Name: {device.name}</div>
            <div className="">Price: {device.price}</div>
            <div className="">
              Quantity: {device.quantity}
              <div className="">
                {<button onClick={() => incrementDevice(device)}>▲</button>}
                <button onClick={() => decrementDevice(device._id)}>▼</button>
              </div>
            </div>
            <div className="">Price: {device.totalPrice}</div>
            <div className="">
              <button onClick={() => deleteDevice(device._id)}>
                <HighlightOffIcon color="warning" fontSize="small" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="">It's so empty here 🤔</h1>
      )}
      {!!deviceList.length && totalPrice && quantity && (
        <div className="">
          <div>Quantity: {quantity}</div>
          <div>Total price: {totalPrice}</div>
          <button onClick={removeOrder}>Remove order</button>
          <button onClick={orderCreator}>Next</button>
        </div>
      )}
      {error && <span className="">{error.message}</span>}
    </div>
  )
}

export { OrderPage }
