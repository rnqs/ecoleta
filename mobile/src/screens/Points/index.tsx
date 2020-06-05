import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import * as Location from 'expo-location'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import styles from './styles'

import api, { Item } from '../../services/api'

const Points = () => {
  const [items, setItems] = useState<Item[]>()
  const [location, setLocation] = useState<Location.LocationData>()

  const navigation = useNavigation()

  useEffect(() => {
    fetchItems()
    askForPermissionAndGetCurrentLocation()
  }, [])

  const fetchItems = async () => {
    const response = await api.get('items')

    setItems(response.data)
  }

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  const handleNavigateToDetail = () => {
    navigation.navigate('Detail')
  }

  const askForPermissionAndGetCurrentLocation = async () => {
    const { status } = await Location.requestPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Sua permissão é importante',
        'Usamos sua localização para selecionar os pontos de coleta mais próximos.',
        [
          {
            text: 'Permitir',
            onPress: () => {
              askForPermissionAndGetCurrentLocation()
            },
          },
          { text: 'Cancelar', style: 'cancel' },
        ],
        { cancelable: true }
      )
    }

    const location = await Location.getCurrentPositionAsync({})
    setLocation(location)
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cd79" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem Vindo</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta
        </Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={
              location
                ? {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.015,
                  }
                : undefined
            }
          >
            {location && (
              <Marker
                style={styles.mapMarker}
                onPress={handleNavigateToDetail}
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              >
                <View style={styles.mapMarkerContainer}>
                  <Image
                    style={styles.mapMarkerImage}
                    source={{
                      uri:
                        'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=40',
                    }}
                  />
                  <Text style={styles.mapMarkerTitle}>Mercado</Text>
                </View>
                <View style={styles.mapMarkerPin} />
              </Marker>
            )}
          </MapView>
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items?.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => {}}
            >
              <SvgUri width={42} height={42} uri={item.imageUrl} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  )
}

export default Points
