import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const Timer = ({ onTimeUp }) => {
    const [time, setTime] = useState('');
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0 && isActive) {
            // Вызываем колбэк, когда таймер завершен
            onTimeUp();
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const startTimer = () => {
        const parsedTime = parseInt(time);
        if (!isNaN(parsedTime) && parsedTime > 0) {
            setSeconds(parsedTime);
            setIsActive(true);
        }
    };

    return (
        <View style={styles.timerContainer}>
            <TextInput
                style={styles.input}
                placeholder="Введите время в секундах"
                keyboardType="numeric"
                value={time}
                onChangeText={setTime}
            />
            <Button title="Запустить" onPress={startTimer} />
            <Text style={styles.timerText}>{isActive ? `${seconds}s` : 'Таймер остановлен'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    timerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        color: '#333',
        width: '60%',
    },
    timerText: {
        fontSize: 18,
        marginTop: 10,
    },
});

export default Timer;