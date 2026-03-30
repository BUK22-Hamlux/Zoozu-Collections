import { useState, useCallback } from "react";

function useFormValidation(initialValues = {}, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Validate a single field
  const validateField = useCallback(
    (name, value) => {
      const rules = validationRules[name];
      if (!rules) return "";

      for (let rule of rules) {
        const error = rule(value, values);
        if (error) return error;
      }

      return "";
    },
    [validationRules, values],
  );

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Validate entire form
  const validate = () => {
    let newErrors = {};
    let isValid = true;

    for (let key in validationRules) {
      const error = validateField(key, values[key]);
      if (error) {
        isValid = false;
        newErrors[key] = error;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Set single value manually
  const setValue = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Set multiple values safely (merge)
  const setFormValues = (newValues) => {
    setValues((prev) => ({
      ...prev,
      ...newValues,
    }));
  };

  // Reset form
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    setErrors,
    handleChange,
    validate,
    setValue,
    setFormValues,
    resetForm,
  };
}

export default useFormValidation;
