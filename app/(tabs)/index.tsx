import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import BackgroundWithLogo from '../gradient';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function HomeScreen() {
  const [scaleAnim] = useState(new Animated.Value(1));

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

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundWithLogo />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Світло</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <BlurView intensity={80} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Сьогодні</Text>
          <Text style={styles.cardSubTitle}>Відключення скасовано!</Text>
          <Text style={styles.cardDescription}>Насолоджуйтесь яскравим днем 🌞</Text>
        </BlurView>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
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
            <Text style={styles.addLocationText}>Додайте першу локацію</Text>
          </AnimatedBlurView>
        </TouchableOpacity>
      </View>
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
    padding: 16
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold"
  },
  cardSubTitle: {
    fontSize: 16,
    marginTop: 2,
    color: "#ffffff",
  },
  cardDescription: {
    marginTop: 2,
    color: "#808080"
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
  },
});