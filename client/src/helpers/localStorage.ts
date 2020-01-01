export function clearToken() {
  localStorage.removeItem('token');
}

export function setToken(token: string) {
  localStorage.setItem('token', JSON.stringify(token));
}

export function clearUserType() {
  localStorage.removeItem('type');
}

export function clearUserId() {
  localStorage.removeItem('id');
}

export function setUserType(type: string) {
  localStorage.setItem('type', type);
}

export function setUserId(id: string) {
  localStorage.setItem('id', id);
}

export function getUserId() {
  try {
    return localStorage.getItem('id');
  } catch (err) {
    return err;
  }
}

export function getUserType() {
  try {
    return localStorage.getItem('type');
  } catch (err) {
    clearUserType();
    return false;
  }
}

export function getToken() {
  try {
    return JSON.parse(localStorage.getItem('token') as string);
  } catch (err) {
    clearToken();
    return false;
  }
}
