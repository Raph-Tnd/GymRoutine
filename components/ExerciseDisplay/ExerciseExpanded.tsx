import { View } from 'react-native'
import ExerciseExpandedStyle from '@/style/ExerciseDisplay/ExerciseExpandedStyle'
import React from 'react'
import Metric from './MetricDisplay/Metric'
import { MetricModel } from '@/model/MetricModel'
import { FlatList } from 'react-native-gesture-handler'

export default function ExerciseExpanded({metrics, callUpdateMetricMethod} : {metrics : MetricModel[], callUpdateMetricMethod: (metric: MetricModel) => void}) {
    return (
        <View style={[ExerciseExpandedStyle.body]}>
            <FlatList
                contentContainerStyle={ExerciseExpandedStyle.metricListContainer}
                style={ExerciseExpandedStyle.metricList}
                data={metrics}
                renderItem={({item}) => <Metric metric={item} callUpdateMetricMethod={callUpdateMetricMethod}/>}
            />
        </View>
    )
}