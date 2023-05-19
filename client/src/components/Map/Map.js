import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../authentication/firebaseAuth';
import './Map.css';


import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import { UserAuth } from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const center = { lat: 31.963158, lng: 35.930359 }



const libraries = ['places'];

function Map() {
  // user state declaration -------------------------------------------------------------------
  const navigate = useNavigate();

  const location = useLocation();

  
  



  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDkvayJNjcKUagFyd9BU6PY-ewXwcLlu68",
    libraries,
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const { setPickupAndDestination } = UserAuth();
  const { getPickup, getDestination } = UserAuth();
   const  [searchBtnVisibility,setSearchBtnVisibility] = useState('hidden') ;
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()


  useEffect(()=>{
    if (location.state !== null) {
      try {
        let pickup = location.state.pickup;
        let destination = location.state.destination;
        console.log("passed values = "+ pickup + destination);
      originRef.current = pickup;
      destiantionRef.current = destination;
      calculateRoute();
      
      } catch (error) {
        console.log(error);
      }
        }
  
  
  },[])
  if (!isLoaded) {
    return <h1>Loading..</h1>
  }



  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    setPickupAndDestination(originRef.current.value, destiantionRef.current.value);

    console.log("Pick up location : = " + originRef.current.value + " and destination is : " + destiantionRef.current.value);
setSearchBtnVisibility('visible');
  }
  function handleSearch() {
    navigate("/Rode");
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    <Flex className="A2"
      position='absolute'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100wh'
    >
      <Box className="A3" position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button className="A1" colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <Button visibility={searchBtnVisibility} className="A1" colorScheme='pink' type='submit' onClick={handleSearch}>
              add this as a new trip 
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
    </Flex>
  )

}

export default Map;
