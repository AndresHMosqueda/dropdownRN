import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = option => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSearch = text => {
    setSearchTerm(text);
  };
  
  const filteredOptions = options.filter(option =>
    option?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={styles.dropdownButton}
        onPress={handleToggle}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.dropdownButtonText}>
          {selectedOption || 'Select an option'}
        </Text>
      </TouchableWithoutFeedback>
      {isOpen && (
        <View style={styles.dropdownOptions}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchTerm}
            onChangeText={handleSearch}
          />
          <ScrollView style={styles.optionsScrollView}>
            {filteredOptions.map((option, index) => (
              <View key={option} style={styles.optionContainer}>
                <TouchableWithoutFeedback
                  style={styles.option}
                  onPress={() => handleOptionSelect(option)}>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableWithoutFeedback>
                {index !== filteredOptions.length - 1 && <View style={styles.line} />}
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      <Text style={{ color: '#668', fontSize: 13 }}>
        Selected item: {JSON.stringify(selectedOption)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    flex: 1,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  dropdownOptions: {
    maxHeight: 150,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    marginTop: 5,
    overflow: 'scroll',
  },
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  optionsScrollView: {
    flexGrow: 1,
  },
  optionContainer: {
    flexDirection: 'column',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default Dropdown;
