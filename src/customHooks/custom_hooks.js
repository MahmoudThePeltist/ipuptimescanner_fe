import React, { useState } from "react";

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
    handleSubmit,
    handleInputChange,
    inputs,
  };
}
