import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useAppStore } from './Store.js';
import screens from './screens.json';
import useService from './useService.js';

const components = {
  View: View,
  Text: Text,
  TextInput: TextInput,
  TouchableOpacity: TouchableOpacity,
  Image: Image,
  ScrollView: ScrollView,
};

const RenderNode = ({ node, formData, setFormData }) => {
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

  const children = node.children?.map((child, index) => (
    <RenderNode
      key={index}
      node={child}
      formData={formData}
      setFormData={setFormData}
    />
  ));

  let content = children;
  if (node.type === 'TouchableOpacity' && node.props.title && !node.children) {
    content = (
      <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
        {node.props.title}
      </Text>
    );
  }

  return (
    <Comp {...finalProps} style={node.style}>
      {content}
    </Comp>
  );
};

const Renderer = () => {
  const { curScreen, screenData } = useAppStore();
  return <RenderNode node={screens[curScreen]} />;
};

export default Renderer;
