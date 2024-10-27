import Carousel from "embla-carousel-react-component"
import React from "react"

const MediaCarousel = ({ images }) => {
  if (!images) return null

  return (
    <Carousel
      perView={1}
      Thumbs={() => (
        <Carousel.Thumbs perView={3} className="mt-2">
          {images.map((url, i) => (
            <Carousel.Thumb
              key={i}
              index={i}
              selectedClassName="opacity-100"
              nonSelectedClassName="opacity-50"
            >
              <img className="flex object-cover" src={url} />
            </Carousel.Thumb>
          ))}
        </Carousel.Thumbs>
      )}
      className="w-[450px]"
    >
      {images.map((url, i) => (
        <Carousel.Slide key={i}>
          <img className="h-[450px] object-cover" src={url} />
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}

export { MediaCarousel }
