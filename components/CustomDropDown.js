import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  Keyboard,
} from 'react-native';
import {NothingFound} from './NothingFound';

const Dropdown = ({options, defaultValue = null}) => {
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

  const filteredOptions = options.filter(option =>
    option?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const renderOption = ({item}) => (
    <Pressable style={styles.option} onPress={() => handleOptionSelect(item)}>
      <Text style={styles.optionText}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.dropdownButton} onPress={handleToggle}>
        <View style={styles.textContainer}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.selectedOption}>
            {selectedOption || 'Select an option'}
          </Text>
          <Text style={styles.icon}>{isOpen ? '\u25B2' : '\u25BC'}</Text>
        </View>
      </Pressable>

      {isOpen && (
        <View style={styles.dropdownOptions}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchTerm}
            onChangeText={handleSearch}
          />
          <FlatList
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            onScrollBeginDrag={Keyboard.dismiss}
            data={filteredOptions}
            renderItem={renderOption}
            ItemSeparatorComponent={<View style={styles.line} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.optionsContainer}
            ListEmptyComponent={NothingFound}
          />
        </View>
      )}
      <Text style={{color: '#668', fontSize: 13, marginTop: 15}}>
        Selected item: {selectedOption ? JSON.stringify(selectedOption) : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '41%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownButton: {
    backgroundColor: '#e5ecf2',
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
  dropdownOptions: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#00000099',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15.46,
    elevation: 20,
    marginTop: 4,
  },
  icon: {},
  line: {
    backgroundColor: '#ccc',
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionsContainer: {},
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    height: 50,
  },
});

export default Dropdown;
