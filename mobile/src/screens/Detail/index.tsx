import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native'
import { Feather as Icon, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import * as MailComposer from 'expo-mail-composer'

import api, { Point } from '../../services/api'

import styles from './styles'

const Detail = () => {
  const [pointData, setPointData] = useState<Point>({} as Point)

  const navigation = useNavigation()
  const route = useRoute()

  const routeParams = route.params as { point_id: number }

  useEffect(() => {
    fetchPointData()
  }, [])

  const fetchPointData = async () => {
    const response = await api.get(`point/${routeParams.point_id}`)

    setPointData(response.data)
  }

  const handleSendMail = () => {
    MailComposer.composeAsync({
      recipients: [pointData.point?.email],
      subject: 'Interesse em coleta de resíduos',
    })
  }

  const handleSendWhatsApp = () => {
    Linking.openURL(
      Platform.OS === 'ios'
        ? `https://wa.me/${
            pointData.point?.whatsapp
          }?text=${'Interesse em coleta de resíduos'}`
        : `whatsapp://send?phone=${
            pointData.point?.whatsapp
          }&text=${'Interesse em coleta de resíduos'}`
    )
  }

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  if (!pointData) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleNavigateBack}>
            <Icon name="arrow-left" size={20} color="#34cd79" />
          </TouchableOpacity>

          <ActivityIndicator color="#34cd79" size="large" style={{ flex: 1 }} />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cd79" />
        </TouchableOpacity>
        <Image
          style={styles.pointImage}
          source={{ uri: pointData.point?.image }}
        />

        <Text style={styles.pointName}>{pointData.point?.name}</Text>
        <Text style={styles.pointItems}>{pointData.items?.join(', ')}</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {pointData.point?.city}, {pointData.point?.uf}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleSendWhatsApp}>
          <MaterialCommunityIcons name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleSendMail}>
          <Icon name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  )
}

export default Detail
