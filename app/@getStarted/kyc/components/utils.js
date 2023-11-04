const getFormDataObj = formElemnts => {
  const keyValueToInt = ['height', 'weight'];
  const formData = new FormData(formElemnts);
  const formDataObj = {};
  formData.forEach(
    (value, key) =>
      (formDataObj[key] = keyValueToInt.includes(key)
        ? parseInt(value)
        : value),
  );
  return formDataObj;
};

const utils = {
  getFormDataObj,
};

export default utils;
