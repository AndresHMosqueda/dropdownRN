import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable, Keyboard, Animated } from 'react-native';
import { NothingFound } from './NothingFound';

const CustomDropDownContent = ({ options, handleOptionSelect, searchTerm, handleSearch }) => {
  const [scrollY] = useState(new Animated.Value(0));

  const filteredOptions = options.filter(option =>
    option?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const translateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const renderOption = ({ item }) => (
    <Pressable style={styles.option} onPress={() => handleOptionSelect(item)}>
      <Text style={styles.optionText}>{item.title}</Text>
    </Pressable>
  );

  return (
    <Animated.View style={[styles.dropdownOptions, { transform: [{ translateY }] }]}>
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
        // Asegúrate de definir la altura del FlatList para evitar problemas con el ScrollView
        // Esto es solo un ejemplo, ajusta la altura según tus necesidades
        style={{ height: 200 }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  dropdownOptions: {
    backgroundColor: 'yellow',
  },
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
  optionsContainer: {
    position: 'relative',
  },
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    height: 50,
  },
});

export default CustomDropDownContent;
