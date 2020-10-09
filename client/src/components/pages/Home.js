import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';

const Home = () => {
  return (
    <div className="container">
      <h1 className="title has-text-primary-dark has-text-weight-bold">
        Contact manager
      </h1>
      <div className="columns">
        <div className="column">
          <ContactForm />
        </div>
        <div className="column">
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default Home;
