import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const buttonVariants = cva(
    "inline-flex w-full items-center justify-center whitespace-nowrap rounded-[8px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-yellow-100 disabled:border-yellow-300 disabled:text-black-30",
    {
        variants: {
            variant: {
                default: "border border-yellow-600 bg-yellow-600 text-grey-900 hover:bg-yellow-800 active:bg-yellow-600",
                outline:
                    "border border-yellow-600 text-yellow-600 hover:bg-yellow-50 active:bg-yellow-100",
                danger: 
                    "border border-red-600 text-red-600 hover:bg-red-50 active:bg-red-100",
            },
            size: {
                default: "h-[32px] px-4 py-2",
                md: "h-[40px] px-5",
                lg: "h-[48px] px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean,
    loading?: boolean,
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ loading, className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                disabled={loading}
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
