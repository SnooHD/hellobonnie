import { ButtonHTMLAttributes, PropsWithChildren } from "react"

export const Button = ({
    children,
    className = '',
    ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
    return (
        <button
            className={`
                ${className}
                transition-colors
                bg-blue p-xxs rounded text-white
                hover:bg-blue/80
                active:bg-blue/50
                disabled:bg-gray
                w-[100px]
            `}
            {...rest}
        >
            {children}
        </button>
    )
}