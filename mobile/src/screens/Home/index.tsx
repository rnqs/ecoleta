import React, { useState, useEffect } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import {
  View,
  Text,
  Image,
  Keyboard,
  Platform,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import styles from './styles'

const Home = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [uf, setUf] = useState('')
  const [city, setCity] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  const handleNavigatePoints = () => {
    navigation.navigate('Points', { uf, city })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'height' : undefined}
    >
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View
            style={keyboardVisible ? { display: 'none' } : { display: 'flex' }}
          >
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos.
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Digite a UF"
            value={uf}
            autoCorrect={false}
            autoCapitalize="words"
            onChangeText={setUf}
            onFocus={() => setKeyboardVisible(true)}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite a Cidade"
            value={city}
            autoCorrect={false}
            onChangeText={setCity}
            onFocus={() => setKeyboardVisible(true)}
          />

          <RectButton style={styles.button} onPress={handleNavigatePoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#fff" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default Home
