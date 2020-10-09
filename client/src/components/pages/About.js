import React from 'react';

const About = () => {
  return (
    <div>
      <h1 className="title">About</h1>
      <section>
        <div className="container">
          <div className="box has-background-grey-dark has-text-white">
            <div className="media">
              <div className="content">
                <p>Contact app V.1.0</p>
              </div>
            </div>
          </div>
          <p>
            This is a full stack app that uses Express as a backend and React in
            the front end. Is is a small app that allows users to have a contact
            manager agenda.
          </p>
          <p>It uses JWT for the athorization of users.</p>
        </div>
      </section>
    </div>
  );
};

export default About;
