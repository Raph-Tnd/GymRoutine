import React from 'react'
import { MetricModel, metricPossibleValue } from '@/model/MetricModel'
import { FlatList } from 'react-native-gesture-handler';
import MetricChoiceButton from './MetricChoiceButton';
import MetricUpdateStyle from '@/style/ExerciseDisplay/MetricDisplay/MetricUpdateStyle';

export default function MetricUpdate({metric} : {metric: MetricModel}) {
    const metricChoices = metricPossibleValue(metric);
    return (
        <>
            {
                metricChoices.length <= 10 &&
                <FlatList
                    style={MetricUpdateStyle.numberListContainer}
                    contentContainerStyle={MetricUpdateStyle.numberList}
                    data={metricChoices}
                    renderItem={({item}) => <MetricChoiceButton choice={item}/>}
                />
            }
        </>
    )
}