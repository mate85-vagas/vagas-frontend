import React, { useEffect, useState } from 'react'
import Text from '../../components/Text'
import { useAdminRoutes, useGetEmailListState } from '../../hooks/admin'
import useAuth from '../../hooks/useAuth'
import { translate } from '../../utils/translations'
import './styles.css'

function EnableEmailList() {
  const { userId } = useAuth()
  const [enabled, setEnabled] = useState(true)

  const { manageEmailListState } = useAdminRoutes()
  const { state: emailListState } = useGetEmailListState()

  const changeState = () => {
    manageEmailListState(!enabled, userId)
    setEnabled(!enabled)
  }

  useEffect(() => {
    setEnabled(emailListState)
  }, [emailListState])

  return (
    <div className="option-card-content">
      {emailListState !== undefined ? (
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
