const MapPin = ({ color, className = "" }) => {
  return (
    <svg
      width="21"
      height="25"
      viewBox="0 0 21 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_435_381)">
        <path
          d="M17.6694 10.4792C17.6694 17.2753 10.0997 23.1005 10.0997 23.1005C10.0997 23.1005 2.53003 17.2753 2.53003 10.4792C2.53003 8.16175 3.32755 5.93925 4.74713 4.30058C6.16672 2.66192 8.0921 1.74133 10.0997 1.74133C12.1073 1.74133 14.0327 2.66192 15.4523 4.30058C16.8719 5.93925 17.6694 8.16175 17.6694 10.4792Z"
          stroke={color}
          strokeWidth="2.74384"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.0997 13.3918C11.4932 13.3918 12.6229 12.0878 12.6229 10.4792C12.6229 8.87057 11.4932 7.56655 10.0997 7.56655C8.70616 7.56655 7.57648 8.87057 7.57648 10.4792C7.57648 12.0878 8.70616 13.3918 10.0997 13.3918Z"
          stroke={color}
          strokeWidth="2.74384"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_435_381">
          <rect
            width="20.1858"
            height="23.3009"
            fill="white"
            transform="translate(0.00701904 0.770508)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default MapPin
