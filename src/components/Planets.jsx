import React, { useState } from 'react'
import NavigationBar from './Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import Card from './Cards';
import ClimbingBoxLoader from "react-spinners/BeatLoader";
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";

const override = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "90vh",
    overflow: "hidden",
};

export default function Planets() {
    const [apiData, setApiData] = useState()
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        fetchPlanetDetails()
    }, [])
    const nextPage = () => {
        setLoading(true)
        fetchPlanetDetails(apiData.next)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const prevPage = () => {
        setLoading(true)
        fetchPlanetDetails(apiData.previous)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const fetchPlanetDetails = async (url) => {
        let apiUrl = url ? url : "https://swapi.dev/api/planets/?page=1&format=json"
        let res = await axios.get(apiUrl);
        setApiData(res.data)
        setLoading(false)
        console.log("response", res.data)
    }
    return (
        <div className="bg-black min-h-screen">
            <NavigationBar />
            <div
                className="bg-black flex h-screen relative z-10"
            >
                <div className="bg-black z-10 w-full absolute py-4 px-6 flex flex-col items-center overflow-y-auto">
                    <div
                        className="bg-transparent text-white text-3xl font-semibold text-center font-Montserrat custom-css-hero-h1"
                    >
                        Unveiling the Wonders: A Guide to Star Wars{" "}
                        <span
                            className=" bg-gradient-to-r bg-clip-text  text-transparent
    from-cyan-500 via-purple-500 to-indigo-500
    animate-text"
                        >
                            Planets
                        </span>
                    </div>
                    {loading ? (
                        <>
                            <div className="loader bg-black">
                                <ClimbingBoxLoader
                                    size={15}
                                    color={"#87CEEB"}
                                    loading={loading}
                                    cssOverride={override}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="pt-5 pb-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-4 w-full h-full bg-transparent">
                                {apiData && apiData?.results.map((result) => {
                                    return (
                                        <div className='pt-4'>
                                            <Card data={result} />
                                        </div>
                                    )
                                })}

                            </div>
                            <div className='flex items-center justify-center gap-2'>
                                <button onClick={() => prevPage()} disabled={apiData.previous === null} type="button" className={`cursor-pointer mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 inline-flex items-center gap-2 ${apiData.previous === null ? "opacity-[0.5]" : ''}`}>
                                    <FaArrowLeft /><span>Prev</span>
                                </button>
                                <button onClick={() => nextPage()} disabled={apiData.next === null} type="button" className={`mt-4 cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 inline-flex items-center gap-2 ${apiData.next === null ? 'opacity-[0.5]' : ''}`}>
                                    <span>Next</span><FaArrowRight />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
