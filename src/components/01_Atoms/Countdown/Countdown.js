import React, {useState, useEffect} from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import {format_date, in_a_day} from '../../../functions/convert_dates';
import styles from './Countdown.styling'

const Countdown = ({ unix_timestamp, type, propsStyle }) => {
    const style = [styles.primary, propsStyle];

    switch (type){
      case 'search':
        style.push(styles.search);
        break;
    }
    
    // convert to date object
    var date = new Date(unix_timestamp * 1000);

    // calculate the time until date
    var diff = date.getTime() - Date.now()
    // if it's more than 24 hours from now
    if (!in_a_day(unix_timestamp)) {
      return <Text style={style}>{format_date(date)}</Text>
    }


    const [timeLeft, setTimeLeft] = useState(diff);

    useEffect(() => {
      // exit early when we reach 0
      // if (timeLeft <= 0) return;

      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1000);
      }, 1000);

      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }, [timeLeft]);


    // format the timer
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
