import React from 'react'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'

import './styles.css'

interface Props {
  error?: string
}

const CompletedForm: React.FC<Props> = ({ error }) => {
  return (
    <div id="completed-form-container">
      {error ? (
        <div className="completed-form">
          <FiXCircle color="#EB5757" />
          <h2>{error}, tente novamente.</h2>
        </div>
      ) : (
        <div className="completed-form">
          <FiCheckCircle color="#34CB79" />
          <h2>Cadastro concluído!</h2>
        </div>
      )}
    </div>
  )
}

export default CompletedForm
