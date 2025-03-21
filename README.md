# zoloz_demo_rn

The reactnative demo that call the zoloz sdk

## Getting Started

### Refer to the following link to configure the reactnatvie environment:

https://reactnative.cn/docs/environment-setup


## Install and run 

Open the terminal and run it in your project directory

```
  cd xx/ZolozRNDemo
  npm install

```

Then you can see the node_modules folder int the ZolozRNDemo folder.


## With iOS project support, you need to configure the private spec in `ios/Podfile`:

```
source 'https://github.com/zoloz-pte-ltd/zoloz-demo-ios'
```

This will add a line like this to your Podfile flie:

```

  pod 'zolozkit'


```

Then Open the terminal and run it in ios project directory:

```
 
  pod install


```

If you want to update ios zoloz sdk，need to open the terminal and run it in the ios project directory:

```
 
  pod update


```


## With Andorid project support:

####	1.For react-native version is lower than 0.70.0，you need to add a line like this to your android/app/build.gradle flie:

```

    implementation 'com.zoloz.android.build:zolozkit:1.2.13.230404102843'
	implementation "com.squareup.okio:okio:1.7.0@jar"
    implementation "com.alibaba:fastjson:1.1.68.android"

```


####    2.For react-native version is higher than 0.70.0，you need to add a line like this to your node_modules/react-native-zolozkit/andorid/build.gradle flie:

```

    implementation 'com.zoloz.android.build:zolozkit:1.2.13.230404102843'
	implementation "com.squareup.okio:okio:1.7.0@jar"
    implementation "com.alibaba:fastjson:1.1.68.android"


```

### If you want to use 'UI configuration'. you should reference the react-native-fs library.The following link tells you how to reference it.

  
  https://github.com/itinance/react-native-fs

# zoloz-react-native
