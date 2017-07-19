import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  curiousBlue,
} from '@bufferapp/components/style/color';
import HoverableText from '../HoverableText';

const Tab = ({
  children,
  routeTo,
}) => {
  const style = {
    padding: '0px 4px 16px',
    margin: '0 8px 0 8px',
    display: 'inline-block',
    minWidth: '60px',
    textAlign: 'center',
  };

  const linkStyle = {
    textDecoration: 'none',
    padding: '0 4px 16px',
  };

  const linkActiveStyle = {
    borderBottom: `2px solid ${curiousBlue}`,
  };

  return (
    <div
      style={style}
    >
      <NavLink to={routeTo} style={linkStyle} activeStyle={linkActiveStyle}>
        <HoverableText
          hoverColor={'black'}
        >
          {children}
        </HoverableText>
      </NavLink>
    </div>
  );
};

Tab.propTypes = {
  children: PropTypes.node,
  routeTo: PropTypes.string.isRequired,
};

export default Tab;
