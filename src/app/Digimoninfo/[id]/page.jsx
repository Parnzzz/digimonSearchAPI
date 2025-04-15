"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'


function page() {

    const params = useParams();
    const [digimon, setDigimon] = useState({ content: [] });
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true);
        const fetchDigimoninfo = async () => {
            try {
                const response = await fetch(`https://digi-api.com/api/v1/digimon/${params.id}`);
                const Digimoninfo = await response.json();
                console.log(Digimoninfo);
                setDigimon(Digimoninfo);
            } catch (error) {
                console.log(error);
            }
            setloading(false);
        }
        fetchDigimoninfo();
    }, [params.id]) //reset when params change

    return (
        <div className='p-24 '>
            <Link href="/" className='bg-orange-500 text-white p-3 rounded-md shadow-md'>Back</Link>
            <div className='flex justify-center items-center mt-10 text-center'>
                <div className='shadow-md p-10 rounded-md'>
                    {loading ? (
                        <p>loading...</p>
                    ) : (
                        <>
                            <h1 className='text-3xl font-semibold'>{digimon.name}</h1>
                            <div className='flex justify-center items-center'>
                                <Image src={`https://digi-api.com/images/digimon/w/${digimon.name?.replaceAll(' ', '_')}.png`} width={500} height={500} alt={digimon.name} />
                            </div>


                            <div className='mt-5'>
                                <p className='text-xl'>Level: {digimon.levels?.map(lvl => lvl.level).join(',') || 'N/A'}</p>
                                <p className='text-xl'>Type: {digimon.types?.map(t => t.type).join(', ') || 'N/A'}</p>
                            </div>

                            <p className={` ${digimon.skills?.length < 4 ? 'flex justify-center items-center mt-5 gap-4' : 'grid grid-cols-4 gap-4 mt-5'}`}>  {digimon.skills?.map((s, index) => (  //conditional rendering


                                <span key={index} className='rounded-md text-white bg-gradient-to-r from-orange-300 to-yellow-300 shadow-md text-center p-5'>{s.skill}</span>
                            ))}
                            </p>

                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default page