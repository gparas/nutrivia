const getFormDataObject = formData => {
  const formDataObj = {};
  formData.forEach(
    (value, key) =>
      (formDataObj[key] = isNaN(value) ? value : parseFloat(value)),
  );

  return formDataObj;
};

const utils = {
  getFormDataObject,
};

export default utils;
