"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'



function DigimonData() {


    const [digimon, setDigimon] = useState({ content: [] })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchDigimonData = async () => {
            try {

                const response = await fetch("https://digi-api.com/api/v1/digimon?page=0&pageSize=291");
                const DigimonData = await response.json();
                console.log(DigimonData)
                setDigimon(DigimonData)


            } catch (error) {
                console.log("ERROR IS", error)
            }
            setLoading(false)
        }
        fetchDigimonData();
    }, [])



    return (
        <div className=' text-center mx-auto '>
            {loading ? (
                <p>Loading....</p>
            ) : (
                <div className='grid lg:grid-cols-5 gap-5 sm:grid-cols-1 md:grid-cols-3'>
                    {digimon.content.map((val, index) =>
                        <Link key={val.name} href={`/Digimoninfo/[id]`} as={`/Digimoninfo/${index + 1}`}>
                            <div key={index} className='flex justify-center items-center shadowmd transition cursor-pointer rounded-md overflow-hidden'>
                                <div>
                                    <h3>{val.name}</h3>
                                    <div className='w-[300px] h-[300px]'>
                                        <Image src={val.image} width={300} height={300} alt={val.name} className='object-contain w-full h-full' />
                                    </div>
                                </div>
                            </div>
                        </Link>

                    )}



                </div>
            )}

        </div>
    )
}

export default DigimonData
