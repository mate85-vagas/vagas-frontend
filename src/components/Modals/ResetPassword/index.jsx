import React from 'react'
import PropTypes from 'prop-types'
import ButtonRectangle from '../../Buttons/ButtonRectangle'
import './style.css'
import TextInput from '../../TextInput'

function ResetPasswordModal({
  title,
  description,
  onCancel,
  onConfirm,
  opened,
  onEmailChange,
  emailResetPassword,
}) {
  return (
    <div className={`modal ${opened ? 'is-active' : ''} modal-reset-password`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
        </header>
        <section className="modal-card-body">
          <p className="modal-reset-password-description">{description}</p>
          <TextInput
            className="modal-reset-password-email-receiver"
            placeholder="Email"
            setValue={onEmailChange}
            value={emailResetPassword}
            type="email"
          />
        </section>
        <footer className="modal-card-foot">
          <ButtonRectangle
            className="is-red"
            label="Cancelar"
            onClick={onCancel}
          />
          <ButtonRectangle
            className="is-blue"
            label="Confirmar"
            onClick={onConfirm}
          />
        </footer>
      </div>
    </div>
  )
}

ResetPasswordModal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  opened: PropTypes.bool,
  onEmailChange: PropTypes.func,
  emailResetPassword: PropTypes.string,
}

ResetPasswordModal.defaultProps = {
  opened: false,
  onCancel: () => {},
  onConfirm: () => {},
  onEmailChange: () => {},
  emailResetPassword: '',
}

export default ResetPasswordModal
