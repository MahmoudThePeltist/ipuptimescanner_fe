import React, { useCallback, useEffect, useState } from "react";
// import { ClientsService } from "../../services/clients.service";

import axios from '../services/auth_axios'

// a reusable form hook for all forms
export default function useForm(initialState, callback) {
  const [inputs, setInputs] = useState(initialState);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log(inputs);
    if (callback) callback();
  };

  const handleInputChange = (e) => {
    console.log(e.target.name, e.target.value);
    e.persist();
    const chunks = e.target.name.split(".");
    chunks.length == 1 &&
      setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));

    if (chunks.length > 1) {
      var original_ref = inputs;
      var our_reference = original_ref;

      chunks.forEach((attrib_name, index) => {
        if (our_reference[attrib_name] && chunks.length - 1 != index) {
          our_reference = our_reference[attrib_name];
        }
      });
      var target = chunks[chunks.length - 1];
      our_reference[target] = e.target.value;
      setInputs((inputs) => ({ ...inputs, ...original_ref }));
    }
  };
  return {
    setInputs,
    // handleSubmit,
    handleInputChange,
    inputs,
  };
}



// Query hook for handling API status code
  export function useQuery({url, requestType, payload}) {
  const [statusCode, setStatusCode] = useState();
  const [apiData, setApiData] = useState();
 const callApi = (payload) => {
       axios.post(url, payload).then(res => {
          setApiData(res.data)

       }).catch(error => console.log(error, 'error'))
      }
  useEffect(() => {
   
       axios({
       method:requestType,
       url:url,
       responseType:'stream'
      }).then(response => {
       console.log(response, 'data in use effect')
       setApiData(response.data)
       setStatusCode(response.status)
     }).catch((error) => {
       console.log(error, 'error')
     })
     callApi()
  }, [url, requestType, callApi])

  return {data: apiData, status: statusCode, callApi}
}