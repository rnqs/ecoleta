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
import { InputAutoSuggest } from 'react-native-autocomplete-search'

import ibgeLocalityApi, {
  UFResponse,
  CityResponse,
} from '../../services/ibgeLocalityApi'

import styles from './styles'

interface Uf {
  id: number
  name: string
}

const Home = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [uf, setUf] = useState('')
  const [ufs, setUfs] = useState<Uf[]>([])
  const [city, setCity] = useState('')
  const [cities, setCities] = useState<string[]>([])

  const navigation = useNavigation()

  useEffect(() => {
    fetchUfs()

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

  useEffect(() => {
    if (!uf) {
      setCities([])
      return
    }

    fetchCitiesByUf(ufs.filter((currentUf) => currentUf.name === uf)[0].id)
  }, [uf])

  const fetchUfs = async () => {
    const response = await ibgeLocalityApi.get<UFResponse[]>('estados', {
      params: {
        orderBy: 'nome',
      },
    })

    setUfs(
      response.data.map((uf) => {
        return {
          id: uf.id,
          name: uf.nome,
        }
      })
    )
  }

  const fetchCitiesByUf = async (ufId: number) => {
    const response = await ibgeLocalityApi.get<CityResponse[]>(
      `estados/${ufId}/municipios`,
      {
        params: {
          orderBy: 'nome',
        },
      }
    )

    setCities(response.data.map((city) => city.nome))
  }

  const handleNavigatePoints = () => {
    navigation.navigate('Points', { uf, city })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
          <Text style={[styles.placeholder]}>Digite sua uf</Text>
          <InputAutoSuggest
            inputStyle={styles.input}
            flatListStyle={styles.suggestList}
            itemTextStyle={styles.suggestListItem}
            value={uf}
            autoCorrect={false}
            autoCapitalize="words"
            onDataSelectedChange={(data: Uf) => setUf(data?.name)}
            onFocus={() => setKeyboardVisible(true)}
            staticData={ufs.map((uf) => {
              return {
                id: String(uf.id),
                name: uf.name,
              }
            })}
          />

          <Text style={[styles.placeholder]}>Digite sua cidade</Text>
          <InputAutoSuggest
            inputStyle={styles.input}
            flatListStyle={styles.suggestList}
            itemTextStyle={styles.suggestListItem}
            value={city}
            autoCorrect={false}
            onDataSelectedChange={(data: Uf) => setCity(data?.name)}
            onFocus={() => setKeyboardVisible(true)}
            staticData={cities.map((city, index) => {
              return {
                id: String(index),
                name: city,
              }
            })}
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
