import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  KeyboardAvoidingView
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { LocalDataSetExample } from './components/LocalDataSetExample'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

  return (
    <AutocompleteDropdownContextProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled>
          <ScrollView
            nestedScrollEnabled
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{ paddingBottom: 0 }}
            style={styles.scrollContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Autocomplete dropdown</Text>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Local list</Text>
                <LocalDataSetExample />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    </AutocompleteDropdownContextProvider>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: {
    padding: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 50
  },
  section: {
    marginBottom: 40
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 3
  }
})

export default App