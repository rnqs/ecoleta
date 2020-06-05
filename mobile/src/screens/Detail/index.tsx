import React from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import { Feather as Icon, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import styles from './styles'

const Detail = () => {
  const navigation = useNavigation()

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cd79" />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{
            uri:
              'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=40',
          }}
        />

        <Text style={styles.pointName}>Mercado do seu zé</Text>
        <Text style={styles.pointItems}>Lâmpadas, Óleo de cozinha</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>Santa Cruz do Rio Pardo, SP</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
          <MaterialCommunityIcons name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={() => {}}>
          <Icon name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  )
}

export default Detail
