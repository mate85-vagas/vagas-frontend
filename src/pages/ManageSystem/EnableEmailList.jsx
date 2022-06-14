import React, { useEffect, useState } from 'react'
import Text from '../../components/Text'
import { useAdminRoutes, useGetEmailListState } from '../../hooks/admin'
import { translate } from '../../utils/translations'
import './styles.css'

function EnableEmailList() {
  const [enabled, setEnabled] = useState()

  const { manageEmailListState } = useAdminRoutes()
  const { state: emailListState } = useGetEmailListState()

  const changeState = () => {
    manageEmailListState(!enabled)
    setEnabled(!enabled)
  }

  useEffect(() => {
    if (emailListState === undefined) return
    setEnabled(emailListState)
  }, [emailListState])

  return (
    <div className="option-card-content">
      {enabled !== undefined ? (
        <>
          <Text text="Enviar e-mails de divulgação" />
          <label className="checkbox" htmlFor="emaillist-checkbox">
            <input
              type="checkbox"
              id="emaillist-checkbox"
              checked={enabled}
              onChange={() => changeState()}
            />
            {enabled ? 'Habilitado' : 'Desabilitado'}
          </label>
        </>
      ) : (
        <Text text={translate('getting_configs')} />
      )}
    </div>
  )
}

export default EnableEmailList
