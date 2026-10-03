import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [currentTrack, setCurrentTrack] = useState('Newcastle Cypher Pt. 4');
  const [isPlaying, setIsPlaying] = useState(false);

  const feeds = [
    { id: '1', title: 'Newcastle Cypher Pt. 4', stripe: '#D4AF37' },
    { id: '2', title: 'Kasi Anthem Vol. 3', stripe: '#1E90FF' },
    { id: '3', title: 'Gqom Mix Live - Osizweni', stripe: '#FF4500' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>bLVCK PLAY</Text>
      </View>

      {/* Main Video Viewport Window */}
      <View style={styles.videoPlayer}>
        <View style={styles.placeholderIconContainer}>
          <Text style={styles.logoB}>b</Text>
          <Text style={styles.logoPlay}>PLAY</Text>
        </View>
        <Text style={styles.streamingTag}>• NOW STREAMING</Text>
        <Text style={styles.trackTitle}>{currentTrack}</Text>
        <Text style={styles.subTitle}>bLVCK PLAY Premium Content Hub</Text>
      </View>

      {/* Timeline Tracker */}
      <View style={styles.timelineContainer}>
        <Text style={styles.timeText}>00:00</Text>
        <View style={styles.progressBar}><View style={styles.progressDot} /></View>
        <Text style={styles.timeText}>05:00</Text>
      </View>

      {/* Media Interaction Buttons */}
      <View style={styles.controlsRow}>
        <TouchableOpacity><Text style={styles.controlBtn}>⏮</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
          <Text style={styles.playBtn}>{isPlaying ? '⏸' : '▶'}</Text>
        </TouchableOpacity>
        <TouchableOpacity><Text style={styles.controlBtn}>⏭</Text></TouchableOpacity>
      </View>

      {/* Trending Feeds List */}
      <Text style={styles.sectionHeading}>Trending Video Feeds</Text>
      <ScrollView style={styles.feedScroll}>
        {feeds.map((feed) => (
          <TouchableOpacity 
            key={feed.id} 
            style={styles.feedCard}
            onPress={() => setCurrentTrack(feed.title)}
          >
            <View style={[styles.cardStripe, { backgroundColor: feed.stripe }]} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{feed.title}</Text>
              <Text style={styles.cardAction}>Tap to Stream Video</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#222', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', letterSpacing: 2 },
  videoPlayer: { backgroundColor: '#111', padding: 20, margin: 16, borderRadius: 12, alignItems: 'center' },
  placeholderIconContainer: { width: 80, height: 80, backgroundColor: '#000', borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#D4AF37' },
  logoB: { color: '#D4AF37', fontSize: 36, fontWeight: 'bold', fontStyle: 'italic' },
  logoPlay: { color: '#D4AF37', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  streamingTag: { color: '#FF3B30', fontSize: 12, fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 10 },
  trackTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 5 },
  subTitle: { color: '#888', fontSize: 13, alignSelf: 'flex-start', marginTop: 2 },
  timelineContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginVertical: 10 },
  timeText: { color: '#888', fontSize: 12 },
  progressBar: { flex: 1, height: 3, backgroundColor: '#333', marginHorizontal: 10, justifyContent: 'center' },
  progressDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D4AF37' },
  controlsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 15 },
  controlBtn: { color: '#D4AF37', fontSize: 28, marginHorizontal: 30 },
  playBtn: { color: '#D4AF37', fontSize: 40, marginHorizontal: 20 },
  sectionHeading: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 16, marginTop: 10, marginBottom: 5 },
  feedScroll: { flex: 1, paddingHorizontal: 16 },
  feedCard: { backgroundColor: '#121212', borderRadius: 8, marginBottom: 12, flexDirection: 'row', overflow: 'hidden', height: 75, alignItems: 'center' },
  cardStripe: { width: 5, height: '100%' },
  cardContent: { paddingLeft: 15 },
  cardTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  cardAction: { color: '#888', fontSize: 12, marginTop: 4 }
});
                   
