import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useAppStore } from './Store';
import screens from './screens.json';

const components = {
  View: View,
  Text: Text,
  TextInput: TextInput,
  TouchableOpacity: TouchableOpacity,
  Image: Image,
};

const RenderNode = ({ node, formData, setFormData }) => {
  const Comp = components[node.type];
  const { curScreen, setState } = useAppStore();

  if (!Comp) {
    console.warn(`Unknown component type: ${node.type}`);
    return null;
  }

  let finalProps = { ...node.props };

  if (node.type === 'TextInput') {
    const field = node.props.placeholder.toLowerCase();
    finalProps = {
      ...finalProps,
      value: formData[field] || '',
      onChangeText: text => setFormData(prev => ({ ...prev, [field]: text })),
      placeholderTextColor: '#999',
    };
  }

  if (node.type === 'TouchableOpacity') {
    finalProps.onPress = () => {
      if (node.action === 'nav') {
        setState('curScreen', node.toScreen);
      }

      //   console.log('Login attempt', formData);
      //   alert(
      //     `Email: ${formData.email || ''}\nPassword: ${formData.password || ''}`,
      //   );
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
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { curScreen } = useAppStore();

  return (
    <RenderNode
      node={screens[curScreen]}
      formData={formData}
      setFormData={setFormData}
    />
  );
};

export default Renderer;
