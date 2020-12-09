import React, {useState} from 'react'

export default function useForm(callback) {
  const [inputs, setInputs] = useState({});
  
  const handleSubmit = (e) => {
      if(e) {
        e.preventDefault()
      }
      callback();
  }

  const handleInputChange = (e) => {
      e.persist();
      setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}))
  }
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
}
