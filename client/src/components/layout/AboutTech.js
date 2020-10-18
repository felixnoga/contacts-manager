import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const AboutTech = (props) => {
  return (
    <div className="column is-one-third">
      <div className="box has-background-grey-lighter">
        <p>
          <FontAwesomeIcon
            icon={faCheckCircle}
            size="2x"
            className="is-inline-block mr-2 has-text-primary-dark"
          />
          {props.children}
        </p>
      </div>
    </div>
  );
};

export default AboutTech;
