import { useState } from "react";
import PropTypes from "prop-types";

StarRating.propTypes = {
  ratingLength: PropTypes.number.isRequired,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  messages: PropTypes.array,
  rateColor: PropTypes.array,
  onSet: PropTypes.func,
};

function StarRating({
  ratingLength = 5,
  color = "#ffdf00",
  size = "25",
  messages = [],
  defaultRating = 0,
  ratingColors = [],
  onSet,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const full = tempRating ? tempRating : rating;

  const rateColor =
    ratingColors?.length === ratingLength
      ? ratingColors[tempRating ? tempRating - 1 : rating - 1]
      : color;

  function handleRating(rating) {
    setRating(rating);
    onSet(rating);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {Array.from({ length: ratingLength }, (_, i) => (
        <span
          onClick={() => handleRating(i + 1)}
          onMouseEnter={() => setTempRating(i + 1)}
          onMouseLeave={() => setTempRating(0)}
          style={{ cursor: "pointer" }}
        >
          <div style={{ width: `${size}px` }}>
            {full > i ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={rateColor}
                stroke={rateColor}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke={color || rateColor}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="{2}"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            )}
          </div>
        </span>
      ))}

      <h3 style={{ marginLeft: "4px", fontSize: `${size / 1.5}px` }}>
        {messages?.length === ratingLength
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </h3>
    </div>
  );
}

export default StarRating;
