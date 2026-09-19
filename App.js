import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Custom Navigation Bar Icons
const NavIcon = ({ type, active }) => {
  const color = active ? '#D4AF37' : '#888888';
  if (type === 'home') return (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none"><Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill={color} /></Svg>);
  if (type === 'search') return (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none"><Path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill={color} /></Svg>);
  if (type === 'live') return (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none"><Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill={color} /></Svg>);
  if (type === 'downloads') return (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none"><Path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" fill={color} /></Svg>);
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentTrack, setCurrentTrack] = useState('Select a mixtape to play');

  // Horizontal sliding genre banner structures
  const genrebanners = [
    { id: 'g1', title: 'Deep House', count: '42 Active Tapes', color: '#1a1412' },
    { id: 'g2', title: 'Amapiano', count: '108 Active Tapes', color: '#1c170d' },
    { id: 'g3', title: 'Hip-Hop', count: '65 Active Tapes', color: '#15101a' },
    { id: 'g4', title: 'Maskandi', count: '39 Active Tapes', color: '#101c14' }
  ];

  // Lower grid playlist tracks data
  const djMixtapes = [
    { id: 'm1', genre: 'Amapiano', title: 'Groove Cartel Vol. 4', dj: 'Kabza De Small', length: '1:24:10', color: '#261f0f' },
    { id: 'm2', genre: 'Deep House', title: 'RedBox Radio Session', dj: 'Black Coffee', length: '58:45', color: '#111a26' },
    { id: 'm3', genre: 'Hip-Hop', title: 'Lockdown Cypher Pt. 2', dj: 'Nasty C x Maglera', length: '45:12', color: '#261226' },
    { id: 'm4', genre: 'Maskandi', title: 'Bhaca Tribal Beats', dj: 'Mthandeni SK', length: '1:02:30', color: '#122619' }
  ];

  const renderContent = () => {
    if (activeTab === 'search') return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Search Engine View</Text></View>;
    if (activeTab === 'live') return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Live TV Stream Feed</Text></View>;
    if (activeTab === 'downloads') return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>No Offline Tracks Cached</Text></View>;

    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 110 }}>
        
        {/* Header Display */}
        <View style={{ paddingTop: 60, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: '900', letterSpacing: 0.5 }}>bLVCK PLAY</Text>
          <View style={{ backgroundColor: '#111', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
            <Text style={{ color: '#D4AF37', fontSize: 10, fontWeight: 'bold' }}>PREMIUM</Text>
          </View>
        </View>

        {/* Current Audio Player Information Panel Bar */}
        <View style={{ margin: 16, padding: 16, backgroundColor: '#0d0d0d', borderRadius: 14, borderWidth: 1, borderColor: '#1c1c1c' }}>
          <Text style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: 10, letterSpacing: 1 }}>NOW PLAYING</Text>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 4 }} numberOfLines={1}>{currentTrack}</Text>
        </View>

        {/* RESTORED: Horizontal Sliding Genre Showcase Banner Sliders */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 16, marginBottom: 12 }}>Explore Music Genres</Text>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 0 }}>
            {grentrebanners.map((b) => (
              <View key={b.id} style={{ width: width, paddingHorizontal: 16 }}>
                <View style={{ width: '100%', height: 160, backgroundColor: b.color, borderRadius: 16, padding: 20, justifyContent: 'flex-end', borderWidth: 1, borderColor: '#222' }}>
                  <Text style={{ color: '#D4AF37', fontSize: 12, fontWeight: 'bold' }}>FEATURED CATEGORY</Text>
                  <Text style={{ color: '#fff', fontSize: 28, fontWeight: '900', marginTop: 2 }}>{b.title}</Text>
                  <Text style={{ color: '#888', fontSize: 13, marginTop: 4 }}>{b.count} • Swipe left to slide genre</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* NEW SEGMENT: DJs Mixtapes Genre Feed Grid list */}
        <View style={{ padding: 16, marginTop: 15 }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>DJs Mixtapes</Text>
          <Text style={{ color: '#555', fontSize: 12, marginBottom: 14 }}>Premium compilation feeds from your favorite artists</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {djMixtapes.map((mix) => (
              <TouchableOpacity 
                key={mix.id}
                onPress={() => setCurrentTrack(`${mix.dj} - ${mix.title}`)}
                style={{ width: 165, backgroundColor: '#0d0d0d', borderRadius: 16, padding: 12, marginRight: 14, borderWidth: 1, borderColor: '#161616' }}
              >
                <View style={{ height: 105, backgroundColor: mix.color, borderRadius: 12, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                  <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold', position: 'absolute', top: 8, left: 8, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>{mix.genre}</Text>
                  <Svg width="32" height="32" viewBox="0 0 24 24">
                    <Circle cx="12" cy="12" r="10" fill="#fff" opacity="0.1" />
                    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="#D4AF37" />
                  </Svg>
                </View>
                <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: 10, fontSize: 13 }} numberOfLines={1}>{mix.title}</Text>
                <Text style={{ color: '#777', fontSize: 12, marginTop: 2 }}>{mix.dj}</Text>
                <Text style={{ color: '#444', fontSize: 10, marginTop: 6, fontWeight: 'bold' }}>{mix.length} • Play Tape</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="light" />
      {renderContent()}

      {/* Floating Bottom Navigation Tab Bar Dock */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#0a0a0a', borderTopWidth: 1, borderColor: '#141414', height: 75, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 12 }}>
        <TouchableOpacity onPress={() => setActiveTab('home')} style={{ alignItems: 'center', width: 60 }}>
          <NavIcon type="home" active={activeTab === 'home'} />
          <Text style={{ color: activeTab === 'home' ? '#D4AF37' : '#555', fontSize: 10, marginTop: 5, fontWeight: activeTab === 'home' ? 'bold' : 'normal' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('search')} style={{ alignItems: 'center', width: 60 }}>
          <NavIcon type="search" active={activeTab === 'search'} />
          <Text style={{ color: activeTab === 'search' ? '#D4AF37' : '#555', fontSize: 10, marginTop: 5, fontWeight: activeTab === 'search' ? 'bold' : 'normal' }}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('live')} style={{ alignItems: 'center', width: 60 }}>
          <NavIcon type="live" active={activeTab === 'live'} />
          <Text style={{ color: activeTab === 'live' ? '#D4AF37' : '#555', fontSize: 10, marginTop: 5, fontWeight: activeTab === 'live' ? 'bold' : 'normal' }}>Live</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('downloads')} style={{ alignItems: 'center', width: 60 }}>
          <NavIcon type="downloads" active={activeTab === 'downloads'} />
          <Text style={{ color: activeTab === 'downloads' ? '#D4AF37' : '#555', fontSize: 10, marginTop: 5, fontWeight: activeTab === 'downloads' ? 'bold' : 'normal' }}>Downloads</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
