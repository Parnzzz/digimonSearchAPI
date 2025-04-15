"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


function Header() {

  const router = useRouter()
  const [digimonname, setDigimonname] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const value = (e.target.value);
    setDigimonname(value)

    if (value.trim().length >= 0) {
      fetchSuggestion(value);
    } else {
      setSuggestion([]);
    }
  }
  const fetchSuggestion = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`https://digi-api.com/api/v1/digimon?page=0&pageSize=291`);
      const data = await response.json();
      const filteredData = data.content.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
      setSuggestion(filteredData.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const InputText = digimonname.trim();

    if (InputText.length < 2) {
      alert("No digimon found");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://digi-api.com/api/v1/digimon?page=0&pageSize=291`);
      const data = await response.json();


      const normalize = (str) => str.toLowerCase().replace(/[\s\-_:]/g, '');
      const matched = data.content.find(d =>
        normalize(d.name) === normalize(InputText)
      );

      if (matched) {
        router.push(`/Digimonsearch/${encodeURIComponent(matched.name)}`);
        setSuggestion([]);
        setDigimonname("");
      } else {
        alert("No digimon found");
      }
    } catch (error) {
      console.log(error);

    }
    setLoading(false);
  };





  return (
    <div className='bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500 h-[300px] flex justify-center items-center'>
      <div className='text-center'>
        <h1 className='text-white text-5xl'>Welcome</h1>
        <p className='text-white text-5xl'>Digimon Finding</p>
        <form onSubmit={handleForm} className='flex mt-4'>
          <input type="text" className='w-full rounded-md border-gray-300 px-3 py-2 text-gray shadow-md' placeholder='Search..' onChange={handleInput} value={digimonname} />
          <button className='inline-flex items-center mx-2 px-3 py-2 round-md bg-green-500 text-white shadow-md' type="submit">Search</button>
        </form>

        {digimonname && suggestion.length > 0 && (
          <div className="absolute    mt-2">
            <ul className="bg-white shadow-md rounded-md max-h-60 overflow-hidden">
              {loading ? (
                <></>
              ) : (
                suggestion.map((item) => (
                  <li key={item.id} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => { setDigimonname(item.name); router.push(`/Digimonsearch/${item.name}`); setSuggestion([]); setDigimonname(""); }}>
                    {item.name}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}


      </div>
    </div>
  )
}

export default Header