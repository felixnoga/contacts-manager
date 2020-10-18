import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import '../css/home-hero.scss';

const HomeHero = (props) => {
  const title = useRef(null);
  const subtitle = useRef(null);
  const button = useRef([]);
  const tl = gsap.timeline();
  useEffect(() => {
    tl.from(title.current, {
      y: -250,
      scale: 3,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      ease: 'back'
    })
      .from(
        subtitle.current,
        { y: 200, opacity: 0, duration: 1.5, ease: 'elastic' },
        '<0.3'
      )
      .from(
        button.current,
        {
          opacity: 0,
          yPercent: 50,
          ease: 'back',
          duration: 1
        },
        '<0.5'
      );
  }, []);
  return (
    <section className="hero is-bold">
      <div className="hero-body">
        <div className="container mt-6">
          <h1
            ref={title}
            className="title has-text-centered has-text-weight-bold has-text-primary-dark"
          >
            Contacts Manager APP
          </h1>
          <h2
            ref={subtitle}
            className="subtitle has-text-centered has-text-weight-bold"
          >
            Registrate o logeate para empezar a utilizar la APP.
          </h2>
          <div className="columns is-centered">
            <div className="column is-narrow has-text-centered">
              <Link to="/register">
                <button
                  ref={(el) => (button.current[0] = el)}
                  className="button is-info "
                >
                  Registrarse
                </button>
              </Link>
            </div>
            <div className="column is-2 is-hidden-mobile has-text-centered"></div>
            <div className="column is-narrow has-text-centered">
              <Link to="/login">
                <button
                  ref={(el) => (button.current[1] = el)}
                  className="button is-primary "
                >
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
