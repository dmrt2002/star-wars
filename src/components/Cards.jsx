import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCloudRain } from "react-icons/fa";
import { MdTerrain } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";
import ClimbingBoxLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { CiLineHeight } from "react-icons/ci";
import { BsGenderFemale } from "react-icons/bs";
import { MdOutlineTitle } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdCameraRoll } from "react-icons/md";
import { FaWeight } from "react-icons/fa";

const override = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "90%",
    overflow: "hidden",
};

const Card = ({ data }) => {
    useEffect(() => {
    }, [])
    const [tab, setTab] = useState(1)
    let [residents, setResidents] = useState([]);
    let [films, setFilms] = useState([]);
    let [currentResident, setCurrentResident] = useState(0)
    let [currentFilm, setCurrentFilm] = useState(0)
    let [residentLoading, setResidentLoading] = useState()
    let [filmsLoading, setFilmsLoading] = useState()
    useEffect(() => {
        console.log("tab useeffect", tab, residents.length)
        if (tab === 2) {
            if(residents.length === 0) {
                let arr = []
                console.log("data.residents", data.residents)
                data.residents.map(async (resident) => {
                    let res = await axios.get(resident);
                    console.log("response resident", res)
                    arr.push(res.data)
                })
                setResidents(arr)
            }
            setTimeout(() => {
                setResidentLoading(false)
            }, 1000)
        }
        if (tab === 3) {
            if(films.length === 0) {
                let arr = []
                console.log("data.films", data.films)
                data.films.map(async (film) => {
                    let res = await axios.get(film);
                    console.log("response films", res)
                    arr.push(res.data)
                })
                setFilms(arr)
            }
            setTimeout(() => {
                setFilmsLoading(false)
            }, 1000)
        }
    }, [tab])
    return (
        <div className="">
            <div className="py-5 px-6 flex flex-col text-white md:px-6 h-[360px] bg-[hsla(0,11%,65%,.137)] shadow-md backdrop-filter rounded-lg">
                <h1 className="font-bold text-2xl mb-2 bg-gradient-to-r bg-clip-text  text-transparent from-cyan-500 via-purple-500 to-indigo-500 animate-text">{data.name}</h1>
                <ul class="flex flex-wrap mt-2 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="me-2" onClick={() => setTab(1)}>
                        <div className={`inline-block p-2 cursor-pointer ${tab === 1 ? 'text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500' : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'}`}>Charecteristics</div>
                    </li>
                    <li className="me-2" onClick={() => {
                        setResidentLoading(true)
                        setTab(2)
                    }
                    }>
                        <div className={`inline-block p-2 cursor-pointer ${tab === 2 ? 'text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500' : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'}`}>Residents</div>
                    </li>
                    <li className="me-2" onClick={() => {
                        setFilmsLoading(true)
                        setTab(3)
                    }
                    }>
                        <div className={`inline-block p-2 cursor-pointer ${tab === 3 ? 'text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500' : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'}`}>Films</div>
                    </li>
                </ul>
                {tab === 1 && (
                    <div className="relative max-h-64 mt-4 overflow-scroll">
                        <div className="flex flex-col justify-center card-container overflow-y-scroll">
                            <div className="flex justify-around items-center mt-2 w-full pb-3 relative cursor-pointer">

                                <h2 className="w-1/3 font-thin text-sm inline-flex items-center gap-2"><FaCloudRain /><span>Climate</span></h2>
                                <h2 className="w-2/3 flex items-center justify-between">
                                    <span>
                                        {data.climate}
                                    </span>
                                </h2>
                            </div>
                            <hr className="border-[hsla(0,11%,65%,.230)]"></hr>
                            <div className="flex justify-around items-center mt-2 w-full pb-3 relative cursor-pointer">
                                <h2 className="w-1/3 font-thin text-sm inline-flex items-center gap-2"><MdTerrain /><span>Terrain</span></h2>
                                <h2 className="w-2/3 flex items-center justify-between">
                                    <span>
                                        {data.terrain}
                                    </span>
                                </h2>
                            </div>
                            <hr className="border-[hsla(0,11%,65%,.230)]"></hr>
                            <div className="flex justify-between items-center mt-2 w-full pb-3 relative cursor-pointer">
                                <h2 className="w-1/3 font-thin text-sm inline-flex items-center gap-2"><FaMinusCircle /><span>diameter</span></h2>
                                <h2 className="w-2/3">{data.diameter}</h2>
                            </div>
                            <hr className="border-[hsla(0,11%,65%,.230)]"></hr>
                            <div className="flex justify-between items-center mt-2 w-full pb-3 relative cursor-pointer">
                                <h2 className="w-1/3 font-thin text-sm inline-flex items-center gap-2"><FaMinusCircle /><span>population</span></h2>
                                <h2 className="w-2/3">{data.population}</h2>
                            </div>
                        </div>
                    </div>
                )}
                {tab === 2 && (
                    <>
                        {residentLoading ? (
                            <>
                                <div className="loader h-full bg-transparent">
                                    <ClimbingBoxLoader
                                        size={15}
                                        color={"#87CEEB"}
                                        loading={residentLoading}
                                        cssOverride={override}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                            {residents.length > 0 ? (
                            <div className="flex flex-col justify-between h-full">
                            <div className="relative max-h-64 mt-4 overflow-scroll">
                                    <div className="flex flex-col justify-center card-container overflow-y-scroll">
                                        <div className="flex justify-around items-center mt-2 w-full pb-3 relative cursor-pointer">

                                            <h2 className="w-1/3 font-thin text-sm inline-flex items-center gap-2"><MdDriveFileRenameOutline /><span>Name</span></h2>
                                            <h2 className="w-2/3 flex items-center justify-between">
                                                <span>
                                                    {residents[currentResident]?.name}
                                                </span>
                                            </h2>
                                        </div>
                                        <hr className="border-[hsla(0,11%,65%,.230)]"></hr>
                                        <div className="flex justify-around items-center mt-2 w-full pb-3 relative cursor-pointer">
                                            <h2 className="w-1/3 font-thin text-sm inline-flex items-center gap-2"><CiLineHeight /><span>Height</span></h2>
                                            <h2 className="w-2/3 flex items-center justify-between">
                                                <span>
                                                {residents[currentResident]?.height}
                                                </span>
                                            </h2>
                                        </div>
                                        <hr className="border-[hsla(0,11%,65%,.230)]"></hr>
                                        <div className="flex justify-between items-center mt-2 w-full pb-3 relative cursor-pointer">
                                            <h2 className="w-1/3 font-thin text-sm inline-flex items-center gap-2"><BsGenderFemale /><span>Gender</span></h2>
                                            <h2 className="w-2/3">{residents[currentResident]?.gender}</h2>
                                        </div>
                                        <hr className="border-[hsla(0,11%,65%,.230)]"></hr>
                                        <div className="flex justify-between items-center mt-2 w-full pb-3 relative cursor-pointer">
                                            <h2 className="w-1/3 font-thin text-sm inline-flex items-center gap-2"><FaWeight /><span>Mass</span></h2>
                                            <h2 className="w-2/3">{residents[currentResident]?.mass}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                <button onClick={() => setCurrentResident(currentResident - 1)} disabled={currentResident === 0} type="button" className={`cursor-pointer mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 inline-flex items-center gap-2 ${currentResident === 0 ? "opacity-[0.5]" : ''}`}>
                                    <FaArrowLeft /><span>Prev</span>
                                </button>
                                <button onClick={() => setCurrentResident(currentResident + 1)} disabled={residents.length - 1 === currentResident} type="button" className={`mt-4 cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 inline-flex items-center gap-2 ${residents.length - 1 === currentResident ? 'opacity-[0.5]' : ''}`}>
                                    <span>Next</span><FaArrowRight />
                                </button>
                            </div>
                            </div>
                            ) : (
                                <div className="flex flex-col h-full justify-center items-center">
                                    <div className="text-sm font-extralight opacity-60">
                                        No Residents found
                                    </div>
                                </div>
                            )}
                            </>
                        )}
                    </>
                )}
                {tab === 3 && (
                    <>
                        {filmsLoading ? (
                            <>
                                <div className="loader h-full bg-transparent">
                                    <ClimbingBoxLoader
                                        size={15}
                                        color={"#87CEEB"}
                                        loading={filmsLoading}
                                        cssOverride={override}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                            {films.length > 0 ? (
                            <div className="flex flex-col justify-between h-full">
                            <div className="relative max-h-64 mt-4 overflow-scroll">
                                    <div className="flex flex-col justify-center card-container overflow-y-scroll">
                                        <div className="flex justify-around items-center mt-2 w-full pb-3 relative cursor-pointer">

                                            <h2 className="w-1/3 font-thin text-sm inline-flex items-center gap-2"><MdOutlineTitle /><span>Title</span></h2>
                                            <h2 className="w-2/3 flex items-center justify-between">
                                                <span>
                                                    {films[currentFilm]?.title}
                                                </span>
                                            </h2>
                                        </div>
                                        <hr className="border-[hsla(0,11%,65%,.230)]"></hr>
                                        <div className="flex justify-around items-center mt-2 w-full pb-3 relative cursor-pointer">
                                            <h2 className="w-1/3 font-thin text-sm inline-flex items-center gap-2"><MdAttachMoney /><span>Producer</span></h2>
                                            <h2 className="w-2/3 flex items-center justify-between">
                                                <span>
                                                {films[currentFilm]?.producer}
                                                </span>
                                            </h2>
                                        </div>
                                        <hr className="border-[hsla(0,11%,65%,.230)]"></hr>
                                        <div className="flex justify-between items-center mt-2 w-full pb-3 relative cursor-pointer">
                                            <h2 className="w-1/3 font-thin text-sm inline-flex items-center gap-2"><MdCameraRoll /><span>Director</span></h2>
                                            <h2 className="w-2/3">{films[currentFilm]?.director}</h2>
                                        </div>
                                        <hr className="border-[hsla(0,11%,65%,.230)]"></hr>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                <button onClick={() => setCurrentFilm(currentFilm - 1)} disabled={currentFilm === 0} type="button" className={`cursor-pointer mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 inline-flex items-center gap-2 ${currentFilm === 0 ? "opacity-[0.5]" : ''}`}>
                                    <FaArrowLeft /><span>Prev</span>
                                </button>
                                <button onClick={() => setCurrentFilm(currentFilm + 1)} disabled={films.length - 1 === currentFilm} type="button" className={`mt-4 cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 inline-flex items-center gap-2 ${films.length - 1 === currentFilm ? 'opacity-[0.5]' : ''}`}>
                                    <span>Next</span><FaArrowRight />
                                </button>
                            </div>
                            </div>
                            ) : (
                                <div className="flex flex-col h-full justify-center items-center">
                                    <div className="text-sm font-extralight opacity-60">
                                        No films found
                                    </div>
                                </div>
                            )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
export default Card;
