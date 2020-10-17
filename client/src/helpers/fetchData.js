import axios from 'axios';

export const getContacts = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/contacts`
  );
  return res.data;
};

export const addCnt = async (formData) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/contacts`,
    formData
  );
  return res.data;
};

export const updateCnt = async (formData) => {
  const id = formData.get('id');
  const res = await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/api/contacts/${id}`,
    formData
  );
  return res.data;
};

export const deleteCnt = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/api/contacts/${id}`
  );
  return res.data;
};
