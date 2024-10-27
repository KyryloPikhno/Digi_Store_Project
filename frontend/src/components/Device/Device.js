import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import { baseURL } from "../../configs"
import { deviceActions, orderActions } from "../../redux/slices"
import deviceDeleteSound from "../../sounds/46c6ae07207785c.mp3"
import deviceAdderSound from "../../sounds/vylet-2.mp3"

const Device = ({ device }) => {
  const dispatch = useDispatch()

  const { account } = useSelector((state) => state.accountReducer)

  const { name, price, images, _id, countInStock } = device

  const audioAdderSound = new Audio(deviceAdderSound)
  const audioDeleteSound = new Audio(deviceDeleteSound)

  const deviceAdder = () => {
    audioAdderSound.play()

    dispatch(
      orderActions.addDevice({ _id, name, image: images[0], quantity: 1, price, countInStock }),
    )
  }

  const deviceDelete = () => {
    audioDeleteSound.play()

    dispatch(deviceActions.deleteDevice({ _id }))
  }

  return (
    <div className="border w-[200px]">
      <NavLink to={`/devices/${_id}`} className="">
        {/* <img className={css.img} src={`${baseURL}/${images[0]}`} alt={images[0]} /> */}
        <img
          className=""
          src={images && images[0] ? images[0] : ""}
          alt={images && images[0] ? images[0] : ""}
        />
      </NavLink>
      <div>{name}</div>
      <div>
        <span>$ {price}</span>
      </div>
      <div className="">
        <button className="" disabled={countInStock === 0} onClick={deviceAdder}>
          {countInStock !== 0 ? "Add to card" : "Out of stock"}
        </button>
        {account?.isAdmin && (
          <button className="" onClick={deviceDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export { Device }
