// code by t.me/fploit
import React, { useState } from 'react';
import {Image, Text, View, Linking, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import RNSimpleOpenvpn from 'react-native-simple-openvpn';
import { AppBar, IconButton, Backdrop, Button} from "@react-native-material/core";
import Icon from 'react-native-vector-icons/MaterialIcons';


const App = () => {

  const [log, setLog] = useState('');
  const [connectLoading, setConnectLoading] = useState(false)
  const [keyColor, setKeyColor] = useState("red")
  const [keyIcon, setKeyIcon] = useState("vpn-key")
  const [connected, setConnected] = useState(false)
  const [cat, setCat] = useState(require("./assets/img/dis.gif"))
  const [revealed, setRevealed] = useState(false);
  const ip = "vpn745997194.opengw.net"
  const port = "1881"
  const buyLink = "https://google.com"

  const connect = () => {
    if (connected) {
      setConnectLoading(true);
      stopOvpn();
    } else {
      setConnectLoading(true);
      startOvpn();
    }
  }

  async function startOvpn() {
    try {
      await RNSimpleOpenvpn.connect({
        remoteAddress: ip + " " + port,
        ovpnFileName: 'Russian', // Japan or Russian (android assets folder)
        assetsPath: '',
        notificationTitle: 'safe vpn',
        compatMode: RNSimpleOpenvpn.CompatMode.OVPN_TWO_THREE_PEER,
        providerBundleIdentifier: 'com.your.network.extension.bundle.id',
        localizedDescription: 'TestRNSimpleOvpn',
      }).then(() => {setTimeout(() => {
        setConnectLoading(false)
        setKeyColor("#009C94")
        setKeyIcon("power-settings-new")
        setConnected(true)
        setCat(require("./assets/img/con.gif"))
      }, 2000);});
    } catch (error) {
      updateLog(error);
      setConnectLoading(false)
    }
  }

  async function stopOvpn() {
    try {
      await RNSimpleOpenvpn.disconnect().then(() => {setTimeout(() => {
        setConnectLoading(false)
        setKeyColor("red")
        setKeyIcon("vpn-key")
        setConnected(false)
        setCat(require("./assets/img/dis.gif"))
      }, 2000);});
    } catch (error) {
      updateLog(error);
      setConnectLoading(false)
    }
  }

  function printVpnState() {
    updateLog(JSON.stringify(RNSimpleOpenvpn.VpnState, undefined, 2));
  }

  function updateLog(newLog) {
    const now = new Date().toLocaleTimeString();
    setLog(`${log}\n[${now}] ${newLog}`);
  }

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    roundButton1: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      padding: 10,
      borderRadius: 100,
      backgroundColor: keyColor,
      position: "absolute",
      top: -60
    }
  });

  return (
    <>
      <Backdrop
        revealed={revealed}
        header={
          <AppBar
            title="Safe VPN"
            transparent
            leading={props => (
              <IconButton
                icon={props => (
                  <Icon name="menu" {...props} />
                )}
                onPress={() => setRevealed(prevState => !prevState)}
                {...props}
              />
            )}
          />
        }
        backLayer={<View style={{ height: 100 }}>
          <Button onPress={() => Linking.openURL(buyLink)} color='#009C94' style={{width: "80%", marginLeft: "10%"}} title="Buy Premium" />
          <Button color='#009C94' style={{width: "80%", marginLeft: "10%", marginTop: 5}} title="About" />
        </View>}
      >
        <Image source={cat} />

        <Text style={{textAlignVertical: "center",textAlign: "center", fontSize: 40, color: connected ? "#009C94" : "red"}}>{connected? "connected" : "disconected"}</Text>
        {connected&& <Text style={{textAlignVertical: "center",textAlign: "center", color: "gray"}}>Your IP: {ip}</Text>}

        <AppBar
          variant="bottom"
          leading={props => (
            <IconButton onPress={() => Linking.openURL(buyLink)} icon={props => <Icon name="star" {...props} />} {...props} />
          )}
          trailing={props => (
            <IconButton
              icon={props => <Icon name="support-agent" {...props} />}
              {...props}
            />
          )}
          style={{ position: "absolute", start: 0, end: 0, bottom: 0 }}
        >
          <TouchableOpacity
            style={styles.roundButton1}
            onPress={() => connect()}
          >
            {connectLoading&& <ActivityIndicator size="large" color="white" />}
            {!connectLoading&& <Icon style={{fontSize: 50}} name={keyIcon} />}
          </TouchableOpacity>
         
          
          
        </AppBar>
      </Backdrop>


      
    </>
  );
};





export default App;
