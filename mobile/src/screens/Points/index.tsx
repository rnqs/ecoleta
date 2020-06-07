import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import * as Location from 'expo-location'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import styles from './styles'
import mapStyle from '../../constants/mapStyle'

import api, { Item, PointList } from '../../services/api'

interface Params {
  uf: string
  city: string
}

const Points = () => {
  const [items, setItems] = useState<Item[]>()
  const [points, setPoints] = useState<PointList[]>()

  const [selectedItemsId, setSelectedItemsId] = useState<number[]>([])

  const [location, setLocation] = useState<Location.LocationData>()

  const navigation = useNavigation()
  const route = useRoute()

  const routeParams = route.params as Params

  useEffect(() => {
    fetchItems()
    askForPermissionAndGetCurrentLocation()
    fetchPoints()
  }, [selectedItemsId])

  const fetchItems = async () => {
    const response = await api.get('items')

    setItems(response.data)
  }

  const fetchPoints = async () => {
    const response = await api.get('point', {
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        items: selectedItemsId,
      },
    })

    setPoints(response.data)
  }

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  const handleNavigateToDetail = (point_id: number) => {
    navigation.navigate('Detail', { point_id })
  }

  const handleSelectItems = (itemId: number) => {
    if (selectedItemsId.includes(itemId)) {
      setSelectedItemsId(selectedItemsId.filter((id) => id !== itemId))
      return
    }

    setSelectedItemsId([...selectedItemsId, itemId])
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
            provider="google"
            customMapStyle={mapStyle}
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
            {points?.map((point) => (
              <Marker
                key={point._id}
                style={styles.mapMarker}
                onPress={() => handleNavigateToDetail(point._id)}
                coordinate={{
                  latitude: point.latitude,
                  longitude: point.longitude,
                }}
              >
                <View style={styles.mapMarkerContainer}>
                  <Image
                    style={styles.mapMarkerImage}
                    source={{ uri: point.image }}
                  />
                  <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                </View>
                <View style={styles.mapMarkerPin} />
              </Marker>
            ))}
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
              style={[
                styles.item,
                selectedItemsId.includes(item.id) && styles.selectedItem,
              ]}
              onPress={() => {
                handleSelectItems(item.id)
              }}
              activeOpacity={0.6}
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
