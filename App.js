import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from "./components/header";
import ListItem from './components/list';
import Form from './components/form';

export default function App() {
    const [todo, setTodo] = useState([]); // Состояние для задач "Сделать"
    const [inProgress, setInProgress] = useState([]); // Состояние для задач "В процессе"
    const [completed, setCompleted] = useState([]); // Состояние для задач "Выполнено"

    const addHandler = (text) => {
        setTodo((currentTodos) => [
            { text: text, key: Math.random().toString(36).substring(7), note: '' }, // Добавление заметки при создании задачи
            ...currentTodos,
        ]);
    };

    const updateNote = (key, note) => {
        const updateTodos = (todosList) => {
            return todosList.map(item =>
                item.key === key ? { ...item, note: note } : item
            );
        };

        setTodo(updateTodos(todo));
        setInProgress(updateTodos(inProgress));
        setCompleted(updateTodos(completed));
    };

    const moveHandler = (key, direction) => {
        if (direction === 'forward') {
            const itemInTodo = todo.find(item => item.key === key);
            if (itemInTodo) {
                setInProgress(currentInProgress => [
                    { ...itemInTodo },
                    ...currentInProgress,
                ]);
                setTodo(currentTodos => currentTodos.filter(item => item.key !== key));
            } else {
                const itemInProgress = inProgress.find(item => item.key === key);
                if (itemInProgress) {
                    setCompleted(currentCompleted => [
                        { ...itemInProgress },
                        ...currentCompleted,
                    ]);
                    setInProgress(currentInProgress => currentInProgress.filter(item => item.key !== key));
                }
            }
        } else if (direction === 'backward') {
            const itemInProgress = inProgress.find(item => item.key === key);
            if (itemInProgress) {
                setTodo(currentTodos => [
                    { ...itemInProgress },
                    ...currentTodos,
                ]);
                setInProgress(currentInProgress => currentInProgress.filter(item => item.key !== key));
            } else {
                const itemInTodo = todo.find(item => item.key === key);
                if (itemInTodo) {
                    setTodo(currentTodos => currentTodos.filter(item => item.key !== key)); // Удаление задачи
                } else {
                    const itemInCompleted = completed.find(item => item.key === key);
                    if (itemInCompleted) {
                        setInProgress(currentInProgress => [
                            { ...itemInCompleted },
                            ...currentInProgress,
                        ]);
                        setCompleted(currentCompleted => currentCompleted.filter(item => item.key !== key));
                    }
                }
            }
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <Form addHandler={addHandler} />
            {/* Раздел "Сделать" */}
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.circleRed} />
                    <Text style={styles.sectionTitle}>Сделать</Text>
                </View>
                {todo.map(item => (
                    <ListItem key={item.key} el={item} moveHandler={moveHandler} updateNote={updateNote} />
                ))}
            </View>
            {/* Раздел "В процессе" */}
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.circleOrange} />
                    <Text style={styles.sectionTitle}>В процессе</Text>
                </View>
                {inProgress.map(item => (
                    <ListItem key={item.key} el={item} moveHandler={moveHandler} updateNote={updateNote} />
                ))}
            </View>
            {/* Раздел "Выполнено" */}
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.circleGreen} />
                    <Text style={styles.sectionTitle}>Выполнено</Text>
                </View>
                {completed.map(item => (
                    <ListItem key={item.key} el={item} moveHandler={moveHandler} updateNote={updateNote} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        width: '320px',
        margin: 'auto',
        marginTop: '0',
    },
    section: {
        paddingTop: 20,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 10,
    },
    circleRed: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        marginRight: 10, // Пробел между кружком и названием
    },
    circleOrange: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'orange',
        marginRight: 10,
    },
    circleGreen: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'green',
        marginRight: 10,
    },
});