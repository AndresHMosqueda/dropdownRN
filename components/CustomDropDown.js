import React, {useState} from 'react';
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

const Dropdown = ({options}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const renderOption = ({item, index}) => (
    <Pressable style={styles.option} onPress={() => handleOptionSelect(item)}>
      <Text style={styles.optionText}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View>
      <View
        style={{
          // justifyContent: 'center', // For aligning vertically
          // alignContent:'center',

          // flexDirection: 'row',
          // justifyContent: 'center',
          // alignContent:'center',
          // alignItems:'center',
        }}>
        <Pressable style={styles.dropdownButton} onPress={handleToggle}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.dropdownButtonText}>
              {selectedOption || 'Select an option'}
            </Text>
            <Text style={styles.icon}>{isOpen ? '\u25B2' : '\u25BC'}</Text>
          </View>
        </Pressable>
      </View>

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
            getItemLayout={(data, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
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
    // flex:1,
    // marginVertical: 2,
  },
  dropdownButton: {
    backgroundColor: '#e5ecf2',
    borderRadius: 5,
    paddingHorizontal: 13,
    height: 50,
    justifyContent: 'center',
    alignContent:'center',
    alignItems:'center',
    paddingHorizontal: 20,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
    alignContent:'center',
  },
  dropdownOptions: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
    shadowColor: '#00000099',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15.46,
    elevation: 20,
  },
  icon: {},
  inputField: {
    paddingHorizontal: 13,
    fontSize: 16,
  },
  inputContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#e5ecf2',
    borderRadius: 5,
  },
  line: {
    height: 1,
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
  optionsContainer: {
    // backgroundColor: 'yellow'
  },
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    height: 50,
  },
});

export default Dropdown;
