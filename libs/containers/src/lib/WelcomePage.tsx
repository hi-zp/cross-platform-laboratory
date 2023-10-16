import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView, Text, View } from '@cross-platform-laboratory/elements'

export const WelcomePage = () => {
  const [whatsNextYCoord, setWhatsNextYCoord] = useState<number>(0);
  const scrollViewRef = useRef<null | ScrollView>(null);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          ref={(ref) => {
            scrollViewRef.current = ref;
          }}
          contentInsetAdjustmentBehavior="automatic"
          className="h-full bg-white"
        >
          <View className="mx-3 my-6">
            <Text className="text-xl">Hello there,</Text>
            <Text className="text-4xl font-medium" testID="heading">
              Welcome Cross Platform Laboratory 👋
            </Text>
          </View>
          <View className="mx-3 my-6">
            <View className="rounded-3 bg-gray2 p-9 mb-6">
              <View className="flex-1 flex-row">
                <Svg
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </Svg>
                <Text className="text-xl text-white ml-3">
                  You're up and running
                </Text>
              </View>
              <TouchableOpacity
                className="bg-white py-4 rounded-2 w-1/2 mt-6"
                onPress={() => {
                  scrollViewRef.current?.scrollTo({
                    x: 0,
                    y: whatsNextYCoord,
                  });
                }}
              >
                <Text style={[styles.textCenter]} className="text-lg">
                  What's next?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="mx-3 my-6">
            <View style={[styles.shadowBox]}>
              <Text style={[styles.marginBottomMd]} className="text-xl">
                Learning materials
              </Text>
              <TouchableOpacity
                style={[styles.listItem, styles.learning]}
                onPress={() =>
                  Linking.openURL(
                    'https://nx.dev/getting-started/intro?utm_source=nx-project'
                  )
                }
              >
                <Svg
                  width={24}
                  height={24}
                  stroke="#000000"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </Svg>
                <View style={styles.listItemTextContainer}>
                  <Text className="text-lg">Documentation</Text>
                  <Text style={[styles.text2XS, styles.textSubtle]}>
                    Everything is in there
                  </Text>
                </View>
                <Svg
                  width={18}
                  height={18}
                  stroke="#000000"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
          <View className="mx-3 my-6">
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://nx.app/?utm_source=nx-project')
              }
            >
              <View style={[styles.listItem, styles.shadowBox]}>
                <Svg width={48} height={48} fill="#000000" viewBox="0 0 24 24">
                  <Path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </Svg>
                <View style={styles.listItemTextContainer}>
                  <Text
                    style={[
                      styles.textBold,
                      styles.marginBottomSm,
                    ]}
                    className="text-lg"
                  >
                    Laboratory is open source
                  </Text>
                  <Text style={[styles.textXS, styles.textLight]}>
                    Love Laboratory? Give us a star!
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            className="mx-3 my-6"
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              setWhatsNextYCoord(layout.y);
            }}
          >
            <View style={styles.shadowBox}>
              <Text style={[styles.marginBottomMd]} className="text-xl">
                Next steps
              </Text>
              <Text
                style={[styles.textSm, styles.textLight, styles.marginBottomMd]}
              >
                Here are some things you can do with Laboratory:
              </Text>
              <View style={styles.listItem}>
                <Svg
                  width={24}
                  height={24}
                  stroke="#000000"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </Svg>
                <View style={styles.listItemTextContainer}>
                  <Text style={styles.textSm}>Add UI library</Text>
                </View>
              </View>
              <View style={[styles.codeBlock, styles.marginBottomLg]}>
                <Text style={[styles.textXS, styles.monospace, styles.comment]}>
                  # Generate UI lib
                </Text>
                <Text
                  style={[
                    styles.textXS,
                    styles.monospace,
                    styles.marginBottomMd,
                  ]}
                >
                  nx g @nx/react-native:lib ui
                </Text>
                <Text style={[styles.textXS, styles.monospace, styles.comment]}>
                  # Add a component
                </Text>
                <Text style={[styles.textXS, styles.monospace]}>nx g \</Text>
                <Text style={[styles.textXS, styles.monospace]}>
                  @nx/react-native:component \
                </Text>
                <Text style={[styles.textXS, styles.monospace]}>
                  button --project ui
                </Text>
              </View>
              <View style={styles.listItem}>
                <Svg
                  width={24}
                  height={24}
                  stroke="#000000"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </Svg>
                <View style={styles.listItemTextContainer}>
                  <Text style={styles.textSm}>
                    View interactive project graph
                  </Text>
                </View>
              </View>
              <View style={[styles.codeBlock, styles.marginBottomLg]}>
                <Text style={[styles.textXS, styles.monospace]}>nx graph</Text>
              </View>
              <View style={styles.listItem}>
                <Svg
                  width={24}
                  height={24}
                  stroke="#000000"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </Svg>
                <View style={styles.listItemTextContainer}>
                  <Text style={styles.textSm}>Run affected commands</Text>
                </View>
              </View>
              <View style={styles.codeBlock}>
                <Text style={[styles.textXS, styles.monospace, styles.comment]}>
                  # See what's affected by changes
                </Text>
                <Text
                  style={[
                    styles.textXS,
                    styles.monospace,
                    styles.marginBottomMd,
                  ]}
                >
                  nx affected:graph
                </Text>
                <Text style={[styles.textXS, styles.monospace, styles.comment]}>
                  # run tests for current changes
                </Text>
                <Text
                  style={[
                    styles.textXS,
                    styles.monospace,
                    styles.marginBottomMd,
                  ]}
                >
                  nx affected:text
                </Text>
                <Text style={[styles.textXS, styles.monospace, styles.comment]}>
                  # run e2e tests for current
                </Text>
                <Text style={[styles.textXS, styles.monospace, styles.comment]}>
                  # changes
                </Text>
                <Text style={[styles.textXS, styles.monospace]}>
                  nx affected:e2e
                </Text>
              </View>
            </View>
            <View style={[styles.listItem, styles.love]}>
              <Text style={styles.textSubtle}>Carefully crafted with </Text>
              <Svg
                width={24}
                height={24}
                fill="rgba(252, 165, 165, 1)"
                stroke="none"
                viewBox="0 0 24 24"
              >
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </Svg>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  codeBlock: {
    backgroundColor: 'rgba(55, 65, 81, 1)',
    marginVertical: 12,
    padding: 12,
    borderRadius: 4,
  },
  monospace: {
    color: '#ffffff',
    fontFamily: 'Courier New',
    marginVertical: 4,
  },
  comment: {
    color: '#cccccc',
  },
  marginBottomSm: {
    marginBottom: 6,
  },
  marginBottomMd: {
    marginBottom: 18,
  },
  marginBottomLg: {
    marginBottom: 24,
  },
  textLight: {
    fontWeight: '300',
  },
  textBold: {
    fontWeight: '500',
  },
  textCenter: {
    textAlign: 'center',
  },
  text2XS: {
    fontSize: 12,
  },
  textXS: {
    fontSize: 14,
  },
  textSm: {
    fontSize: 16,
  },
  textXL: {
    fontSize: 48,
  },
  textContainer: {
    marginVertical: 12,
  },
  textSubtle: {
    color: '#6b7280',
  },
  shadowBox: {
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: '500',
  },
  hero: {
    borderRadius: 12,
    backgroundColor: '#143055',
    padding: 36,
    marginBottom: 24,
  },
  heroTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  heroText: {
    color: '#ffffff',
    marginVertical: 12,
  },
  learning: {
    marginVertical: 12,
  },
  love: {
    marginTop: 12,
    justifyContent: 'center',
  },
});