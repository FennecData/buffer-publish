import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const containerStyle = {
  position: 'absolute',
  right: '37px',
  marginTop: '70px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '1px solid grey',
  padding: '10px',
}

const MiniCalendar = () =>
  <div style={containerStyle}>
    <DayPicker showOutsideDays />
  </div>;

MiniCalendar.propTypes = {
};

MiniCalendar.defaultProps = {
};

export default MiniCalendar;
