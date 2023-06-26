"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { colors } from '@mui/material';
import { blue } from '@mui/material/colors';

const Nav = () => {
    const isUserLoggedIn = true;

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
    })

    return (
        <div>
            <nav className="flex-between w-full md-16 pt-3" style={{background:"green", textAlign:"center"}}> 
                <Link href="/" className="flex gap-2 flex-center">
                    <Image src="/assets/images/realby_logo.png" alt="Realby Logo" width={90} height={33} className="object-contain"/>
                </Link>

                {/* Desktop Navigation */}
            


                {/* Mobile Navigation */}
                <div></div> 
            </nav>
            <div className='sm:flex hidden'>
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5" style={{textAlign:"right"}}>
                        {/* 드롭다운(온클릭) 추가해서 마이프로필, 마이블로그들을 링크로 */}
                        <Image src="/assets/images/default_pf_image.png" width={37} height={37} className='' style={{marginRight:"45px"}} alt=''
                        onClick={() => setToggleDropdown((prev) => !prev)}/>

                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link href='' className='dropdown-p1' onClick={() => setToggleDropdown(false)}>
                                계정 관리
                                </Link>
                                <div></div>
                                <Link href='' className='dropdown-p1' onClick={() => setToggleDropdown(false)}>
                                내 블로그
                                </Link>
                                <div></div>
                                <button type='button' onClick={signOut} className='dropdown-p1'>
                                로그아웃
                                </button>
                            </div>
                        )}
                    </div>
                ): (
                    <Link>
                        {providers && 
                        Object.values(providers).map((provider) => (
                        <button type='button' key={provider.name} 
                        onClick={() => signIn(provider.id)} className=''>
                        시작하기
                        </button>
                        ))}
                    </Link>
                )}
            </div>
        </div>

    )
}

export default Nav