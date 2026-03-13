import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Pressable,
  Switch,
  ActivityIndicator,
  FlatList,
  Button,
} from 'react-native';
import { useAppStore } from './Store.js';
import blueprint from './jsons/screens.json';
import styles from './jsons/styles.json';
import custComps from './jsons/components.json';
import useService from './useService.js';

const components = {
  View: View,
  SafeAreaView: SafeAreaView,
  ScrollView: ScrollView,
  KeyboardAvoidingView: KeyboardAvoidingView,
  Text: Text,
  TextInput: TextInput,
  TouchableOpacity: TouchableOpacity,
  Pressable: Pressable,
  Button: Button,
  Image: Image,
  ActivityIndicator: ActivityIndicator,
  Switch: Switch,
  FlatList: FlatList,
  StatusBar: StatusBar,
};

const RenderNode = ({ node }) => {
  const Comp = components[node.type];
  const { curScreen, setState, screenData, setField } = useAppStore();
  const service = useService();

  if (!Comp) {
    console.warn(`Unknown component type: ${node.type}`);
    return null;
  }

  let finalProps = { ...node.props };

  if (node.type === 'TextInput') {
    finalProps = {
      ...finalProps,
      value: screenData[curScreen]?.[node.field] || '',
      onChangeText: text => setField(curScreen, node.field, text),
      placeholderTextColor: '#999',
    };
  }

  if (node.type === 'TouchableOpacity') {
    finalProps.onPress = () => {
      service[node.action]?.();
    };
  }

  if (node.type === 'FlatList') {
    finalProps = {
      ...finalProps,
      renderItem: ({ item }) => {
        const dataNode = JSON.stringify(custComps[node.itemTemplate])
          .replace('name', item.name)
          .replace('phone', item.phone);
        return <RenderNode node={JSON.parse(dataNode)} />;
      },
    };
  }

  const children =
    node.props?.children ||
    node.children?.map((child, index) => (
      <RenderNode key={index} node={child} />
    ));

  return (
    <Comp {...finalProps} style={[node.style, styles[node.styleRef]]}>
      {children}
    </Comp>
  );
};

const Renderer = () => {
  const { curScreen, loading } = useAppStore();
  return <RenderNode node={blueprint[curScreen]} />;
};

export default Renderer;
