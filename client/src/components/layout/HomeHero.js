import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home-hero.scss';

const HomeHero = (props) => {
  return (
    <section className="hero is-bold">
      <div className="hero-body">
        <div className="container mt-6">
          <h1 className="title has-text-centered has-text-weight-bold has-text-primary-dark">
            Contacts Manager APP
          </h1>
          <h2 className="subtitle has-text-centered has-text-weight-bold">
            Registrate o logeate para empezar a utilizar la APP.
          </h2>
          <div className="columns is-centered">
            <div className="column is-narrow has-text-centered">
              <Link to="/register">
                <button className="button is-info ">Registrarse</button>
              </Link>
            </div>
            <div className="column is-2 is-hidden-mobile has-text-centered"></div>
            <div className="column is-narrow has-text-centered">
              <Link to="/login">
                <button className="button is-primary ">Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
