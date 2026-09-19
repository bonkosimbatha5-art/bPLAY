import { StatusBar } from 'expo-status-bar';
import { useRef, useState, useEffect } from 'react';
import { Text, View, ScrollView, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const HERO = [
{ id:'1', kicker:'HIP-HOP', title:'Newcastle Cypher Pt. 4', img:'https://images.unsplash.com/photo-1516450360452-9312abbf6f7e?q=80&w=800' },
{ id:'2', kicker:'AFROHOUSE', title:'Midnight in Soshanguve', img:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800' },
{ id:'3', kicker:'AMAPIANO', title:'Kasi Anthem Vol. 3', img:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800' },
];
export default function App(){
const [current, setCurrent] = useState('Newcastle Cypher');
const scrollRef = useRef(null);
const [idx, setIdx] = useState(0);
useEffect(()=>{
const i = setInterval(()=>{
const next = (idx+1)%HERO.length;
setIdx(next);
scrollRef.current?.scrollTo({x: next*width, animated:true});
},4000);
return ()=>clearInterval(i);
},[idx]);
return(
<View style={{flex:1, backgroundColor:'#0a0a0a'}}>
<StatusBar style="light" />
<View style={{paddingTop:50, padding:16, flexDirection:'row', justifyContent:'space-between'}}>
<Text style={{color:'#fff', fontWeight:'900'}}>bLVCK PLAY</Text>
<Text style={{color:'#888', fontSize:10}}>LSb EVENTS</Text>
</View>
<ScrollView horizontal pagingEnabled ref={scrollRef} showsHorizontalScrollIndicator={false} style={{height:380}}>
{HERO.map(s=>(
<ImageBackground key={s.id} source={{uri:s.img}} style={{width, height:380}}>
<View style={{flex:1, backgroundColor:'rgba(0,0,0,0.5)', padding:16, justifyContent:'flex-end'}}>
<Text style={{color:'#D4AF37'}}>{s.kicker}</Text>
<Text style={{color:'#fff', fontSize:28, fontWeight:'900'}}>{s.title}</Text>
<TouchableOpacity onPress={()=>setCurrent(s.title)} style={{backgroundColor:'#fff', padding:10, borderRadius:20, marginTop:10, alignSelf:'flex-start'}}>
<Text style={{fontWeight:'800'}}>Play Now</Text>
</TouchableOpacity>
</View>
</ImageBackground>
))}
</ScrollView>
<View style={{padding:16}}><Text style={{color:'#D4AF37'}}>Now: {current}</Text></View>
</View>
);
                                        }
