
"use client";

import { ConfigTypes, configSetSelection, configSets, getServerSideProps, setConfigSetSelection } from "contracts";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
//import { changeConfig } from './actions/changeConfig';
import { useEffectOnce } from "@legendapp/state/react";
import { changeConfig } from "./page";
import { getContractData } from "data/contract";
import { defaultChain, supportedChains} from "config/chains";
import mainConfig from "mainConfig";
//import { handleUpdateWagmi } from "components/high-order/withClientConnected";


interface PreHeaderProps extends JSX.IntrinsicAttributes {
    policy: string;
}
  
export default function PreHeader( { policy }: PreHeaderProps) {
    const router = useRouter();
    const [configSet, setConfigSet] = useState(configSetSelection);

    const updateChains = async () => {
        const newSelection = (configSetSelection == configSets.testOld)? configSets.main: configSets.testOld;
        /* if (!window.localStorage.getItem('chainSet')) window.localStorage.setItem('chainSet', newSelectionLocal.chainSetId);
        
        const newSelection = (window.localStorage.getItem('chainSet') == configSets.testOld.chainSetId)? configSets.testOld: configSets.main; */
        
        //setConfigSetSelection(newSelection);
        
        const updateChainsServerAction = async () => {
            //await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
            await changeConfig(newSelection)
            .then(async resp => {
                setConfigSet(newSelection);
                
                //handleUpdateWagmi();
                //getServerSideProps(newSelection);
                
                //router.refresh();
                //window.location.reload()
                console.log(">>>>>>>>>> ", policy, newSelection, configSetSelection, supportedChains, process.env.CHAIN_SET)
                //await client.refetch();
                
                //await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
                //router.refresh();
                //if (resp.success) router.refresh();
                //window.location.reload();
            });
        }
        
        await updateChainsServerAction();
        //window.location.reload();
        //handleUpdateChains(configSet);
        return true;
    }

    /* useEffect(()=>{
        updateChains();
    },[]) */

    return (
      <Header policy={policy} updateChains={updateChains} configSet={configSet}/>
    )
}
  