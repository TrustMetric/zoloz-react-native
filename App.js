/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import { Button, Text, View,  NativeModules, StyleSheet, TextInput, Platform} from "react-native";
import RNFS from 'react-native-fs';
const { ZolozKit } = NativeModules;

const App = () => {
  const [host, onChangeHost] = useState("http://30.45.188.62:8082");
  const [api, onChangeApi] = useState("/api/realid/initialize");
  const [doc, onChangeDoc] = useState("00000001003");
  const [level, onChangeLevel] = useState("REALID0002");
  return (
    <>
      <View style={styles.container}>
        <View style={styles.rows}>
          <Text style={styles.title}>{"HOST:"}</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeHost}
            value={host}
          />   
        </View>
        <View style={styles.rows}>
          <Text style={styles.title}>{"API:"}</Text>      
          <TextInput
            style={styles.input}
            onChangeText={onChangeApi}
            value={api}
          />   
        </View>
        <View style={styles.rows}>
          <Text style={styles.title}>{"DOC:"}</Text>         
          <TextInput
            style={styles.input}
            onChangeText={onChangeDoc}
            value={doc}
          />
        </View>   
        <View style={styles.rows}>
          <Text style={styles.title}>{"LEVEL:"}</Text>         
          <TextInput
            style={styles.input}
            onChangeText={onChangeLevel}
            value={level}
          />
        </View>
        <View style={styles.rows}>
            <Button
            onPress = {() => {
                
                ZolozKit.getMetaInfo((metainf) => {
                  let requestData = {
                    "metaInfo": metainf,
                    "serviceLevel":level,
                    "docType":  doc
                  }
                  let url = [host] + [api]
                  let opts = {
                      'method': "POST",   //请求方法
                      'body': JSON.stringify(requestData),   //请求体
                      'headers': {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                  }

                  const RNFS = require('react-native-fs');

                //安卓UI配置文件放在了asset里面,能成功取出就把androidpath路径赋值给sdk变色龙参数
                if (Platform.OS == 'android'){
                  let androidpath = RNFS.DocumentDirectoryPath + '/config_realId.zip';
                  let copyJob;
                  copyJob = RNFS.copyFileAssets("config_realId.zip", androidpath)
                  copyJob.then(results => {
                    RNFS.exists(androidpath).then(b => console.log(b))
                    console.log(androidpath)
                    fetch(url, opts)
                      .then(response => response.json())
                      .then(response => {
                        console.log(response)
                        const { ZLZ_LOCAL_KEY, ZLZ_CHAMELEON_KEY, ZLZ_PUB_KEY } = ZolozKit.getConstants();
                        jsonData = response
                        public_key = jsonData["rsaPubKey"]
                        clientCfg = jsonData["clientCfg"]

                        ZolozKit.start(clientCfg, {
                          [ZLZ_LOCAL_KEY] : 'en',
                          [ZLZ_PUB_KEY]: [public_key],
                          [ZLZ_CHAMELEON_KEY]: androidpath
                        }, (result) => {
                          alert(result, [{ text: 'OK', onPress: () => console.log('OK Pressed!') },])
                          console.log(result);
                        })
                      }).catch(function (e) {
                        alert(e, [{ text: 'OK', onPress: () => console.log('OK Pressed!') },]);
                      });
                    })
                    .catch(err => {
                      console.log('Error copying file', err);
                    });
                }else{//iOS通过bundle获取,能成功取出就把iosPath赋值给sdk的变色龙参数
                    const iosPath = RNFS.MainBundlePath + '/config_realId.zip'
                    console.log('bundle路径=='+iosPath)
                    let readData = RNFS.readFile(iosPath,'base64')
                    readData.then((result) => {
                        fetch(url, opts)
                        .then(response => response.json())
                        .then(response => {
                            console.log(response)
                            const {  ZLZ_LOCAL_KEY, ZLZ_CHAMELEON_KEY, ZLZ_PUB_KEY } = ZolozKit.getConstants();
                            jsonData = response
                            public_key = jsonData["rsaPubKey"]
                            clientCfg = jsonData["clientCfg"]
                            ZolozKit.start(clientCfg, {
                              [ZLZ_LOCAL_KEY] : 'en',
                              [ZLZ_PUB_KEY]: [public_key],
                              [ZLZ_CHAMELEON_KEY]:iosPath
                            }, (result) => {
                              alert(result, [{text: 'OK', onPress: () => console.log('OK Pressed!')},])
                              console.log(result);
                            }) 
                        }).catch(function (e) {
                              alert(e, [{text: 'OK', onPress: () => console.log('OK Pressed!')},]);
                          });
                    })
                   }

                })
              }}
             title="start"></Button>
        </View>
      </View>    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#33a8ff',
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
    height: 40,
    margin: 12,
    padding: 10,
    paddingRight: 0,
    marginRight: 0,
    width: 48
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 260
  },
  rows: {
    flexDirection: 'row',
  }
});

export default App;
