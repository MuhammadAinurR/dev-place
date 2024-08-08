import { useEffect, useState } from "react"
import request from "../utils/axios";
import { formatRelativeTime } from "../utils/relativeTime";
import { Link, useLocation } from "react-router-dom";
import showToast from "../utils/toast";

export default () => {
    const { search, category } = useLocation();
    const [data, setData] = useState([]);
    const [isMyPage, setIsMyPage] = useState(false);

    useEffect(() => {
        console.log({ category, search })
        console.log('hello')
        const fetchData = async () => {
            try {
                let endpoint = '/posts';
                if (search) {
                    const searchParams = new URLSearchParams(search);
                    if (searchParams.has('category')) {
                        endpoint += `?category=${searchParams.get('category')}`;
                    } else if (searchParams.has('search')) {
                        endpoint += `?search=${searchParams.get('search')}`;
                    } else if (searchParams.has('myPosts')) {
                        endpoint += `?myPosts=true;`
                        setIsMyPage(true)
                    }
                }

                console.log(endpoint);
                const { data } = await request.get(endpoint, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData()
    }, [search, category])


    const handleDelete = async (id) => {
        try {
            const response = await request.delete(`/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setData(prevData => prevData.filter(article => article.id !== id));
            console.log(response)
            showToast({ message: response.data.message, type: 'success' })
        } catch (error) {
            console.log('Error deleting article:', error);
        }
    };

    return (
        <div className={`bg-[#0E1217] ${data.length ? '' : 'h-screen'}`}>
            <div className="grid grid-cols-4 justify-center items-center gap-6 p-20 mx-10">
                {data.map((e, i) => {
                    const categories = e.Categories || [];
                    return (
                        <div
                            key={i}
                            className="text-white bg-[#1D1F25] rounded-xl h-[400px] border border-[#353A44] hover:border-[#545A69] flex flex-col justify-between"
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
                                <div className="grid grid-cols-2 mt-1 text-[#545A69]">
                                    <Link to={`/posts/${e.id}/edit`} className="border-r-2 border-gray-700 hover:text-white text-center" >
                                        Edit
                                    </Link>
                                    <Link onClick={() => handleDelete(e.id)} className="hover:text-white text-center">
                                        Delete
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

}