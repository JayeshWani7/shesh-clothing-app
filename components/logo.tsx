export function Logo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <mask id="logoMask">
          <rect width="32" height="32" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.1351 12.7364L16 9L9 21.25H13.2701L18.1351 12.7364ZM20.1506 16.2636L17.3013 21.25H23L20.1506 16.2636Z"
            fill="black"
          />
        </mask>
      </defs>
      <circle
        cx="16"
        cy="16"
        r="14.75"
        fill="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        mask="url(#logoMask)"
      />
    </svg>
  )
}

