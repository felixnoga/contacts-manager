import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/authContext';

import AboutTech from '../layout/AboutTech';

const About = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
  }, [authContext]);
  return (
    <section>
      <div className="container mt-4">
        <h1 className="title">About</h1>
        <div className="box has-background-warning">
          <div className="media">
            <div className="content">
              <p>
                <span className="has-text-weight-bold is-size-5">
                  Contact app V.1.0
                </span>{' '}
                A very small contact manager made for training purposes.
              </p>
            </div>
          </div>
        </div>
        <p className="my-3">
          This is a full stack app that uses Express as a backend and React in
          the front end. Is is a small app that allows users to have a contact
          manager agenda.
        </p>
        <p className="my-3">
          Primarily intended to practice my front and back stack using modern
          techniques. The techs involved behind this app are several:
        </p>
        <div className="columns is-multiline">
          <AboutTech>
            <strong>JWT</strong> for the authentication and autorization.
            Passwords hashed with <strong>bcrypt</strong> package using salts.
          </AboutTech>
          <AboutTech>
            Database of choice was <strong>MongoDB</strong> and hosted in
            MongoDB <strong>Atlas cloud</strong>.<strong>Mongoose</strong>{' '}
            package was used to interact with the DB from the Express server.
          </AboutTech>
          <AboutTech>
            <strong>Multer</strong> to upload images to a server. In this case
            multer-s3 was used to upload the contacts images to an AWS S3
            bucket.
          </AboutTech>
          <AboutTech>
            The <strong>React Context API</strong> was used for state
            management. Everithing from contacts, alerts and authentication was
            managed via context providers and hooks (<strong>useContext</strong>
            ). The state was handled via reducer functions (
            <strong>useReducer</strong> hook).
          </AboutTech>
          <AboutTech>
            Validation was done in the frontend with custom made validators. In
            the backend <strong>express-validator</strong> package was in charge
            of that.
          </AboutTech>
          <AboutTech>
            React typechecking of the application components with{' '}
            <strong>PropTypes</strong>.
          </AboutTech>
        </div>
      </div>
    </section>
  );
};

export default About;
