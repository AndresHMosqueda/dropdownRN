import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const NothingFound = memo(({ ...props }) => (
      <View style={{ ...styles.container }}>
        <Text style={styles.text}>{props.emptyResultText || 'Nothing found'}</Text>
      </View> 
  )
)

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  text: { textAlign: 'center' }
})
