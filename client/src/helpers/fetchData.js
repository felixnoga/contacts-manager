import axios from 'axios';

const config = {
  headers: {
    'x-auth-token':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY4MGVmYWZiZDk3YmY2YjgwNzBlOWZjIiwibmFtZSI6IlRlcmUifSwiaWF0IjoxNjAyMzU2MjUzLCJleHAiOjE2MDI3MTYyNTN9.TJa-1HZDH-XmO2gZDc4ksDd-uy2OTkU3YIv2fpGQzWs',
    'Content-Type': 'application/json'
  }
};
export const getContacts = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/contacts`,
    config
  );
  return res.data;
};

export const addCnt = async (formData) => {
  const config = {
    headers: {
      'x-auth-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY4MGVmYWZiZDk3YmY2YjgwNzBlOWZjIiwibmFtZSI6IlRlcmUifSwiaWF0IjoxNjAyMzU2MjUzLCJleHAiOjE2MDI3MTYyNTN9.TJa-1HZDH-XmO2gZDc4ksDd-uy2OTkU3YIv2fpGQzWs'
    }
  };
  const res = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/contacts`,
    formData,
    config
  );
  return res.data;
};

export const updateCnt = async (formData) => {
  const config = {
    headers: {
      'x-auth-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY4MGVmYWZiZDk3YmY2YjgwNzBlOWZjIiwibmFtZSI6IlRlcmUifSwiaWF0IjoxNjAyMzU2MjUzLCJleHAiOjE2MDI3MTYyNTN9.TJa-1HZDH-XmO2gZDc4ksDd-uy2OTkU3YIv2fpGQzWs'
    }
  };
  const id = formData.get('id');
  const res = await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/api/contacts/${id}`,
    formData,
    config
  );
  return res.data;
};
