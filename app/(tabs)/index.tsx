import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  Platform, 
  Animated, 
  Modal 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import BackgroundWithLogo from '../gradient';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function HomeScreen() {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [isModalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundWithLogo />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Firefly</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={openModal}
          activeOpacity={1}
          
        >
          <AnimatedBlurView
            intensity={80}
            tint="dark"
          
            style={[
              styles.addLocation,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
            <Image source={require("../../assets/images/plus.png")} style={styles.locationImage}/>
            <Text style={styles.addLocationText}>Додайте локацію</Text>
          </AnimatedBlurView>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} transparent animationType="none">
        <Animated.View style={[styles.modalBackground, { opacity: fadeAnim }]}>
          <BlurView intensity={80} tint="dark" style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Додати Локацію</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </BlurView>
        </Animated.View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    paddingBottom: 16,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 20,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  addLocation: {

    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  locationImage: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },
  addLocationText: {
    color: 'white',
    marginTop: 8,
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center', 
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute', // Stay in the top-right corner
    padding: 4,
    right: 0
  },
});
