import React, {useState, useEffect} from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import {format_date, in_a_day} from '../../../functions/convert_dates';
import styles from './Countdown.styling'

const Countdown = ({ unix_timestamp, type, propsStyle }) => {
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
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
    //console.log(unix_timestamp)

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

    return (
        (timeLeft <= 0) ? <Text style={[style]}>{format_date(date)}</Text> : 
        <Text style={[style]}>{Math.floor((timeLeft / (1000 * 60 * 60)) % 24)}h {Math.floor((timeLeft / (1000 * 60)) % 60)}m {Math.floor((timeLeft / 1000) % 60)}s</Text>
    );
  };

export default Countdown;
