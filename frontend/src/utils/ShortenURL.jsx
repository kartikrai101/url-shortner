import {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import Confetti from 'react-confetti'

const NormalClass = "border-[1px] rounded-[5px] w-[330px] px-[10px] h-[40px] mt-[13px] border-black";
const ErrorClass = "border-[1px] rounded-[5px] w-[330px] px-[10px] h-[40px] mt-[13px] border-red";

const ShortenURL = (props) => {

    const urlRef = useRef('');
    const [shortUrl, setShortUrl] = useState("");
    const [urlError, setUrlError] = useState(false);
    const [urlCopied, setUrlCopied] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setUrlCopied(false)
        }, 3000)
    }, [urlCopied])

    const handleSubmission = () => {
        const ogUrl = urlRef.current.value;

        if(ogUrl !== ""){
            setUrlError(false);

            const body={
                url: ogUrl
            }
            
            axios.post('http://localhost:8000/shortify/postUrl', body)
            .then((response) => {
                setShortUrl(response.data.shortUrl);
            })
            .catch((error) => {
                console.log(error)
            })
        }else{
            setUrlError(true);
        }
    }

    const copyUrlHandler = () => {
        setUrlCopied(true);
        navigator.clipboard.writeText(shortUrl);
    }

    return (
        <div className="flex flex-col items-center justify-center h-[100vh]">
            {
                shortUrl === "" ? (
                    <>
                        <p className="text-[22px]">Enter the URL you want to shorten!</p>
                        <input ref={urlRef} type="text" className={urlError===true ? ErrorClass : NormalClass} />
                        <button onClick={() => handleSubmission()} className="bg-[#2a9d8f] rounded-[5px] text-white  py-[8px] font-medium text-center w-[150px] hover:shadow-xl mt-[13px]">Get short URL</button>
                    </>
                ) : (
                    <>
                        <p className='text-[22px]'>Here's your shortened URL!</p>
                        <div className='flex items-center justify-center mt-[10px] border-[1px] border-white rounded-[5px] px-[20px] py-[7px] bg-[#1a759f] '>
                            <p className='text-white font-semibold'>{shortUrl}</p>
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
                    </>
                )
            }
        </div>
    );
}

export default ShortenURL;