export const regexPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;
export const regexEmail = /^([a-zA-Z0-9_\-\.\+]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,99})$/i;
export const onlyDigitsPattern = {value: /\d/i, message: 'Only digits allowed'};
export const regexPassword = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&/,><\’:;|_~`]))\S{3,}$/;

export const isTouchEnabled = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

const retrieveTarget = (queryString) => {
  let targetUrl = null;
  const regex = /(&)*targetUrl=\((.*)\)/gi;
  const match = queryString.match(regex);
  if (match != null && match.length > 0) {
    queryString = queryString.replace(regex, '');
    targetUrl = match[0].replace(/(^(&)*targetUrl=\()|(\))/gi, '');
  }
  return {
    newQueryString: queryString,
    targetUrl
  }
}

export const getQueryParams = (queryString) => {
  const queryObj = {};
  const {newQueryString, targetUrl} = retrieveTarget(queryString);
  queryString = newQueryString;
  const queryArray = queryString.replace('?', '').split('&');
  queryArray.forEach((item) => {
    const itemArray = item.split('=');
    queryObj[itemArray[0]] = itemArray[1];
  });
  if (targetUrl != null && targetUrl.trim() !== '') {
    queryObj.targetUrl = targetUrl;
  }

  return queryObj;
};
