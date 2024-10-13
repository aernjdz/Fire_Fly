import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Platform, ScrollView, Image, ImageSourcePropType, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { BlurView } from 'expo-blur';
import BackgroundWithLogo from '../gradient';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface SettingItemProps {
  title: string;
  onPress: () => void;
  icon: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({ title, onPress, icon }) => {
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
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <AnimatedBlurView
        intensity={80}
        tint="dark"
        style={[
          styles.settingItem,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <View style={styles.settingContent}>
          {icon}
          <Text style={styles.settingTitle}>{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </AnimatedBlurView>
    </TouchableOpacity>
  );
};

interface DeveloperProps {
    name: string;
    avatar: ImageSourcePropType;
    githubUrl: string;
    telegramUrl: string;
}
  

const Developer: React.FC<DeveloperProps> = ({ name, avatar, githubUrl, telegramUrl }) => (
    <View style={styles.developerContainer}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.developerInfo}>
        <Text style={styles.developerName}>{name}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => Linking.openURL(githubUrl)}>
            <Ionicons name="logo-github" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(telegramUrl)}>
            <Icon name="telegram" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
);

const AboutContent = () => (
  <View>
    <Text style={styles.contentTitle}>Про додаток</Text>
    <Text style={styles.contentText}>Версія: 1.0.0</Text>
    <Text style={styles.contentSubtitle}>Розробники:</Text>
    <Developer name="Aernjdz" avatar={require('../../assets/images/Aernjdz.jpg')} telegramUrl='https://t.me/Aernjdz' githubUrl='https://github.com/Aernjdz' />
    <Developer name="ItsRaid" avatar={require('../../assets/images/ItsRaid.png')} telegramUrl='https://t.me/ThatsRaid' githubUrl='https://github.com/ThatsRaid' />
  </View>
);

export default function SettingsScreen() {
  const [currentView, setCurrentView] = useState<string | null>(null);

  const renderContent = () => {
    switch (currentView) {
      case 'about':
        return <AboutContent />;
      default:
        return (
          <View>
            <SettingItem 
              title="Про додаток" 
              onPress={() => setCurrentView('about')} 
              icon={<Ionicons name="information-circle-outline" size={24} color="white" style={styles.itemIcon} />} 
            />
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundWithLogo />
      <View style={styles.header}>
        {currentView ? (
          <TouchableOpacity onPress={() => setCurrentView(null)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        ) : null}
        <Text style={styles.headerTitle}>Налаштування</Text>
      </View>
      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    paddingBottom: 16,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 8,
  },
  settingTitle: {
    color: "#ffffff",
    fontSize: 16,
  },
  contentTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contentSubtitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  contentText: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 8,
  },
  developerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  developerName: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold"
  },
  developerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  icon: {
    marginRight: 12,
  },
});