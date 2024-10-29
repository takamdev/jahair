import  {useEffect, useRef, useState } from "react";

export function FeaturedImageGallery() {
  const data = [
    {
      imgelink:
        "/img/coup1.webp",
    },
    {
      imgelink:
        "/img/coup2.webp",
    },
    {
      imgelink:
        "/img/coup3.webp",
    }
  ];

  const [active,setActive]=useState<string>(data[0].imgelink) 
 

 
  return (
    <div className="grid gap-4">
      <div>
        <img
          className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
          src={active}
          alt=""
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {data.map(({ imgelink }, index) => (
          <div key={index} className="relative">
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className={`h-20 w-full ${imgelink===active && "grayscale"} cursor-pointer rounded-lg object-cover`}
              alt="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}




export function FeaturedVideoGallery() {
  const data = [
    {
      videolink:
        "/video/v1_service.mp4",
    },
    {
      videolink:
        "/video/v2_service.mp4",
    },
    {
      videolink:
       "/video/v3_service.mp4"
    }
  ];
  
  const [active,setActive]=useState<string>(data[0].videolink) 
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [matchMedia,setMatchMedia] = useState<boolean>(window.innerWidth>1000)
  useEffect(()=>{
    if(videoRef.current!==null){
      videoRef.current.playbackRate=2



    }
    const mediaQuery = window.matchMedia('(min-width: 1000px)');
    mediaQuery.addListener((e)=>{
      setMatchMedia(e.matches)
      
    })
  },[])

  const setStatusPlay = (pause:boolean)=>{
    if(matchMedia as boolean) if(videoRef.current!==null){
      if (pause)  videoRef.current.pause()
       else videoRef.current.play()
 
     }
    
  }

  return (
    <div className="grid gap-4">
      <div>
        <video
          ref={videoRef}
          className="w-full h-[400px] max-w-full rounded-lg object-cover object-center md:h-[480px]"
          src={active}
          autoPlay
          muted
          loop
          onMouseEnter={()=>{setStatusPlay(true)}}
          onMouseOut={()=>{setStatusPlay(false)}}
          
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {data.map(({ videolink }, index) => (
          <div key={index} className="relative">
            <video
              onClick={() => setActive(videolink)}
              src={videolink}
              className={`h-20 w-full ${videolink===active && "grayscale"} cursor-pointer rounded-lg object-cover`}
              muted
              loop
              autoPlay
            />
          </div>
        ))}
      </div>
    </div>
  );
}