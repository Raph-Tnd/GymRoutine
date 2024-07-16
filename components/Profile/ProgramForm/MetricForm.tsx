// MetricForm.tsx
import { MetricModel } from '@/model/MetricModel';
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function MetricForm({ metric, onUpdate } : { metric: MetricModel, onUpdate: (metric: MetricModel) => void}){
	const handleChange = (field: keyof MetricModel, value: string | number) => {
		onUpdate({ ...metric, [field]: value });
	};

	return (
		<View style={styles.container}>
		<TextInput
			style={styles.input}
			value={metric.name}
			onChangeText={(value) => handleChange('name', value)}
			placeholder="Enter metric name"
		/>

		<TextInput
			style={styles.input}
			value={(metric.value ??0).toString()}
			onChangeText={(value) => handleChange('value', parseFloat(value) || 0)}
			keyboardType="numeric"
			placeholder="Enter metric value"
		/>
		</View>
	);
};

const styles = StyleSheet.create({
container: {
	marginTop: 8,
	padding: 8,
	borderWidth: 1,
	borderColor: '#f0f0f0',
	borderRadius: 4,
},
label: {
	fontSize: 12,
	fontWeight: 'bold',
	marginBottom: 2,
},
input: {
	borderWidth: 1,
	borderColor: '#ccc',
	borderRadius: 4,
	padding: 6,
	marginBottom: 8,
},
});