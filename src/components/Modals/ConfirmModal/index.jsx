import React from 'react'
import PropTypes from 'prop-types'
import ButtonRectangle from '../../Buttons/ButtonRectangle'

function ConfirmModal({
  title,
  description,
  isDangerous,
  onConfirm,
  onCancel,
  opened,
}) {
  return (
    <div className={`modal ${opened ? 'is-active' : ''}`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
        </header>
        <section className="modal-card-body">{description}</section>
        <footer className="modal-card-foot">
          <ButtonRectangle
            className={isDangerous ? 'is-red' : 'is-green'}
            label="Confirmar"
            onClick={onConfirm}
          />
          <ButtonRectangle
            className="is-blue"
            label="Cancelar"
            onClick={onCancel}
          />
        </footer>
      </div>
    </div>
  )
}

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  isDangerous: PropTypes.bool,
  opened: PropTypes.bool,
}

ConfirmModal.defaultProps = {
  isDangerous: false,
  opened: false,
  onConfirm: () => {},
  onCancel: () => {},
}

export default ConfirmModal
