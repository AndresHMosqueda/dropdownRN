import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import CustomDropDownContent from './CustomDropdownContent';
import { NothingFound } from './NothingFound';

const CustomDropDown = ({ options, defaultValue = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (defaultValue) {
      const option = options?.find(item => item.id === defaultValue);
      setSelectedOption(option.title);
    }
  }, [defaultValue, options]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = option => {
    setSelectedOption(option.title);
    setIsOpen(false);
  };

  const handleSearch = text => {
    setSearchTerm(text);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.dropdownButton} onPress={handleToggle}>
        <View style={styles.textContainer}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.selectedOption}>
            {selectedOption || 'Select an option'}
          </Text>
          <Text style={styles.icon}>{isOpen ? '\u25B2' : '\u25BC'}</Text>
        </View>
      </Pressable>
      {isOpen && <CustomDropDownContent options={options} handleOptionSelect={handleOptionSelect} searchTerm={searchTerm} handleSearch={handleSearch} />}
      <Text style={{ color: '#668', fontSize: 13, marginTop: 15 }}>
        Selected item: {selectedOption ? JSON.stringify(selectedOption) : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownButton: {
    backgroundColor: 'purple',
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 13,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  selectedOption: {
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'center',
    width: '90%',
  },
});

export default CustomDropDown;
