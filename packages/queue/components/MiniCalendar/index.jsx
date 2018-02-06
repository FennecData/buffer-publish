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

const fakeDateData = {
  'Tue Feb 06 2018': 4,
  'Wed Feb 07 2018': 2,
  'Thu Feb 08 2018': 1,
};

const cellStyle = {
  height: '1.6rem',
  width: '1.9rem',
}

const dateStyle = {
  top: '-0.3rem',
  position: 'relative',
}

const numPostsStyle = {
  fontSize: '0.3rem',
  position: 'relative',
  top: '-0.3rem',
}

const renderDay = (day) => {
  const dayString = day.toDateString();
  const numPosts = fakeDateData[dayString];
  return (
    <div style={cellStyle}>
      <div style={dateStyle}>{day.getDate()}</div>
      {numPosts && <div style={numPostsStyle}>{numPosts + ' post'}{numPosts > 1 ? 's' : ''}</div>}
    </div>
  )
};

const MiniCalendar = () =>
  <div style={containerStyle}>
    <DayPicker renderDay={renderDay} showOutsideDays />
  </div>;

MiniCalendar.propTypes = {
};

MiniCalendar.defaultProps = {
};

export default MiniCalendar;
