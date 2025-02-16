import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStyles} from './styles';
import {ThemeContext} from '../../theme/ThemeContext';
import {SCREENS} from '../../../constants';
import {Modalize} from 'react-native-modalize';
import Progress from '../../components/Progress';
import Header from '../../components/Header';
import Divider from '../../components/Divider';

const HomeScreen = ({navigation}) => {
  const styles = useStyles();
  const {theme, toggleTheme} = useContext(ThemeContext);
  const modalizeRef = useRef<Modalize>(null);
  const intervalRef = useRef(null);
  const [timers, setTimers] = useState<any>([]);
  const [newTimer, setNewTimer] = useState({
    name: '',
    duration: '',
    category: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    duration: '',
    category: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [completedTimer, setCompletedTimer] = useState(null);

  useEffect(() => {
    loadTimers();
  }, []);

  useEffect(() => {
    // Find the first completed timer that hasn't shown a modal yet
    const completedTimer = timers.find(
      timer => timer.status === 'Completed' && !timer.modalShown,
    );

    if (completedTimer) {
      // Show the modal and mark the timer as "modalShown"
      setCompletedTimer(completedTimer);
      setModalVisible(true);

      setTimers(prevTimers =>
        prevTimers.map(timer =>
          timer.id === completedTimer.id
            ? {...timer, modalShown: true} // Mark the timer as modalShown
            : timer,
        ),
      );

      // Save the completed timer to history
      AsyncStorage.setItem(
        'history',
        JSON.stringify([
          ...timers
            .filter(timer => timer.status === 'Completed')
            .map(timer => ({
              ...timer,
              completionTime: new Date().toLocaleString(),
            })),
        ]),
      );
    }
  }, [timers]); // Only run when `timers` changes

  const loadTimers = async () => {
    const storedTimers = await AsyncStorage.getItem('timers');
    if (storedTimers) setTimers(JSON.parse(storedTimers));
  };

  const saveTimers = async timers => {
    await AsyncStorage.setItem('timers', JSON.stringify(timers));
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      duration: '',
      category: '',
    };

    if (!newTimer.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!newTimer.duration.trim()) {
      newErrors.duration = 'Duration is required';
      isValid = false;
    } else if (isNaN(parseInt(newTimer.duration))) {
      newErrors.duration = 'Duration must be a number';
      isValid = false;
    }

    if (!newTimer.category.trim()) {
      newErrors.category = 'Category is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addTimer = () => {
    if (validateInputs()) {
      const timer = {
        ...newTimer,
        id: Date.now().toString(),
        status: 'Not Running',
        remaining: parseInt(newTimer.duration),
        category: newTimer.category.toLowerCase(), // Normalize category to lowercase
      };
      const updatedTimers = [...timers, timer];
      setTimers(updatedTimers);
      saveTimers(updatedTimers);
      setNewTimer({name: '', duration: '', category: ''});
      setErrors({name: '', duration: '', category: ''});
      modalizeRef.current?.close();
    }
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimers(prevTimers =>
        prevTimers.map(timer =>
          timer.status === 'Running' && timer.remaining > 0
            ? {...timer, remaining: timer.remaining - 1}
            : timer.remaining === 0 && timer.status !== 'Completed'
            ? {...timer, status: 'Completed'}
            : timer,
        ),
      );
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const startTimer = id => {
    setTimers(prevTimers =>
      prevTimers.map(timer =>
        timer.id === id ? {...timer, status: 'Running'} : timer,
      ),
    );
  };

  const pauseTimer = id => {
    setTimers(prevTimers =>
      prevTimers.map(timer =>
        timer.id === id ? {...timer, status: 'Paused'} : timer,
      ),
    );
  };

  const resetTimer = id => {
    setTimers(prevTimers =>
      prevTimers.map(timer =>
        timer.id === id
          ? {...timer, status: 'Paused', remaining: parseInt(timer.duration)}
          : timer,
      ),
    );
  };

  const deleteTimer = id => {
    setTimers(prevTimers => {
      const updatedTimers = prevTimers.filter(timer => timer.id !== id);
      saveTimers(updatedTimers); // Persist the updated list
      return updatedTimers;
    });
  };

  const startAllInCategory = category => {
    setTimers(prevTimers =>
      prevTimers.map(timer =>
        timer.category?.toLowerCase() === category?.toLowerCase()
          ? {...timer, status: 'Running'}
          : timer,
      ),
    );
  };

  const pauseAllInCategory = category => {
    setTimers(prevTimers =>
      prevTimers.map(timer =>
        timer.category?.toLowerCase() === category?.toLowerCase()
          ? {...timer, status: 'Paused'}
          : timer,
      ),
    );
  };

  const resetAllInCategory = category => {
    setTimers(prevTimers =>
      prevTimers.map(timer =>
        timer.category?.toLowerCase() === category?.toLowerCase()
          ? {...timer, status: 'Paused', remaining: parseInt(timer.duration)}
          : timer,
      ),
    );
  };

  // Group timers by category
  const groupedTimers = timers.reduce((acc, timer) => {
    const normalizedCategory = timer.category.toLowerCase(); // Normalize category to lowercase
    acc[normalizedCategory] = acc[normalizedCategory] || [];
    acc[normalizedCategory].push(timer);
    return acc;
  }, {});

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const renderTimer = (item: any) => {
    return (
      <View key={item.id}>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>Name :{item.name}</Text>
          <View style={styles.listSubHeader}>
            <Text style={styles.listItemText}>Time: {item.remaining}s</Text>
            <Text style={styles.listItemText}>Status: {item.status}</Text>
          </View>
          <Progress item={item} />
          <View style={styles.listButtonContainer}>
            <TouchableOpacity
              onPress={() => startTimer(item.id)}
              style={styles.smallButton}>
              <Text style={styles.smallButtonText}>START</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pauseTimer(item.id)}
              style={styles.smallButton}>
              <Text style={styles.smallButtonText}>PAUSE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => resetTimer(item.id)}
              style={styles.smallButton}>
              <Text style={styles.smallButtonText}>RESET</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteTimer(item.id)}
              style={styles.smallButton}>
              <Text style={styles.smallButtonText}>DELETE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Divider />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={'TIMER'}
        right={'HISTORY'}
        left={''}
        onPress={() => navigation.navigate(SCREENS.HISTORY)}
      />

      <ScrollView style={styles.listScroll}>
        {Object.keys(groupedTimers).map(category => (
          <View style={styles.listContainer} key={category}>
            <Text style={styles.listHeader}>{category}</Text>
            <Divider />
            {groupedTimers[category]?.length > 0 &&
              groupedTimers[category]?.map((item: any) => renderTimer(item))}
            <View style={styles.listButtonContainer}>
              <TouchableOpacity onPress={() => startAllInCategory(category)}>
                <Text>START ALL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => pauseAllInCategory(category)}>
                <Text>PAUSE ALL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => resetAllInCategory(category)}>
                <Text>RESET ALL</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.listBottom}>
        <TouchableOpacity onPress={onOpen} style={styles.openModalButton}>
          <Text>ADD TIMER</Text>
        </TouchableOpacity>
      </View>

      <Modalize ref={modalizeRef} adjustToContentHeight handlePosition="inside">
        <View style={styles.inputModal}>
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}
          <TextInput
            placeholder="Name"
            value={newTimer.name}
            onChangeText={text => setNewTimer({...newTimer, name: text})}
            style={styles.input}
            placeholderTextColor={theme.disabled}
          />

          {errors.duration ? (
            <Text style={styles.errorText}>{errors.duration}</Text>
          ) : null}
          <TextInput
            placeholder="Duration (seconds)"
            value={newTimer.duration}
            onChangeText={text => setNewTimer({...newTimer, duration: text})}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor={theme.disabled}
          />
          {errors.category ? (
            <Text style={styles.errorText}>{errors.category}</Text>
          ) : null}
          <TextInput
            placeholder="Category"
            value={newTimer.category}
            onChangeText={text => setNewTimer({...newTimer, category: text})}
            style={styles.input}
            placeholderTextColor={theme.disabled}
          />

          <TouchableOpacity onPress={addTimer} style={styles.addTimerButton}>
            <Text style={styles.buttonText}>ADD TIMER</Text>
          </TouchableOpacity>
        </View>
      </Modalize>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitleText}>Congratulations!</Text>
            <Text style={styles.modalTitleDescription}>
              {completedTimer?.name} has completed!
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}>
              <Text style={styles.smallButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
