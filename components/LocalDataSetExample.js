import React, {memo, useMemo, useState, forwardRef} from 'react';
import {Text, View, TextInput, Platform} from 'react-native';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {generateDataSet} from '../helpers';

export const LocalDataSetExample = memo(() => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [realValue, setRealValue] = useState(null);
  const [isEditing, setIsEditing] = useState(null);

  const dataSet = useMemo(generateDataSet, []);

  // const MyComponent = memo(
  //   forwardRef((props, ref) => {
  //     console.log('Los putos props::', props);
  //     return <TextInput {...props} ref={ref} />;
  //   }),
  // );

  const handleChangeText = (text, props) => {
    console.log('handleChangeText mejorado!', props.onChangeText);
    if (Platform.OS === 'android') {
      setIsEditing(true);
      props.onChangeText(text);
      setIsEditing(false);
    } else {
      props.onChangeText(text);
    }
  };

  console.log('isEditing__', isEditing);
  const MyComponent = memo(
    forwardRef((props, ref) => {
      console.log('props.style!', props.style);
      return (
        <>
          <TextInput
            {...props}
            ref={ref}
            // onChangeText={props.onChangeText}
            // onChangeText={text => handleChangeText(text, props)}
            // onBlur={props.onBlur}
            // onFocus={props.onFocus}
            // value={isEditing ? props.value : ellipsizedText(props.value)}
          />
        </>
      );
    }),
  );

  return (
    <>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          color: '#668',
          fontSize: 13,
          paddingTop: 30,
          paddingBottom: 20,
        }}>
        {selectedItem?.title}
      </Text>
      <AutocompleteDropdown
        autoCorrect={false}
        clearOnFocus={false}
        closeOnBlur={false}
        dataSet={dataSet}
        emptyResultText="Nothing we!"
        ItemSeparatorComponent={
          <View
            style={{height: 1, width: '100%', backgroundColor: '#d8e1e6'}}
          />
        }
        showChevron={false}
        showClear={false}
        // or initialValue={{id: '0'}}
        initialValue={'0'}
        onSelectItem={setSelectedItem}
        // InputComponent={MyComponent}
        renderItem={(item, text) => (
          <Text style={{color: 'purple', padding: 15}}>{item.title}</Text>
        )}
      />
    </>
  );
});
