import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Reusable SVG Navigation Icons
const NavIcon = ({ type, active }) => {
  const color = active ? '#D4AF37' : '#888888';
  if (type === 'home') return (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none"><Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill={color} /></Svg>);
  if (type === 'search') return (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none"><Path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill={color} /></Svg>);
  if (type === 'live') return (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none"><Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill={color} /></Svg>);
  if (type === 'downloads') return (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none"><Path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" fill={color} /></Svg>);
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const videoPlayerRef = useRef(null);
  
  const [videoUrl, setVideoUrl] = useState('https://googleapis.com');
  const [currentTitle, setCurrentTitle] = useState('Newcastle Cypher Pt. 4');

  const genresList = ['All', 'Amapiano', 'Deep House', 'Hip-Hop', 'Maskandi'];

  // Mock data for separate DJ Mixtapes row filtered dynamically by genre
  const djMixtapes = [
    { id: 'm1', genre: 'Amapiano', title: 'Groove Cartel Mix', dj: 'Kabza De Small', length: '1:24:10', color: '#1c170d' },
    { id: 'm2', genre: 'Deep House', title: 'RedBox Radio Session', dj: 'Black Coffee', length: '58:45', color: '#0d131c' },
    { id: 'm3', genre: 'Hip-Hop', title: 'Spring Lockdown Cypher', dj: 'Nasty C x Maglera', length: '45:12', color: '#1a101a' },
    { id: 'm4', genre: 'Maskandi', title: 'Bhaca Tribal Beats', dj: 'Mthandeni SK', length: '1:02:30', color: '#101c14' }
  ];

  const playMediaTrack = async (url, title) => {
    setCurrentTitle(title);
    setVideoUrl(url);
    try {
      if (videoPlayerRef.current) {
        await videoPlayerRef.current.unloadAsync();
        await videoPlayerRef.current.loadAsync({ uri: url }, { shouldPlay: true }, true);
      }
    } catch (error) {
      console.log("Playback error: ", error);
    }
  };

  const renderContent = () => {
    if (activeTab === 'search') return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Search Engine View</Text></View>;
    if (activeTab === 'live') return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Live TV Stream Feed</Text></View>;
    if (activeTab === 'downloads') return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>No Offline Tracks Cached</Text></View>;

    // Filter items based on selected genre indicator tag
    const filteredMixes = selectedGenre === 'All' ? djMixtapes : djMixtapes.filter(m => m.genre === selectedGenre);

    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 110 }}>
        
        {/* Real Embedded Cloud Video Streaming Player Frame */}
        <View style={{ width: width, height: 220, backgroundColor: '#000', marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Video
            ref={videoPlayerRef}
            source={{ uri: videoUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={false}
            useNativeControls
            style={{ width: width, height: 220 }}
          />
        </View>

        {/* Media Track Header Panel */}
        <View style={{ padding: 16, backgroundColor: '#0a0a0a' }}>
          <Text style={{ color: '#E50914', fontWeight: 'bold', fontSize: 11, letterSpacing: 1 }}>● NOW STREAMING</Text>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: '900', marginTop: 4 }}>{currentTitle}</Text>
          <Text style={{ color: '#666', fontSize: 12, marginTop: 2 }}>bLVCK PLAY Premium Content Hub</Text>
        </View>

        {/* RESTORED: Horizontal Sliding Genre Filter Row Menu Section */}
        <View style={{ marginTop: 10, paddingVertical: 4 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
            {genresList.map((g) => (
              <TouchableOpacity 
                key={g} 
                onPress={() => setSelectedGenre(g)}
                style={{ 
                  backgroundColor: selectedGenre === g ? '#D4AF37' : '#141414', 
                  paddingHorizontal: 16, 
                  paddingVertical: 8, 
                  borderRadius: 20, 
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: selectedGenre === g ? '#D4AF37' : '#222'
                }}
              >
                <Text style={{ color: selectedGenre === g ? '#000' : '#aaa', fontWeight: 'bold', fontSize: 13 }}>{g}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Section A: Original Video Catalog Section */}
        <View style={{ padding: 16, marginTop: 10 }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Trending Video Feeds</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity 
              onPress={() => playMediaTrack('https://googleapis.com', 'Newcastle Cypher Pt. 4')}
              style={{ width: 150, backgroundColor: '#121212', borderRadius: 12, padding: 10, marginRight: 12, borderWidth: 1, borderColor: '#222' }}
            >
              <View style={{ height: 90, backgroundColor: '#1c170d', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                <Svg width="28" height="28" viewBox="0 0 24 24"><Path d="M8 5v14l11-7z" fill="#D4AF37" /></Svg>
              </View>
              <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: 8, fontSize: 13 }} numberOfLines={1}>Newcastle Cypher</Text>
              <Text style={{ color: '#666', fontSize: 11, marginTop: 2 }}>Tap to Stream Video</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => playMediaTrack('https://googleapis.com', 'Kasi Anthem Vol. 3')}
              style={{ width: 150, backgroundColor: '#121212', borderRadius: 12, padding: 10, marginRight: 12, borderWidth: 1, borderColor: '#222' }}
            >
              <View style={{ height: 90, backgroundColor: '#0d131c', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                <Svg width="28" height="28" viewBox="0 0 24 24"><Path d="M8 5v14l11-7z" fill="#3b82f6" /></Svg>
              </View>
              <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: 8, fontSize: 13 }} numberOfLines={1}>Kasi Anthem Vol. 3</Text>
              <Text style={{ color: '#666', fontSize: 11, marginTop: 2 }}>Tap to Stream Video</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* NEW SEGMENT: Top DJ Mixtapes List Display Grid Component */}
        <View style={{ padding: 16, marginTop: 5 }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>DJs Mixtapes</Text>
          <Text style={{ color: '#666', fontSize: 12, marginBottom: 12 }}>Top selected genre mixes right now</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredMixes.map((mix) => (
              <TouchableOpacity 
                key={mix.id}
                onPress={() => playMediaTrack('https://googleapis.com', `${mix.dj} - ${mix.title}`)}
                style={{ width: 160, backgroundColor: '#0d0d0d', borderRadius: 14, padding: 12, marginRight: 14, borderWidth: 1, borderColor: '#1a1a1a' }}
              >
                <View style={{ height: 100, backgroundColor: mix.color, borderRadius: 10, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold', position: 'absolute', top: 8, left: 8, backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>{mix.genre}</Text>
                  <Svg width="36" height="36" viewBox="0 0 24 24">
                    <Circle cx="12" cy="12" r="10" fill="#fff" opacity="0.15" />
                    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="#D4AF37" />
                  </Svg>
                </View>
                <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: 10, fontSize: 14 }} numberOfLines={1}>{mix.title}</Text>
                <Text style={{ color: '#888', fontSize: 12, marginTop: 2 }}>{mix.dj}</Text>
                <Text style={{ color: '#444', fontSize: 11, marginTop: 4 }}>{mix.length} • Audio Feed</Text>
              </TouchableOpacity>
            ))}
      
