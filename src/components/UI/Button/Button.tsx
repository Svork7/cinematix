import styles from './Button.module.css'

interface Props {
  className?: any
  buttonName?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
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
