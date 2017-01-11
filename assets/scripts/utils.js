import 'es6-promise'
import 'whatwg-fetch'

import Cookies from 'js-cookie'

export const CSRF_TOKEN = Cookies.get('csrftoken')

export function fetchInit(method='GET', body=null) {
  var request = {
    method: method,
    credentials: 'same-origin',
    headers: {
      'X-CSRFToken': CSRF_TOKEN
    }
  }

  if (method != 'HEAD' && method != 'GET') {
    request['body'] = body
  }

  return request
}

export function formatDateTime (dateString) {
  var config = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric'
  };

  return new Date(dateString).toLocaleTimeString('en-US', config);
}

export function truncateWords (str, count) {
  var newStr = str.split(' ').splice(0, count).join(' ')
  if (newStr.length < str.length) {
    return `${newStr} …`
  } else {
    return str
  }
}

var lastId = 0;

export function getNextId(prefix='') {
    lastId++;
    return `${prefix}${lastId}`;
}
