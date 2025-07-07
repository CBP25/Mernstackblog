import { useEffect, useReducer } from "react";
import { images } from "./Datas";
import "../../Sass/_banner.scss"; // Import SCSS properly

// Reducer function to handle background changes
const reducer = (state, action) => {
  switch (action.type) {
    case "FADE_OUT":
      return { ...state, fading: true }; // Start fade-out
    case "NEXT_IMAGE":
      return {
        index: (state.index + 1) % images.length,
        fading: false,
        lastInteraction: Date.now(),
      };
    case "PREV_IMAGE":
      return {
        index: (state.index - 1 + images.length) % images.length,
        fading: false,
        lastInteraction: Date.now(),
      };
    case "RESET_AUTOPLAY":
      return { ...state, lastInteraction: Date.now() };
    default:
      return state;
  }
};

export function BannerSlider() {
  const [state, dispatch] = useReducer(reducer, {
    index: 0,
    fading: false,
    lastInteraction: Date.now(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - state.lastInteraction >= 10000) {
        // If 10s has passed since last interaction
        dispatch({ type: "FADE_OUT" });
        setTimeout(() => {
          dispatch({ type: "NEXT_IMAGE" });
        }, 500); // Wait for fade-out effect
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [state.lastInteraction]);

  // Function to manually change images and reset autoplay timer
  const handleClick = (type) => {
    dispatch({ type: "FADE_OUT" });
    setTimeout(() => {
      dispatch({ type });
      dispatch({ type: "RESET_AUTOPLAY" }); // Reset autoplay countdown
    }, 500); // Wait for fade-out
  };

  return (
    <div className="banner-container">
      {/* Background Image */}
      <div
        className={`banner-slider ${state.fading ? "fade-out" : "fade-in"}`}
        style={{ backgroundImage: `url(${images[state.index]})` }}
      />

      {/* Arrow Controls */}
      <div className="arrow-controls">
        <div className="arrow left" onClick={() => handleClick("PREV_IMAGE")}>
          &lt;
        </div>
        <div className="arrow right" onClick={() => handleClick("NEXT_IMAGE")}>
          &gt;
        </div>
      </div>
    </div>
  );
}
