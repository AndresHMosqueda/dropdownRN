import React, {memo, useMemo, useState, forwardRef} from 'react';
import {Text, View, TextInput, Platform} from 'react-native';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {generateDataSet} from '../helpers';

export const LocalDataSetExample = memo(() => {
  const [selectedItem, setSelectedItem] = useState(null);

  const dataSet = useMemo(generateDataSet, []);

  // const MyComponent = memo(
  //   forwardRef((props, ref) => {
  //     console.log('Los putos props::', props);
  //     return <TextInput {...props} ref={ref} />;
  //   }),
  // );

  const MyComponent = memo(
    forwardRef((props, ref) => {
      const ellipsizedText = text => {
        const maxLength = 29;
        let result = text;
        if (text.length > maxLength && Platform.OS === 'android') {
          // Add ellipsis by appending '...'
          result = text.substring(0, maxLength - 3) + '...';
        }
        return result;
      };
      return (
        <TextInput
          {...props}
          ref={ref}
          onChangeText={props.onChangeText}
          autoCorrect={false}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          // allowFontScaling={true}
          textBreakStrategy={'balanced'}
          value={ellipsizedText(props.value)}
        />
      );
    }),
  );

  return (
    <>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        initialValue={'0'}
        // or initialValue={{id: '0'}}
        onSelectItem={setSelectedItem}
        dataSet={dataSet}
        showChevron={true}
        emptyResultText="Nothing we!"
        InputComponent={MyComponent}
        ItemSeparatorComponent={
          <View
            style={{height: 1, width: '100%', backgroundColor: '#d8e1e6'}}
          />
        }
        containerStyle={{
          backgroundColor: 'yellow',
        }}
        renderItem={(item, text) => (
          <Text style={{color: 'purple', padding: 15}}>{item.title}</Text>
        )}
      />
    </>
  );
});
