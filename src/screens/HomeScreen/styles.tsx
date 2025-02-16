import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from '../../theme/ThemeContext';

export const useStyles = () => {
  const {theme} = useContext(ThemeContext);
  return StyleSheet.create({
    container: {
      // flex: 1,
      height: '100%',
      backgroundColor: theme.backgroundColor,
    },
    inputModal: {
      paddingVertical: 30,
      paddingHorizontal: 20,
    },
    input: {
      height: 40,
      borderColor: theme.disabled,
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 8,
    },
    addTimerButton: {
      backgroundColor: theme.green_light,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 20,
    },
    buttonText: {
      color: theme.textColor,
      fontWeight: '600',
    },
    openModalButton: {
      // position: 'absolute',
      // bottom: 20,
      alignSelf: 'center',
      width: '80%',
      alignItems: 'center',
      backgroundColor: theme.green_light,
      padding: 15,
      borderRadius: 100,
      zIndex: 1,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },

    //list
    listContainer: {
      borderWidth: 1,
      margin: 10,
      borderRadius: 10,
      borderColor: theme.border,
    },
    listHeader: {
      padding: 10,
      alignSelf: 'center',
    },
    listItem: {
      padding: 10,
    },
    listItemText: {
      fontSize: 16,
    },
    listSubHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    listButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10,
    },
    smallButton: {
      backgroundColor: theme.green_light,
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    smallButtonText: {
      fontSize: 12,
    },
    errorText: {
      color: 'red',
      marginBlock: 4,
      fontSize: 12,
    },
    listScroll: {
      height: '90%',
    },
    listBottom: {
      height: '10%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalButton: {
      backgroundColor: theme.green_light,
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      width: '80%',
    },
    modalTitleText: {
      fontSize: 16,
      alignSelf: 'center',
    },
    modalTitleDescription: {
      fontSize: 14,
      marginVertical: 10,
    },
  });
};
