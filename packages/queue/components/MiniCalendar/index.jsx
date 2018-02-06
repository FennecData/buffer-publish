import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import { ArrowRightIcon, ArrowLeftIcon } from '@bufferapp/components/Icon/Icons';
import { Button } from '@bufferapp/components';
import 'react-day-picker/lib/style.css';

const containerStyle = {
  position: 'absolute',
  right: '2.3rem',
  marginTop: '3rem',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '1px solid #dce0e0',
  padding: '0.5rem',
  overflow: 'hidden',
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

const NavBar = ({
  nextMonth,
  previousMonth,
  onPreviousClick,
  onNextClick,
  className,
  localeUtils,
}) => {
  const styleLeft = {
    float: 'left',
  };
  const styleRight = {
    float: 'right',
  };
  const onNext = () => {
    onNextClick();
    // add our hooks here
  };

  const onPrev = () => {
    onPreviousClick();
    // add our hooks here
  };

  return (
    <div className={className}>
      <div style={styleLeft}>
        <Button style={styleLeft} noStyle onClick={onNext}>
          <ArrowLeftIcon/>
        </Button>
      </div>
      <div style={styleRight}>
        <Button noStyle onClick={onNext}>
          <ArrowRightIcon/>
        </Button>
      </div>
    </div>
  );
};

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
    <DayPicker navbarElement={<NavBar/>} renderDay={renderDay} showOutsideDays />
  </div>;

MiniCalendar.propTypes = {
};

MiniCalendar.defaultProps = {
};

export default MiniCalendar;
