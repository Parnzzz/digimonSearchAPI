"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'


function page({ params }) {


    const [digimonname, setDigimonName] = useState({ content: [] });
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true);
        const fetchDigimonName = async () => {
            try {
                const response = await fetch(`https://digi-api.com/api/v1/digimon/${params.digimonname}`);
                const Digimonname = await response.json();
                console.log(Digimonname);
                setDigimonName(Digimonname);
            } catch (error) {
                console.log(error);
            }
            setloading(false);
        }
        fetchDigimonName();
    }, [params.digimonname]) //reset when params change

    return (
        <div className='p-24 '>
            <Link href="/" className='bg-orange-500 text-white p-3 rounded-md shadow-md'>Back</Link>
            <div className='flex justify-center items-center mt-10 text-center'>
                <div className='shadow-md p-10 rounded-md'>
                    {loading ? (
                        <p>loading...</p>
                    ) : (
                        <>
                            <h1 className='text-3xl font-semibold'>{digimonname.name}</h1>
                            <div className='flex justify-center items-center'>
                                <Image src={`https://digi-api.com/images/digimon/w/${digimonname.name?.replaceAll(' ', '_')}.png`} width={500} height={500} alt={digimonname.name} />
                            </div>


                            <div className='mt-5'>
                                <p className='text-xl'>Level: {digimonname.levels?.map(lvl => lvl.level).join(',') || 'N/A'}</p>
                                <p className='text-xl'>Type: {digimonname.types?.map(t => t.type).join(', ') || 'N/A'}</p>
                            </div>

                            <p className= {`${digimonname.skills?.length < 4 ?'mt-3 flex justify-center items-center gap-4': 'mt-3 grid grid-cols-4 gap-4'}`} >  {digimonname.skills?.map((s, index) => (


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