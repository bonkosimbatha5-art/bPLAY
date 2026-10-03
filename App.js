import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Audio, Video } from 'expo-av';


export default function App() {
  const [currentTrack, setCurrentTrack] = useState({ title: 'Select Culture to Stream', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' });;
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundInstance, setSoundInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const feeds = [
  { id: '1', title: 'Maskandi', url: 'https://googleapis.com', stripe: '#D4AF37' },
  { id: '2', title: 'Deep House Session', url: 'https://googleapis.com', stripe: '#1E90FF' },
  { id: '3', title: 'Amapiano Grooves', url: 'https://googleapis.com', stripe: '#FF4500' },
  { id: '4', title: 'Gqomu Bangers', url: 'https://googleapis.com', stripe: '#00A896' },
  { id: '5', title: 'Strictly Hip-Hop', url: 'https://googleapis.com', stripe: '#E6C229' }
];

  
    const mixtapes = [
    { id: '1', title: 'In The Deep Mixtapes', url: 'https://soundhelix.com', stripe: '#D4AF37' },
    { id: '2', title: 'Amapiano Balcony', url: 'https://soundhelix.com', stripe: '#FF4500' },
    { id: '3', title: 'Hop Cypher', url: 'https://soundhelix.com', stripe: '#E6C229' }
  ];
  

  useEffect(() => {
    return soundInstance ? () => { soundInstance.unloadAsync(); } : undefined;
  }, [soundInstance]);

  async function handleAudioPlayback() {
    try {
      if (soundInstance !== null) {
        if (isPlaying) {
          await soundInstance.pauseAsync();
          setIsPlaying(false);
        } else {
          await soundInstance.playAsync();
          setIsPlaying(true);
        }
      } else {
        await loadAndPlayAudio(currentTrack.url);
      }
    } catch (error) {
      console.log("Audio Error: ", error);
    }
  }

  async function loadAndPlayAudio(url) {
    setIsLoading(true);
    if (soundInstance) {
      await soundInstance.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true });
    setSoundInstance(sound);
    setIsPlaying(true);
    setIsLoading(false);
  }

  async function changeTrack(track) {
    setCurrentTrack(track);
    await loadAndPlayAudio(track.url);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Active Video Player Viewport */}
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: currentTrack.url }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay={isPlaying}
          useNativeControls
          style={styles.videoScreen}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setIsPlaying(false);
            }
          }}
        />
      </View>

  <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
    
      {/* Track Details */}
      <View style={styles.metaContainer}>
        <Text style={styles.streamingTag}>• NOW STREAMING</Text>
        <Text style={styles.trackTitle}>{currentTrack.title}</Text>
        <Text style={styles.subTitle}>bLVCK PLAY Premium Content Hub</Text>
      </View>

      {/* Horizontal Trending Feeds */}
      <Text style={styles.sectionHeading}>Trending Video Feeds</Text>
      <View style={{ height: 160 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {feeds.map((feed) => (
            <TouchableOpacity key={feed.id} style={styles.videoCard} onPress={() => changeTrack(feed)}>
              <View style={styles.cardThumbnail}>
                <Text style={[styles.playTriangle, { color: feed.stripe }]}>▶</Text>
              </View>
              <Text style={styles.cardTitle} numberOfLines={1}>{feed.title}</Text>
              <Text style={styles.cardAction}>Tap to Stream Video</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Horizontal All Tym Mixtapes */}
      <Text style={styles.sectionHeading}>All Tym Mixtapes</Text>
      <View style={{ height: 160 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {mixtapes.map((mixtape) => (
            <TouchableOpacity key={mixtape.id} style={styles.videoCard} onPress={() => changeTrack(mixtape)}>
              <View style={styles.cardThumbnail}>
                <Text style={[styles.playTriangle, { color: mixtape.stripe }]}>▶</Text>
              </View>
              <Text style={styles.cardTitle} numberOfLines={1}>{mixtape.title}</Text>
              <Text style={styles.cardAction}>Tap to Play Mixtape</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{ flex: 1 }} />
</ScrollView>
        
      {/* Restored Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        {[
          { name: 'Home', icon: '🏠' },
          { name: 'Search', icon: '🔍' },
          { name: 'Live', icon: '▶' },
          { name: 'Downloads', icon: '📥' }
        ].map((tab) => (
          <TouchableOpacity key={tab.name} style={styles.navItem} onPress={() => setActiveTab(tab.name)}>
            <Text style={[styles.navIcon, { color: activeTab === tab.name ? '#D4AF37' : '#888' }]}>{tab.icon}</Text>
            <Text style={[styles.navText, { color: activeTab === tab.name ? '#D4AF37' : '#888' }]}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  videoContainer: { backgroundColor: '#050505', height: 210, width: '100%', justifyContent: 'center', overflow: 'hidden' },
  videoScreen: { width: '100%', height: '100%' },
  topControls: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 50, marginBottom: 40 },
  navArrow: { color: '#FFF', fontSize: 24 },
  timeRow: { flexDirection: 'row', alignItems: 'center', width: '100%' },
  timeText: { color: '#FFF', fontSize: 12 },
  timelineBar: { flex: 1, height: 2, backgroundColor: '#333', marginHorizontal: 10, justifyContent: 'center' },
  timelineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#00A896' },
  fullscreenIcon: { color: '#FFF', fontSize: 14, marginLeft: 10 },
  metaContainer: { paddingHorizontal: 16, marginTop: 20 },
  streamingTag: { color: '#FF3B30', fontSize: 12, fontWeight: 'bold' },
  trackTitle: { color: '#FFF', fontSize: 26, fontWeight: 'bold', marginTop: 5 },
  subTitle: { color: '#888', fontSize: 13, marginTop: 2 },
  sectionHeading: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 16, marginTop: 25, marginBottom: 15 },
  horizontalScroll: { paddingHorizontal: 16, gap: 16 },
  videoCard: { width: 160 },
  cardThumbnail: { width: 160, height: 100, backgroundColor: '#111', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  playTriangle: { fontSize: 20 },
  cardTitle: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  cardAction: { color: '#555', fontSize: 11, marginTop: 2 },
  bottomNav: { flexDirection: 'row', height: 65, borderTopWidth: 1, borderTopColor: '#111', backgroundColor: '#000' },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navIcon: { fontSize: 18 },
  navText: { fontSize: 10, marginTop: 4 }
});
              
