import { forwardRef } from 'react'
import { Form, FormControlProps } from 'react-bootstrap-5'
import classnames from 'classnames'

type OLFormControlProps = FormControlProps & {
  prepend?: React.ReactNode
  append?: React.ReactNode
}

const FormControl = forwardRef<HTMLInputElement, OLFormControlProps>(
  ({ prepend, append, className, ...props }, ref) => {
    if (prepend || append) {
      const wrapperClassNames = classnames('form-control-wrapper', {
        'form-control-wrapper-sm': props.size === 'sm',
        'form-control-wrapper-lg': props.size === 'lg',
        'form-control-wrapper-disabled': props.disabled,
      })

      const formControlClassNames = classnames(className, {
        'form-control-offset-start': prepend,
        'form-control-offset-end': append,
      })

      return (
        <div className={wrapperClassNames}>
          {prepend && (
            <span className="form-control-start-icon">{prepend}</span>
          )}
          <Form.Control
            {...props}
            className={formControlClassNames}
            ref={ref}
          />
          {append && <span className="form-control-end-icon">{append}</span>}
        </div>
      )
    }

    return <Form.Control {...props} />
  }
)
FormControl.displayName = 'FormControl'

export default FormControl
