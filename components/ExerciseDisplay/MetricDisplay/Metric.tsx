import { Text, Pressable } from 'react-native'
import React from 'react'
import MetricStyle from '@/style/ExerciseDisplay/MetricDisplay/MetricStyle'
import { MetricModel } from '@/model/MetricModel'

export default function Metric({metric , callUpdateMetricMethod} : {metric: MetricModel, callUpdateMetricMethod: (metric: MetricModel) => void}) {
    return (
        <>
            <Pressable style={MetricStyle.body} onPress={() => callUpdateMetricMethod(metric)}>
                <Text style={MetricStyle.label}>{metric.name}</Text>
                <Text style={MetricStyle.value}>{metric.value}</Text>
            </Pressable>
        </>
    )
}