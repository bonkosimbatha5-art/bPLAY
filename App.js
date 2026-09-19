import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const NavIcon = ({ type, active }) => {
  const color = active ? '#D4AF37' : '#888888';
  if (type === 'home') return (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none"><Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill={color} /></Svg>);
  if (type === 'search') return (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none"><Path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill={color} /></Svg>);
  if (type === 'live') return (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none"><Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill={color} /></Svg>);
  if (type === 'downloads') return (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none"><Path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" fill={color} /></Svg>);
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const videoPlayerRef = useRef(null);
  
  // High-availability open live streaming sample URL to guarantee loading on mobile networks
  const [videoUrl, setVideoUrl] = useState('https://googleapis.com');
  const [currentTitle, setCurrentTitle] = useState('Newcastle Cypher Pt. 4');

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

    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Real Embedded Cloud Video Streaming Player Frame Layout */}
        <View style={{ width: width, height: 230, backgroundColor: '#111', marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Video
            ref={videoPlayerRef}
            source={{ uri: videoUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={false}
            useNativeControls
            style={{ width: width, height: 230 }}
          />
        </View>

        {/* Media Track Header Panel */}
        <View style={{ padding: 20, backgroundColor: '#0a0a0a' }}>
          <Text style={{ color: '#E50914', fontWeight: 'bold', fontSize: 11, letterSpacing: 1 }}>● NOW STREAMING</Text>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: '900', marginTop: 6 }}>{currentTitle}</Text>
          <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>bLVCK PLAY Premium Content Hub</Text>
        </View>

        {/* Video Catalog Items Grid list */}
        <View style={{ padding: 16 }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Trending Video Feeds</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Feed Selection 1 */}
            <TouchableOpacity 
              onPress={() => playMediaTrack('https://googleapis.com', 'Newcastle Cypher Pt. 4')}
              style={{ width: 160, backgroundColor: '#121212', borderRadius: 14, padding: 12, marginRight: 14, borderWidth: 1, borderColor: '#222' }}
            >
              <View style={{ height: 100, backgroundColor: '#1c170d', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Svg width="32" height="32" viewBox="0 0 24 24"><Path d="M8 5v14l11-7z" fill="#D4AF37" /></Svg>
              </View>
              <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: 10, fontSize: 14 }} numberOfLines={1}>Newcastle Cypher</Text>
              <Text style={{ color: '#666', fontSize: 12, marginTop: 2 }}>Tap to Stream Video</Text>
            </TouchableOpacity>

            {/* Feed Selection 2 */}
            <TouchableOpacity 
              onPress={() => playMediaTrack('https://googleapis.com', 'Kasi Anthem Vol. 3')}
              style={{ width: 160, backgroundColor: '#121212', borderRadius: 14, padding: 12, marginRight: 14, borderWidth: 1, borderColor: '#222' }}
            >
              <View style={{ height: 100, backgroundColor: '#0d131c', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Svg width="32" height="32" viewBox="0 0 24 24"><Path d="M8 5v14l11-7z" fill="#3b82f6" /></Svg>
              </View>
              <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: 10, fontSize: 14 }} numberOfLines={1}>Kasi Anthem Vol. 3</Text>
              <Text style={{ color: '#666', fontSize: 12, marginTop: 2 }}>Tap to Stream Video</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="light" />
      {renderContent()}

      {/* Navigation Footer Menu Dock */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#0a0a0a', borderTopWidth: 1, borderColor: '#161616', height: 75, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 12 }}>
        <TouchableOpacity onPress={() => setActiveTab('home')} style={{ alignItems: 'center', width: 60 }}>
          <NavIcon type="home" active={activeTab === 'home'} />
          <Text style={{ color: activeTab === 'home' ? '#D4AF37' : '#666', fontSize: 10, marginTop: 5 }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('search')} style={{ alignItems: 'center', width: 60 }}>
          <NavIcon type="search" active={activeTab === 'search'} />
          <Text style={{ color: activeTab === 'search' ? '#D4AF37' : '#666', fontSize: 10, marginTop: 5 }}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('live')} style={{ alignItems: 'center', width: 60 }}>
          <NavIcon type="live" active={activeTab === 'live'} />
          <Text style={{ color: activeTab === 'live' ? '#D4AF37' : '#666', fontSize: 10, marginTop: 5 }}>Live</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('downloads')} style={{ alignItems: 'center', width: 60 }}>
          <NavIcon type="downloads" active={activeTab === 'downloads'} />
          <Text style={{ color: activeTab === 'downloads' ? '#D4AF37' : '#666', fontSize: 10, marginTop: 5 }}>Downloads</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
