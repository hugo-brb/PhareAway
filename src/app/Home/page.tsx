'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import Menu from '@/components/Menu';
import Coin from '@/components/Coin';
import Event from '@/components/popover/Event';
import Store from '@/components/popover/Store';
import Pictures from '@/components/popover/Pictures';
import Account from '@/components/popover/Account';

const Map = dynamic(() => import('../../../components/Map'), { ssr: false });

export default function Home() {
    const [active, setActive] = useState("home");

    const handleClickActive = (a: string) => {
        setActive(a);
    };

    return (
        <>
            <Menu active={active} handleClickActive={handleClickActive} />
            <Map />
            {active === "calendar" && <Event />}
            {active === "coin" && <Store />}
            {active === "picture" && <Pictures />}
            {active === "account" && <Account active={active} handleClickActive={handleClickActive} />}
            <Coin active={active} handleClickActive={handleClickActive} />
            <Image src="/images/soupex.png" width={75} height={75} alt='Logo Soupex' className=' absolute z-50 bottom-3 right-3' />
        </>
    );
}
