import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from "react-native";

export default function ListItem({ el, moveHandler, updateNote }) {
    const [time, setTime] = useState(''); // Для хранения введенного времени
    const [seconds, setSeconds] = useState(0); // Секунды для отсчета
    const [isActive, setIsActive] = useState(false); // Статус таймера

    // Эффект для уменьшения времени
    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0 && isActive) {
            // Таймер завершен
            alert(`Время для задачи "${el.text}" вышло!`);
            setIsActive(false); // Останавливаем таймер
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const startTimer = () => {
        const parsedTime = parseInt(time);
        if (!isNaN(parsedTime) && parsedTime > 0) {
            setSeconds(parsedTime);
            setIsActive(true); // Запускаем таймер
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{el.text}</Text>
                <TextInput
                    style={styles.input}
                    value={el.note} // Ссылка на заметку из пропсов
                    onChangeText={(text) => updateNote(el.key, text)} // Вызываем функцию обновления заметок
                    placeholder="Введите заметку..."
                    multiline
                    numberOfLines={2}
                />
                <View style={styles.timerContainer}>
                    <TextInput
                        style={styles.timerInput}
                        placeholder="Введите время в секундах"
                        keyboardType="numeric"
                        value={time} // Связываем с состоянием
                        onChangeText={setTime} // Сохраняем введенное время
                    />
                    <TouchableOpacity onPress={startTimer} style={styles.startButton}>
                        <Text style={styles.startButtonText}>Запустить</Text>
                    </TouchableOpacity>
                    <Text style={styles.timerText}>
                        {isActive ? `${seconds}s` : 'Таймер остановлен'}
                    </Text>
                </View>
            </View>
            {/* Кнопки для перемещения задачи */}
            <TouchableOpacity onPress={() => moveHandler(el.key, 'backward')} style={styles.button}>
                <Text style={styles.buttonText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => moveHandler(el.key, 'forward')} style={styles.button}>
                <Text style={styles.buttonText}>→</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#e8eef1",
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: "90%", // Ширина карточки
        alignSelf: 'center',
    },
    textContainer: {
        width: "70%",
    },
    text: {
        fontFamily: "Helvetica",
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        color: '#333',
        height: 40,
    },
    button: {
        backgroundColor: '#1b4552',
        padding: 10,
        marginLeft: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '600',
    },
    timerContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    timerInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        color: '#333',
        width: '80%', // Ширина поля для ввода времени
        marginBottom: 5,
    },
    startButton: {
        backgroundColor: '#4caf50',
        padding: 5,
        borderRadius: 5,
    },
    startButtonText: {
        color: '#ffffff',
        textAlign: 'center',
    },
    timerText: {
        fontSize: 16,
        marginTop: 5,
    },
});