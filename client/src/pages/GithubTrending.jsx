import { useEffect, useState } from "react";
import request from "../utils/axios";

export default () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await request.get('/github-trending');
                setData(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p className="text-white">Loading...</p>;
    }

    if (error) {
        return <p className="text-white">Error: {error.message}</p>;
    }

    if (data.length === 0) {
        return <p className="text-white">No data available.</p>;
    }
    console.log(data)
    return (
        <>
            <h1 className="text-white text-3xl my-10 ml-20">Github Trending</h1>
            <div className="grid grid-cols-2 gap-5 px-20">
                {data.map((e, i) => {
                    const categories = e.builtBy || [];
                    return (
                        <a
                            href={e.url}
                            target="_blank"
                            key={i}
                            className="text-white bg-[#1D1F25] rounded-xl h-[700px] border border-[#353A44] hover:border-[#545A69] flex flex-col justify-between"
                        >
                            <p className="text-xl font-medium px-5 mt-4">{e.name}</p>
                            <p className="text-xl font-medium px-5 mt-4 text-gray-400">{e.description}</p>
                            <div className="p-2">
                                <div className="flex gap-2">
                                    {categories.map((category, j) => (
                                        <a href={category.href} target="_blank" className="text-[#757D92] ml-1 hover:text-white hover:cursor-pointer" key={j}>#{category.username}</a>
                                    ))}
                                </div>
                                <img
                                    className="w-full h-[480px] rounded-xl"
                                    src={e.avatar}
                                    alt={e.title}
                                />
                            </div>
                        </a>
                    )
                })}
            </div>

            <p className="text-white">hehe</p>
        </>
    );
};
