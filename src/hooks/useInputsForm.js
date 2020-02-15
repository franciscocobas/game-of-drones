import { useState } from 'react'

export default function useInputsForm(initialState, callback) {
  const [inputs, setInputs] = useState(initialState)

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    callback(inputs)
  }

  const handleInputChange = (event) => {
    if (event.custom) {
      setInputs((inputs) => ({ ...inputs, [event.name]: event.value }))
    } else {
      event.persist()
      setInputs((inputs) => ({ ...inputs, [event.target.name]: event.target.value }))
    }
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    setInputs
  };
}