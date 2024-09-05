'use client'

import { legacyChain as legacyChainMain, supportedChains as supportedChainsMain } from "config/chains.mainnets";
import { legacyChain as legacyChainTest, supportedChains as supportedChainsTest } from "config/chains.testnets";

export default function mainConfig() {
    enum ChainSet {
        MAINNETS,
        TESTNETS
    }
      
    const configSets = {
        'main':    {chainSet: ChainSet.MAINNETS, chainSetId: 'main', id: '1'},
        'testOld': {chainSet: ChainSet.TESTNETS, chainSetId: 'testOld', id: '2'},
        'testNew': {chainSet: ChainSet.TESTNETS, chainSetId: 'testNew', id: '3'},
        'mainOld': {chainSet: ChainSet.MAINNETS, chainSetId: 'mainOld', id: '4'},
    };
    
    type TypeGlobalConfig = {
        configSetSelection: typeof configSets.main | typeof configSets.testOld, 
        supportedChains: typeof supportedChainsMain | typeof supportedChainsTest, 
        defaultChain: typeof supportedChainsMain[0] | typeof supportedChainsTest[0],
        legacyChain: typeof legacyChainMain | typeof legacyChainTest
    };

    const defaultConfig: TypeGlobalConfig = {
        configSetSelection: configSets.main, 
        supportedChains: supportedChainsMain, 
        defaultChain: supportedChainsMain[0],
        legacyChain: legacyChainMain
    };

    const alternativeConfig: TypeGlobalConfig = {
        configSetSelection: configSets.testOld, 
        supportedChains: supportedChainsTest, 
        defaultChain: supportedChainsTest[0],
        legacyChain: legacyChainTest
    };

    //const [configGlobal, setConfigGlobal] = useState(defaultConfig);

    const getInitConfig = () => {
        const fromWindow = window.localStorage.getItem('chainSet');
        if (fromWindow) {
            switch (fromWindow) {
                case 'main':
                    return defaultConfig;
            }
            return alternativeConfig;
        }
        return defaultConfig;
    }
    var configGlobal = getInitConfig();

    //var configGlobal = defaultConfig;
    const setConfigGlobal = (config: any) => {
        configGlobal = config;
    }

    const setTestnet = () => {
        setConfigGlobal(alternativeConfig);
    };

    const setMainnet = () => {
        setConfigGlobal(defaultConfig);
    }

    return (
        {
            configGlobal: configGlobal,
            setTestnet: setTestnet,
            setMainnet: setMainnet
        }
    )
}