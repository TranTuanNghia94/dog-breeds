import * as React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  helperText?: string,
  error?: string,
  containerClassName?: string,
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ containerClassName, className, type, ...props }, ref) => {

    return (
      <div className={`relative h-[50px] my-4 ${containerClassName}`}>
        {props.label && <span className="text-sm text-black-90 absolute left-2 -top-3.5 z-50 bg-white px-2">{props.label} {props.required && <span className="text-red-500">*</span>}</span>}
        <input
          type={type}
          className="h-[40px] z-10 border rounded-[8px] top-0 left-0 absolute text-base error:border-red-500 w-full focus:outline-none text-black-80 border-grey-300 p-2 hover:border-yellow-400 placeholder:text-black-20 focus:border-yellow-600"
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
