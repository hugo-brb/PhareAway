'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import Menu from '@/components/Menu';
import Coin from '@/components/Coin';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

export default function Home(){
    return <>
    <Menu active="home"/>
    <Map />
    <Coin/>
    </>
}