import React from 'react'
import { MetricModel, metricPossibleValue } from '@/model/MetricModel'
import { FlatList } from 'react-native-gesture-handler';
import MetricChoiceButton from './MetricChoiceButton';
import MetricUpdateStyle from '@/style/ExerciseDisplay/MetricDisplay/MetricUpdateStyle';
import { Text } from 'react-native';
import MetricUpdateBottomSheetStyle from '@/style/ExerciseDisplay/MetricDisplay/MetricUpdateBottomSheetStyle';

export default function MetricUpdate({metric, updateMethod} : {metric: MetricModel, updateMethod: (metric : MetricModel) => void}) {
    const metricChoices = metricPossibleValue(metric);
    const updateMetric = (value : number) => {
        metric.value = value;
        updateMethod(metric);
    }
    return (
        <>
            <Text style={MetricUpdateBottomSheetStyle.name}>{metric.name}</Text>
            {
                metricChoices.length <= 10 &&
                <FlatList
                    style={MetricUpdateStyle.numberListContainer}
                    contentContainerStyle={MetricUpdateStyle.numberList}
                    numColumns={5}
                    data={metricChoices}
                    renderItem={({item}) => <MetricChoiceButton choice={item} updateMethod={updateMetric}/>}
                />
            }
        </>
    )
}