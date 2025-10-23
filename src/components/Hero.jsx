import React from 'react'
import { motion } from 'framer-motion'

function CanvasBG(){
  return (
    <div className="absolute inset-0 -z-10 opacity-30">
  <canvas id="hero-canvas" className="w-full h-full" />
    </div>
  )
}

export default function Hero(){
  return (
    <section id="home" className="relative min-h-[70vh] flex items-center py-24">
      <CanvasBG />
      <div className="max-w-3xl">
        <motion.h1 initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.8}} className="text-4xl sm:text-6xl font-extrabold leading-tight">
          <span className="accent-gradient">DevOps</span> | <span className="text-slate-200">SRE</span> | <span className="text-slate-200">Cloud Engineer</span>
        </motion.h1>
        <motion.p initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.2}} className="mt-6 text-slate-300 max-w-xl">
          Automating, Observing, and Scaling Systems with Reliability in Mind.
        </motion.p>

        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{delay:0.4}} className="mt-8">
          <a href="#projects" className="inline-block px-6 py-3 rounded-xl glow-border" style={{background: 'linear-gradient(90deg, rgba(14,165,233,0.08), rgba(124,58,237,0.06))'}}>
            <span className="bg-clip-text text-transparent" style={{background: 'linear-gradient(90deg,#0ea5e9,#7c3aed,#06b6d4)'}}>View Projects</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// small particle script (runs on client)
if (typeof window !== 'undefined'){
  setTimeout(()=>{
    const canvas = document.getElementById('hero-canvas')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    function resize(){
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const particles = Array.from({length:40}).map(()=>({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      vx: (Math.random()-0.5)*0.4,
      vy: (Math.random()-0.5)*0.4,
      r: Math.random()*2+0.6
    }))

    function tick(){
      ctx.clearRect(0,0,canvas.width,canvas.height)
      particles.forEach(p=>{
        p.x += p.vx
        p.y += p.vy
        if (p.x<0) p.x = canvas.width
        if (p.x>canvas.width) p.x = 0
        if (p.y<0) p.y = canvas.height
        if (p.y>canvas.height) p.y = 0
        ctx.beginPath()
        ctx.fillStyle = 'rgba(124,58,237,0.45)'
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fill()
      })
      requestAnimationFrame(tick)
    }
    tick()
  }, 500)
}
