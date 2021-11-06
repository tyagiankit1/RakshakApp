import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import {FAB, Text, Button} from 'react-native-paper';
import {Camera} from 'expo-camera';

let camera = Camera;
export default function CameraScreen({ whatsAppStatus, setWhatsAppStatus, getPicture }) {
  const [startCamera, setStartCamera] = React.useState(true)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState(Camera.Constants.FlashMode.off)


  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  const __takePicture = async () => {
    const photo = await camera.takePictureAsync({
      base64: true,
    })
    // console.log(photo)
    setPreviewVisible(true)
    //setStartCamera(false)
    setCapturedImage(photo)
  }
  const __savePhoto = () => {
    getPicture(capturedImage);
  }
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }
  const __handleFlashMode = () => {
    if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.off)
    } else {
      setFlashMode(Camera.Constants.FlashMode.on)
    } 
  }
  const __switchCamera = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front)
    } else {
      setCameraType(Camera.Constants.Type.back)
    }
  }
  return (
    whatsAppStatus && (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{flex: 1}}
              ref={(r) => {
                camera = r
              }}
            >
            <View style={styles.row}>
              <FAB
                  icon="close"
                  style={[styles.close, styles.red, {position: 'absolute', top: 40, right: 0}]}   
                  color='#fff' 
                  fontSize='20'
                  fontWeight='bold'                    
                  onPress={() => setWhatsAppStatus(false)}
                  uppercase={false}
              />
              </View>
              
                <View style={styles.container}>
                  <View style={[styles.row, {position: 'absolute', bottom: 100}]}>
                    <FAB
                        icon="camera-iris"
                        style={[styles.qrIcon, {backgroundColor: '#4F4F4F'}]}   
                        color='#fff' 
                        fontSize='20'
                        fontWeight='bold'                    
                        onPress={__takePicture}
                        uppercase={false}
                    />
                  </View>
                  <View style={[styles.row, {position: 'absolute', bottom: 30}]}>
                  {(flashMode === Camera.Constants.FlashMode.on) ? 
                  <FAB
                      icon="flash"
                      style={styles.qrIcon}   
                      color='#fff' 
                      fontSize='20'
                      fontWeight='bold'                    
                      onPress={ __handleFlashMode}
                      uppercase={false}
                  />:
                  <FAB
                      icon="flash-off"
                      style={styles.qrIcon}   
                      color='#fff' 
                      fontSize='20'
                      fontWeight='bold'                    
                      onPress={ __handleFlashMode}
                      uppercase={false}
                  />
                  }
                  {(cameraType === Camera.Constants.Type.back) ? 
                  <FAB
                      icon="camera-account"
                      style={styles.qrIcon}   
                      color='#fff' 
                      fontSize='20'
                      fontWeight='bold'                    
                      onPress={ __switchCamera}
                      uppercase={false}
                  />:
                  <FAB
                      icon="camera-front-variant"
                      style={styles.qrIcon}   
                      color='#fff' 
                      fontSize='20'
                      fontWeight='bold'                    
                      onPress={ __switchCamera}
                      uppercase={false}
                  />
                  }
                  </View>
                </View>
              {/* </View> */}
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  red: {
    backgroundColor: '#e76f51'
  },

  close: {
    color:'#fff',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'relative',
    top: 40,
    right: 0,
    backgroundColor: "#3983DF99",
    marginRight: 70,
    marginLeft: 70
  },
  qrIcon: {
    // flex: 1,
    color:'#fff',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'relative',
    bottom: 0,
    backgroundColor: "#3983DF99",
    marginRight: 70,
    marginLeft: 70
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
})

const CameraPreview = ({photo, retakePicture, savePhoto}) => {
  console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      >
        <View style={styles.container}>
          <View style={styles.row}>
            <FAB
                icon="camera-retake-outline"
                style={[styles.qrIcon, { top: 350}]}   
                color='#fff' 
                fontSize='20'
                fontWeight='bold'                    
                onPress={retakePicture}
                uppercase={false}
            />
            <FAB
                icon="send"
                style={[styles.qrIcon, { backgroundColor: '#558B2F', color: '#fff', top: 250}]}   
                color='#fff' 
                fontSize='20'
                fontWeight='bold'                    
                onPress={savePhoto}
                uppercase={false}
            />
          </View>
        </View>        
      </ImageBackground>
    </View>
  )
}
