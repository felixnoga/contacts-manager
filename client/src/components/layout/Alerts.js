import React, { useContext, useRef } from 'react';
import { AlertContext } from '../../context/alert/alertContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const nodeRef = useRef(null);
  const onClickClose = (id) => {
    alertContext.removeAlert(id);
    console.log('e');
  };

  return (
    <TransitionGroup className="columns is-multiline is-centered">
      {alertContext.alerts.length > 0 &&
        alertContext.alerts.map((alert) => (
          <CSSTransition
            timeout={1000}
            nodeRef={nodeRef}
            classNames="alert"
            key={alert.id}
          >
            <div className={`column is-full notification is-${alert.type}`}>
              <button
                className="delete"
                onClick={() => onClickClose(alert.id)}
              />
              <FontAwesomeIcon icon={faInfoCircle} /> {alert.msg}
            </div>
          </CSSTransition>
        ))}
    </TransitionGroup>
  );
};

export default Alerts;
