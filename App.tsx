import React, {useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {generateDataSet} from './helpers';
import CustomDropDown from './components/CustomDropDown';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dataSet = useMemo(generateDataSet, []);
  const listFooterComponent = () => (
    <View style={styles.container}>
      <CustomDropDown options={dataSet} />
      <CustomDropDown options={dataSet} />
      <CustomDropDown options={dataSet} />
      <CustomDropDown options={dataSet} />
      <CustomDropDown options={dataSet} />
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom component</Text>
        {/* <FlatList data={[]} ListFooterComponent={listFooterComponent} /> */}
        <ScrollView>
          <CustomDropDown options={dataSet} />
          <CustomDropDown options={dataSet} />
          <CustomDropDown options={dataSet} />
          <CustomDropDown options={dataSet} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
});

export default App;
