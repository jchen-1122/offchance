import React, {useState, useEffect} from 'react';
import {  View, Text, StyleSheet } from 'react-native';

const Countdown = ({ unix_timestamp, type }) => {
    // initialize timeLeft with the seconds prop

    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

    var date = new Date(unix_timestamp * 1000); // convert to date object
    var ampm = (date.getHours() >= 12) ? "PM" : "AM"; // am or pm
    var hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours() // hour in AM or PM instead of military
    var diff = date.getTime() - Date.now() // calc time until date 
    if (diff > (24*3.6*Math.pow(10,6))) {
        var placeholder = ''
        if (date.getMinutes() < 10) placeholder = '0'
        var str = monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + hour + ':' + placeholder + date.getMinutes() + ampm
        return <Text style={{fontWeight: 'bold'}}>{str}</Text>
    }
    const [timeLeft, setTimeLeft] = useState(diff);
    //console.log(unix_timestamp)
  
    useEffect(() => {
      // exit early when we reach 0
      if (timeLeft <= 0) return;
  
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
        (timeLeft <= 0) ? <Text>EXPIRED</Text> : <Text style={{fontWeight: 'bold'}}>{Math.floor((timeLeft / (1000 * 60 * 60)) % 24)}h {Math.floor((timeLeft / (1000 * 60)) % 60)}m {Math.floor((timeLeft / 1000) % 60)}s</Text>
    );
  };

export default Countdown; 
