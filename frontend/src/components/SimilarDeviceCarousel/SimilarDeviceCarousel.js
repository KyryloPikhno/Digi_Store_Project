import Carousel from "embla-carousel-react-component"

import { Device } from "../Device/Device"

const SimilarDeviceCarousel = ({ similarDevices }) => {
  const perView = similarDevices.length

  return (
    <div>
      {similarDevices.length ? <h1>Similar devices</h1> : null}
      <Carousel perView={perView} className="flex">
        {similarDevices.map((device, i) => (
          <Carousel.Slide key={i} className="mr-2">
            <div className="p-4">
              <Device device={device} />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  )
}

export { SimilarDeviceCarousel }
