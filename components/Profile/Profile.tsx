import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ProgramModel } from '@/model/ProgramModel';
import { ProgramContext } from '../global/Provider/ProgramProvider';
import APISingleton from '@/services/APISingleton';
import { AuthContext } from '../global/Provider/AuthProvider';
import ProgramShortDisplay from '../Program/ProgramShortDisplay';
import { FlatList } from 'react-native-gesture-handler';
import GlobalStyle from '@/style/global/GlobalStyle';
import NewProgramOption from './NewProgramOption';

export default function Profile() {
    const [programSaved, setProgramSaved] = useState<ProgramModel[]>([]);
    const {currentUser} = useContext(AuthContext);

    useEffect(() =>{
        let unsubscribed = false;
        const fetchProgram = async () => {
            if(programSaved.length === 0 && currentUser != undefined){
                let fetchedProgram = await APISingleton.getInstance().GetProgramsSaved({user_id : currentUser.user.email});
                if(!unsubscribed){
                    setProgramSaved((prev) => [...fetchedProgram]);
                }
            }
        }
        fetchProgram();
        return () => {
            unsubscribed = true;
        }
    },[])
    return (
        <View style={GlobalStyle.body}>
            <Text style={GlobalStyle.mainLabel}>Your program</Text>
            <FlatList
                contentContainerStyle={GlobalStyle.listContainer}
                style={GlobalStyle.list}
                data={programSaved}
                renderItem={({item}) => <ProgramShortDisplay program={item}/>}
                ListFooterComponent={<View style={{paddingBottom : 10}}/>}
            />
            <NewProgramOption/>
        </View>
    )
}