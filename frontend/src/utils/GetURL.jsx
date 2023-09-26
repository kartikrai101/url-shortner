import {useState, useRef, useEffect} from 'react';
import axios from 'axios';

const NormalClass = "border-[1px] rounded-[5px] w-[330px] px-[10px] h-[40px] mt-[13px] border-black";
const ErrorClass = "border-[1px] rounded-[5px] w-[330px] px-[10px] h-[40px] mt-[13px] border-red";

const GetURL = (props) => {
    const urlRef = useRef('');

    const [urlError, setUrlError] = useState(false);
    const [ogUrl, setOgUrl] = useState("");
    const [urlCopied, setUrlCopied] = useState(false);

    const handleOriginalUrl = async () => {
        const shortUrl = urlRef.current.value;

        await axios.get(shortUrl)
        .then((response) => {
            setOgUrl(response.data.ogUrl);
            //console.log(response.data.ogUrl);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const copyUrlHandler = () => {
        setUrlCopied(true);
        navigator.clipboard.writeText(ogUrl);
    }

    return (
        <>
        {
            ogUrl === "" ? (
                <div className='flex flex-col items-center justify-center h-[100vh]'>
                    <p className='text-[22px]'>Enter the short URL provided by Shortify</p>
                    <input ref={urlRef} type="text" className={urlError===true ? ErrorClass : NormalClass} />
                    <button onClick={() => handleOriginalUrl()} className='bg-[#2a9d8f] rounded-[5px] text-white  py-[8px] font-medium text-center w-[170px] hover:shadow-xl mt-[13px]'>Go to original URL</button>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center h-[100vh]'>
                    <p className='text-[22px]'>Here's the original URL you are looking for!</p>
                    <div className='flex items-center justify-center mt-[10px] border-[1px] border-white rounded-[5px] px-[20px] py-[7px] bg-[#1a759f] '>
                        <p className='text-white font-semibold'>{ogUrl}</p>
                        <img onClick={() => copyUrlHandler()} src="/CopyIcon3.png" alt="icon" className='w-[25px] ml-[10px] hover:shadow-xl cursor-pointer hover:scale-[1.2]' />
                    </div>
                    {
                            urlCopied ? (
                                <div className='flex items-center justify-center space-x-1 mt-[7px]'>
                                    <img src="/TickImage4.png" alt="tick" className='w-[20px]' />
                                    <p>URL Copied!</p>
                                </div>
                            ) : null
                    }
                </div>
            )
        }
        </>
    );
}

export default GetURL;