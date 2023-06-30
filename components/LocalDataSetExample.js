import React, {memo, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {generateDataSet} from '../helpers';

export const LocalDataSetExample = memo(() => {
  const [selectedItem, setSelectedItem] = useState(null);

  const dataSet = useMemo(generateDataSet, []);

  return (
    <>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        initialValue={{id: '0'}}
        onSelectItem={setSelectedItem}
        dataSet={dataSet}
        ItemSeparatorComponent={
          <View
            style={{height: 1, width: '100%', backgroundColor: '#d8e1e6'}}
          />
        }
        suggestionsListContainerStyle={{
          backgroundColor: '#383b42',
        }}
        getItemLayout={(data, index) => ({
          length: 50,
          offset: 50 * index,
          index,
        })}
        renderItem={(item, text) => <Text style={{ color: 'orange', padding: 15 }}>{item.title}</Text>}
      />
      <Text style={{color: '#668', fontSize: 13}}>
        Selected item: {JSON.stringify(selectedItem)}
      </Text>
    </>
  );
});
