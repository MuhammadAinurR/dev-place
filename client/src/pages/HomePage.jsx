import { useEffect, useState } from "react"
import request from "../utils/axios";
import { formatRelativeTime } from "../utils/relativeTime";
import { useLocation } from "react-router-dom";

export default () => {
    const { search } = useLocation();
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log('hello')
        const fetchData = async () => {
            try {
                let endpoint = `/posts`;
                if (search) endpoint += `?search=${search.split('=')[1]}`;
                console.log(endpoint)
                const { data } = await request.get(endpoint);
                setData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [search])
    console.log(data)
    return (
        <div className={`bg-[#0E1217] ${data.length ? '' : 'h-screen'}`}>
            <div className="grid grid-cols-3 justify-center items-center gap-8 p-20">
                {data.map((e, i) => {
                    const categories = e.Categories || [];
                    return (
                        <div
                            key={i}
                            className="text-white bg-[#1D1F25] rounded-xl h-[350px] border border-[#353A44] hover:border-[#545A69] flex flex-col justify-between"
                        >
                            <p className="text-xl font-medium px-5 mt-4">{e.title}</p>
                            <div className="p-2">
                                <p>{formatRelativeTime(e.createdDate)}</p>
                                <div className="flex gap-2">
                                    {categories.map((category, j) => (
                                        <p className="text-[#757D92] ml-1" key={j}>#{category.name}</p>
                                    ))}
                                </div>
                                <img
                                    className="w-full h-[180px] rounded-xl"
                                    src={e.imgUrl}
                                    alt={e.title}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

}