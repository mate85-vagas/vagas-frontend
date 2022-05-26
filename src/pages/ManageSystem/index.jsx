/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Text from '../../components/Text'
import useAuth from '../../hooks/useAuth'
import { useGetUserById } from '../../hooks/user'
import SendInvite from './SendInvite'
import './styles.css'

const optionsSettings = [
  {
    optionName: 'Enviar Convites',
    cardTitle: 'Enviar convite de cadastro',
    cardComponent: () => <SendInvite />,
  },
  {
    optionName: 'Gerenciar Listas',
    cardTitle: 'Gerenciar listas de divulgação',
    cardComponent: () => <SendInvite />,
  },
  {
    optionName: 'Permissões',
    cardTitle: 'Permissões de administrador',
    cardComponent: () => <SendInvite />,
  },
]

const manageOptions = optionsSettings.map((setting, id) => ({
  ...setting,
  id,
}))

// Component that renders the page to the admin manage the system
function ManageSystem() {
  const { userId } = useAuth()
  const [manageOption, setManageOption] = useState(manageOptions[0])

  const user = useGetUserById(userId)

  const renderOptionCard = (option) => {
    const { id, optionName } = option
    const isSelected = id === manageOption.id
    return (
      <button
        key={optionName}
        className={`card option ${isSelected && 'option-selected'}`}
        type="button"
        onClick={() => setManageOption(option)}
      >
        <Text
          className={`is-bold ${isSelected && 'is-white'}`}
          text={optionName}
        />
      </button>
    )
  }

  const renderInfoCard = (text) => (
    <div className="card manage-container">
      <Text className="is-blue is-bold" text={text} size={24} />
    </div>
  )

  return (
    <Layout isFinalPage>
      <div className="manage-system">
        {user ? (
          user.isAdmin ? (
            <>
              <div className="options">
                {manageOptions.map((option) => renderOptionCard(option))}
              </div>
              <div className="card manage-container">
                <Text
                  className="is-bold is-blue option-card-title"
                  text={manageOption.cardTitle}
                  size={22}
                />
                {manageOption.cardComponent && manageOption.cardComponent()}
              </div>
            </>
          ) : (
            renderInfoCard('Você não tem permissão para acessar essa página!')
          )
        ) : (
          renderInfoCard('Verificando usuário...')
        )}
      </div>
    </Layout>
  )
}

export default ManageSystem
