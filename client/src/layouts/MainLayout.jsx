import { Link, Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

export default () => {
    return (
        <>
            <Navbar />
            <div className="flex h-[94vh]">
                <div className="w-1/6 bg-[#0F1218] border border-[#2D323C] text-[#A8B3CF] p-5 text-sm">
                    <Link to='/' className="hover:text-white hover:bg-[#2D323C]">My Feed</Link>
                    <br />
                    <br />
                    <p>Discover</p>
                    <div className="w-full hover:bg-[#2D323C]">
                        <Link to='/' className="hover:text-white ">- Explore</Link>
                    </div>
                    <br />
                    <Link to='/tags' className="hover:text-white hover:bg-[#2D323C]">- Tags</Link>
                    <p className="hover:text-white hover:bg-[#2D323C]">- Source</p>
                    <p className="hover:text-white hover:bg-[#2D323C]">- Github Trending</p>
                    <br />
                    <p>Ai</p>
                    <p className="hover:text-white hover:bg-[#2D323C]">- Chat</p>
                    <p className="hover:text-white hover:bg-[#2D323C]">- Code Solver</p>
                    <p className="hover:text-white hover:bg-[#2D323C]">- Guides</p>
                    <p className="hover:text-white hover:bg-[#2D323C]">- Code Language Convert</p>
                    <div>

                        <Link to='/component-generator' className="hover:text-white hover:bg-[#2D323C]">- Component Generator</Link>
                    </div>
                    <br />
                    <p>Activity</p>
                    <p className="hover:text-white hover:bg-[#2D323C]">- Bookmarks</p>
                    <p className="hover:text-white hover:bg-[#2D323C]">- History</p>

                </div>
                <div className="w-5/6 overflow-y-scroll bg-[#0E1217]">
                    <Outlet />
                </div>
            </div>
        </>
    )
}