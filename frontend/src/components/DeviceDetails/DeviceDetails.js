import moment from "moment/moment"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { accountActions, deviceActions, orderActions } from "../../redux/slices"
import deviceDeleteSound from "../../sounds/46c6ae07207785c.mp3"
import deviceAdderSound from "../../sounds/vylet-2.mp3"
import { MediaCarousel } from "../MediaCarousel/MediaCarousel"
import { SimilarDeviceCarousel } from "../SimilarDeviceCarousel/SimilarDeviceCarousel"

const DeviceDetails = () => {
  const { id } = useParams()

  const { device, similarDevices, error, loading } = useSelector((state) => state.deviceReducer)

  const { account } = useSelector((state) => state.accountReducer)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { _id, name, price, countInStock, category, brand, color, createdAt, description, images } =
    device

  useEffect(() => {
    dispatch(deviceActions.getById({ id }))

    dispatch(accountActions.getByAccess())

    window.scrollTo(0, 0)
  }, [id])

  const audioAdderSound = new Audio(deviceAdderSound)
  const audioDeleteSound = new Audio(deviceDeleteSound)

  const deviceAdder = () => {
    audioAdderSound.play()

    dispatch(
      orderActions.addDevice({ _id, name, image: images[0], quantity: 1, price, countInStock }),
    )
  }

  const deleteDevice = () => {
    audioDeleteSound.play()

    dispatch(deviceActions.deleteDevice({ _id }))

    navigate("/devices")
  }

  useEffect(() => {
    if (category && _id) {
      dispatch(deviceActions.getSimilarDevices({ categoryId: category._id, deviceId: _id }))
    }
  }, [category, _id])

  return (
    <div className="">
      {error && <span className="">{error.message}</span>}
      {loading ? (
        <div className=""></div>
      ) : (
        <div className="flex">
          <div className="">{images && images[0] ? <MediaCarousel images={images} /> : null}</div>
          <div className="">
            {name && <h2>{name}</h2>}
            {price && <h2 className="">$ {price}</h2>}
            <div>Free delivery in Ukraine and Kyiv with self-delivery</div>
            <hr />
            <div className="">
              {category && <div>Category: {category.name}</div>}
              {brand && <div>Brand: {brand.name}</div>}
              <div className="">
                {color && <div>Color: {color.name}</div>}
                {color && <div className="" style={{ background: color.name }}></div>}
              </div>
              {countInStock && <div>Count in stock: {countInStock} pieces</div>}
              <div>Created: {createdAt && moment(createdAt).format("dd/mm/yy HH:mm:ss")}</div>
              {description && (
                <div className="">
                  Description:
                  <br />
                  {description}
                </div>
              )}
            </div>
            <div className="">
              <button className="" disabled={countInStock === 0} onClick={deviceAdder}>
                {countInStock !== 0 ? "Add to card" : "Device is out of stock"}
              </button>
              {account?.isAdmin && (
                <button className="" onClick={deleteDevice}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <SimilarDeviceCarousel similarDevices={similarDevices} />
    </div>
  )
}

export { DeviceDetails }
