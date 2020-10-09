import React, { useContext, useRef, useEffect } from 'react';
import { ContactContext } from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  }, [filtered]);
  const onChangeHandler = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <div className="field">
        <div className="control">
          <input
            className="input"
            ref={text}
            type="text"
            placeholder="Filtrar contactos..."
            onChange={onChangeHandler}
          />
        </div>
      </div>
    </form>
  );
};

export default ContactFilter;
