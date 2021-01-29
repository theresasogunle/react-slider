import { useState, useCallback, useEffect } from "react";
import { Draggable } from "gsap/Draggable";
import { gsap } from "gsap";
import "./App.scss";
import images from "./slides";

function App() {
  gsap.registerPlugin(Draggable);

  const [slideIndex, setSlideIndex] = useState(0);

  const increaseIndex = useCallback(() => {
    if (slideIndex !== images.length - 1) {
      setSlideIndex((d) => d + 1);
    }
  }, [slideIndex]);

  const decreaseIndex = useCallback(() => {
    if (slideIndex > 0) {
      setSlideIndex((d) => d - 1);
    }
  }, [slideIndex]);

  useEffect(() => {
    Draggable.create(".container", {
      type: "x",
      bounds: document.getElementById(".slider"),
      throwProps: true,
      onDrag: function () {
        if (this.getDirection() === "left" && slideIndex < 3) increaseIndex();
        else this.endDrag();
        if (this.getDirection() === "right" && slideIndex > 0) decreaseIndex();
        else this.endDrag();
      },
    });
  }, [decreaseIndex, increaseIndex, slideIndex]);

  return (
    <div className="container">
      <section id="slider" className="slider">
        <div className="slider__frame">
          <div
            className="holder"
            style={{
              transform: `translate(-${slideIndex * 100}%)`,
            }}
          >
            {images.map((image) => (
              <img key={image.img} src={image.img} alt={image.name} />
            ))}
          </div>

          <div className="slider__dots">
            {images.map((image, index) => (
              <span
                key={index}
                className="slider__dot"
                style={{
                  opacity: slideIndex >= index ? 1 : 0.2,
                  marginRight: slideIndex === index ? 30 : 12,
                }}
              ></span>
            ))}
          </div>
          <div className="slider__controls">
            <button
              onClick={decreaseIndex}
              style={{ opacity: slideIndex === 0 ? 0.2 : 1 }}
            >
              <img
                src="/slider/arrow.svg"
                style={{ transform: "rotate(180deg)" }}
                alt="Arrow"
              />
            </button>
            <div className="slider__controls__divider" />
            <button
              onClick={increaseIndex}
              style={{ opacity: slideIndex === images.length - 1 ? 0.2 : 1 }}
            >
              <img src="/slider/arrow.svg" alt="Arrow" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
