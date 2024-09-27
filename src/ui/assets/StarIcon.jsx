const StarIcon = ({ color, className = "" }) => {
  return (
    <svg
      width="21"
      height="25"
      viewBox="0 0 21 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_435_943)">
        <path
          d="M10.8384 2.7124L13.4373 8.79005L19.2492 9.77063L15.0438 14.4988L16.0363 21.1784L10.8384 18.023L5.64058 21.1784L6.63305 14.4988L2.42767 9.77063L8.2395 8.79005L10.8384 2.7124Z"
          stroke={color}
          strokeWidth="2.74384"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_435_943">
          <rect
            width="20.1858"
            height="23.3009"
            fill="white"
            transform="translate(0.745422 0.770508)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default StarIcon
