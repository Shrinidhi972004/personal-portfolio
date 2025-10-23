import React, { useEffect, useState } from 'react'

export default function ScrollProgress(){
  const [progress, setProgress] = useState(0)
  useEffect(()=>{
    const onScroll = ()=>{
      const total = document.documentElement.scrollHeight - window.innerHeight
      const cur = window.scrollY
      setProgress((cur/total)*100 || 0)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])

  return (
    <div className="fixed left-0 top-0 h-1 w-full z-50">
      <div className="h-1 bg-transparent">
        <div className="h-1 rounded-r-full" style={{width: `${progress}%`, background: 'linear-gradient(90deg,#0ea5e9,#7c3aed,#06b6d4)'}} />
      </div>
    </div>
  )
}
