import { PropsWithChildren } from "react";

interface LabelProps {
  label: string;
  disabled?: boolean;
  required?: boolean;
}

export const Label = ({
  children,
  label,
  disabled,
  required
}: PropsWithChildren<LabelProps>) => (
  <div
    className={`
      w-full
      ${disabled ? 'cursor-not-allowed' : 'cursor-text'}
    `}
  >
    <div
      className={`
        w-full block relative
        ${disabled ? 'pointer-events-none' : ''}
      `}
    >
      <label>
        {label}{required ? '*' : ''}
        {children}
      </label>
    </div>
  </div>
)