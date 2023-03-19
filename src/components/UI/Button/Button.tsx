import styles from './Button.module.css'

export interface Props {
  className?: string
  buttonName?: string
  variant?: string
  onClick?: React.MouseEventHandler<HTMLElement>
}

const Button = ({
  className = styles.button,
  buttonName = 'Button',
  onClick,
}: Props) => {
  return (
    <button onClick={onClick} className={className || styles.button}>
      {buttonName}
    </button>
  )
}

export default Button
