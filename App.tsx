import React, {useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {generateDataSet} from './helpers';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomDropDown from './components/CustomDropDown';
import {LocalDataSetExample} from './components/LocalDataSetExample';
import CustomDropDownLine from './components/CustomDropDownLine';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const options = [
    'ABCDEFGHIJ102900299800000ABCDEFGHIJ1029002998000000',
    'ABCDEFGHIJ102900299800000ABCDEFGHIJ1029002998000001',
    'ABCDEFGHIJ102900299800000ABCDEFGHIJ1029002998000002',
  ];

  const dataSet = useMemo(generateDataSet, []);

  const newArray = dataSet.map(obj => obj.title);

  return (
    // <AutocompleteDropdownContextProvider>
    //   <SafeAreaView style={(backgroundStyle, {flex: 1})}>
    //     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //     <KeyboardAvoidingView
    //       style={{flex: 1}}
    //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //       enabled>
    //       <View style={styles.container}>
    //         <Text style={styles.title}>Autocomplete dropdown</Text>
    //         <View style={styles.section}>
    //           <Text style={styles.sectionTitle}>Third party</Text>
    //           <LocalDataSetExample />
    //         </View>
    //       </View>
    //     </KeyboardAvoidingView>
    //   </SafeAreaView>
    // </AutocompleteDropdownContextProvider>
    // <View style={styles.container}>
    //   <View style={styles.section}>
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Custom component</Text>
        <CustomDropDown options={dataSet} />
      </View>
    </SafeAreaView>
    // </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 50,
  },
  section: {
    marginBottom: 40,
    // flex: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
});

export default App;
