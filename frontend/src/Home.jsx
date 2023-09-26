import {Link} from 'react-router-dom';

const Home = (props) => {
    return (
        <div className="flex items-center justify-center h-[100vh]">
            <div className="w-[30%]">
                <h1 className="text-[52px] font-semibold text-center">Shortify.com</h1>
                <div className="flex items-center justify-center space-x-2 mt-[10px]">
                    <Link to={'/shortify'}><button className="bg-[#2a9d8f] rounded-[5px] text-white  py-[8px] font-medium text-center w-[150px] hover:shadow-xl">Shorten URL</button></Link>
                    <Link to={'/get'}><button className="bg-[#2a9d8f] rounded-[5px] text-white py-[8px] font-medium text-center w-[150px] hover:shadow-xl">Get Original URL</button></Link>
                </div>
            </div>
        </div>
    );
}

export default Home;