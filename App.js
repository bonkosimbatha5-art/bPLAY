import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

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
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [currentTitle, setCurrentTitle] = useState('Newcastle Cypher Pt. 4');

  const genresList = ['All', 'Amapiano', 'Deep House', 'Hip-Hop', 'Maskandi'];

  const djMixtapes = [
    { id: 'm1', genre: 'Amapiano', title: 'Groove Cartel Mix', dj: 'Kabza De Small', length: '1:24:10', color: '#1c170d' },
    { id: 'm2', genre: 'Deep House', title: 'RedBox Radio Session', dj: 'Black Coffee', length: '58:45', color: '#0d131c' },
    { id: 'm3', genre: 'Hip-Hop', title: 'Spring Lockdown Cypher', dj: 'Nasty C x Maglera', length: '45:12', color: '#1a101a' },
    { id: 'm4', genre: 'Maskandi', title: 'Bhaca Tribal Beats', dj: 'Mthandeni SK', length: '1:02:30', color: '#101c14' }
  ];

  const renderContent = () => {
    if (activeTab === 'search') return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Search Engine View</Text></View>;
    if (activeTab === 'live') return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Live TV Stream Feed</Text></View>;
    if (activeTab === 'downloads') return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>No Offline Tracks Cached</Text></View>;

    const filteredMixes = selectedGenre === 'All' ? djMixtapes : djMixtapes.filter(m => m.genre === selectedGenre);

    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Visual Media Deck Interface Layout */}
        <View style={{ width: width, height: 180, backgroundColor: '#0d0d0d', marginTop: 40, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: '#161616' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 200 }}>
            <Text style={{ color: '#888', fontSize: 24, marginHorizontal: 20 }}>◀◀</Text>
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#000', fontSize: 18, marginLeft: 2 }}>▶</Text>
            </View>
            <Text style={{ color: '#888', fontSize: 24, marginHorizontal: 20 }}>▶▶</Text>
          </View>
        </View>

        {/* Media Information Block */}
        <View style={{ padding: 16, backgroundColor: '#050505' }}>
          <Text style={{ color: '#E50914', fontWeight: 'bold', fontSize: 11, letterSpacing: 1 }}>● NOW PLAYING</Text>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: '900', marginTop: 4 }}>{currentTitle}</Text>
          <Text style={{ color: '#666', fontSize: 12, marginTop: 2 }}>bLVCK PLAY Premium Content Hub</Text>
        </View>

        {/* Horizontal Sliding Genre Selectors */}
        <View style={{ marginTop: 12, paddingVertical: 4 }}>
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

        {/* Video Catalog Horizontal Block */}
        <View style={{ padding: 16, marginTop: 5 }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Trending Video Feeds</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity 
              onPress={() => setCurrentTitle('Newcastle Cypher Pt. 4')}
              style={{ width: 150, backgroundColor: '#121212', borderRadius: 12, padding: 10, marginRight: 12, borderWidth: 1, borderColor: '#222' }}
            >
              <View style={{ height: 90, backgroundColor: '#1c170d', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                <Svg width="28" height="28" viewBox="0 0 24 24"><Path d="M8 5v14l11-7z" fill="#D4AF37" /></Svg>
              </View>
              <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: 8, fontSize: 13 }} numberOfLines={1}>Newcastle Cypher</Text>
              <Text style={{ color: '#666', fontSize: 11, marginTop: 2 }}>Select Track</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setCurrentTitle('Kasi Anthem Vol. 3')}
              style={{ width: 150, backgroundColor: '#121212', borderRadius: 12, padding: 10, marginRight: 12, borderWidth: 1, borderColor: '#222' }}
            >
              <View style={{ height: 90, backgroundColor: '#0d131c', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                <Svg width="28" height="28" viewBox="0 0 24 24"><Path d="M8 5v14l11-7z" fill="#3b82f6" /></Svg>
              </View>
              <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: 8, fontSize: 13 }} numberOfLines={1}>Kasi Anthem Vol. 3</Text>
              <Text style={{ color: '#666', fontSize: 11, marginTop: 2 }}>Select Track</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* DJ Mixtapes Section Layout Grid */}
        <View style={{ padding: 16, marginTop: 5 }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>DJs Mixtapes</Text>
          <Text style={{ color: '#555', fontSize: 12, marginBottom: 12 }}>Top genre mixes right now</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredMixes.map((mix) => (
              <TouchableOpacity 
                key={mix.id}
                onPress={() => setCurrentTitle(`${mix.dj} - ${mix.title}`)}
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
                <Text style={{ color: '#444', fontSize: 11, marginTop: 4 }}>{mix.length}</Text>
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

      {/* Floating Bottom Menu Bar Navigation */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#0a0a0a', borderTopWidth: 1, borderColor: '#161616', height: 75, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 12 }}>
        <TouchableOpacity onPress={() => setActiveTab('home')} style={{ alignItems: 'center', width: 60 }}>
          <NavIcon type="home" active={activeTab === 'home'} />
          <Text style={{ color: activeTab === 'home' ? '#D4AF37' : '#666', fontSize: 10, marginTop: 5 }}>Home</Text>
        </TouchableOpacity>
