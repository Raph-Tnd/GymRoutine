import { View } from 'react-native'
import React from 'react'
import Metric from './MetricDisplay/Metric'
import { MetricModel } from '@/model/MetricModel'
import { FlatList } from 'react-native-gesture-handler'
import ExerciseExpandedStyle from '@/style/Session/ExerciseDisplay/ExerciseExpandedStyle'

export default function ExerciseExpanded({metrics, callUpdateMetricMethod} : {metrics : MetricModel[], callUpdateMetricMethod: (metric: MetricModel) => void}) {
    return (
        <View style={ExerciseExpandedStyle.body}>
            <FlatList
                contentContainerStyle={ExerciseExpandedStyle.metricListContainer}
                style={ExerciseExpandedStyle.metricList}
                data={metrics}
                renderItem={({item}) => <Metric metric={item} callUpdateMetricMethod={callUpdateMetricMethod}/>}
            />
        </View>
    )
}