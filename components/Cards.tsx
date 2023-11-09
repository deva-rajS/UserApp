import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
export default function Cards({name, age, dob, onEdit, onDelete}) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <FontAwesomeIcon icon={faUser} size={50} style={styles.fA} />
      </View>
      <View style={styles.cardDetails}>
        <Text>{name}</Text>
        <Text>{age}</Text>
        <Text>{dob}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={onEdit}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onDelete}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '80%',
    height: 100,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
    gap: 20,
  },
  cardContainer: {
    marginHorizontal: 8,
  },
  cardDetails: {},
  fA: {color: 'darkgray'},
  btnContainer: {
    marginLeft: 30,
    rowGap: 10,
  },
  btn: {
    backgroundColor: '#5298fa',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
  },
});
