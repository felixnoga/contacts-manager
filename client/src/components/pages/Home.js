import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import HomeHero from '../layout/HomeHero';
import { AuthContext } from '../../context/auth/authContext';
import LoadingSpinner from '../layout/LoadingSpinner';
import { ContactContext } from '../../context/contact/contactContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { isAuthenticated, loading } = authContext;
  useEffect(() => {
    authContext.loadUser();
  }, []);
  if (!isAuthenticated && !loading) {
    return <HomeHero />;
  }
  if (loading) {
    return <LoadingSpinner />;
  }
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
