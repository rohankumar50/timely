import {View, Text, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../../theme/ThemeContext';
import Header from '../../components/Header';
import {useStyles} from './styles';

const HistoryScreen = () => {
  const styles = useStyles();
  const {theme, toggleTheme} = useContext(ThemeContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const storedHistory = await AsyncStorage.getItem('history');
    if (storedHistory) setHistory(JSON.parse(storedHistory));
  };

  const renderItems = ({item}) => {
    return (
      <View style={styles.historyItem} key={item?.id}>
        <Text style={styles.itemText}>
          CATEGORY : <Text style={styles.itemInnerText}>{item.category}</Text>
        </Text>
        <Text style={styles.itemText}>
          NAME :<Text style={styles.itemInnerText}>{item.name}</Text>
        </Text>
        <Text style={styles.itemText}>
          DURATION :<Text style={styles.itemInnerText}>{item.duration}s</Text>
        </Text>
        <Text style={styles.itemText}>
          COMPLETED AT:
          <Text style={styles.itemInnerText}>{item.completionTime}</Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'HISTORY'} right={''} left={''} onPress={() => {}} />
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={renderItems}
      />
    </View>
  );
};

export default HistoryScreen;
