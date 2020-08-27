import React, {useState, useEffect} from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import {format_date, in_a_day} from '../../../functions/convert_dates';
import styles from './Countdown.styling'

const Countdown = ({ unix_timestamp, type, propsStyle }) => {
    const style = [styles.Countdown, propsStyle];

    // different styles if its in search (SearchCard)
    switch (type){
      case 'search':
        style.push(styles.Countdown_search);
        break;
    }
    
    // format the date nicely when its > 24 hours away
    var date = new Date(unix_timestamp * 1000); // convert to date object
    var diff = date.getTime() - Date.now() // calculate the time until date
    if (!in_a_day(unix_timestamp)) {
      return <Text style={style}>{format_date(date)}</Text>
    }

    // format it ias a timer/countdown if < 24 hours away
    const [timeLeft, setTimeLeft] = useState(diff);
    useEffect(() => {
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1000);
      }, 1000);

      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
    }, [timeLeft]);


    // format the timer nicely as a string
    let timeString = ''
    var hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
    if (hours > 0){
      timeString = timeString+hours.toString()+'h '
    }
    var minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
    if (minutes > 0){
      timeString = timeString+minutes.toString()+'m '
    }
    var seconds = Math.floor((timeLeft / 1000) % 60)
    if (seconds > 0){
      timeString = timeString+seconds.toString()+'s'
    }
    return (
        (timeLeft <= 0) ? <Text style={[style]}>{format_date(date)}</Text> : 
        <Text style={[style]}>{timeString}</Text>
    );
  };

export default Countdown;
