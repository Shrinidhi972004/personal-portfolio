import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/portfolio'

const ALL = projects

const filters = ['All','DevOps','Cloud','Security']

export default function Projects(){
  const [filter, setFilter] = useState('All')
  const items = ALL.filter(p=> filter==='All' || p.tags.includes(filter))

  return (
    <section id="projects" className="mt-20">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Projects</h3>
        <div className="flex gap-2">
          {filters.map(f=> (
            <button key={f} onClick={()=> setFilter(f)} className={`px-3 py-1 rounded ${filter===f? 'bg-gradient-to-r from-blue-400 to-purple-500 text-black':'glass text-slate-300'}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(p=> (
          <motion.div key={p.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} className=""> 
            <div className="glass p-5 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-lg font-semibold">{p.title}</div>
              <div className="text-sm text-slate-300 mt-2">{p.description}</div>
              <div className="mt-4 flex gap-2">
                {p.tags.map(t=> <span key={t} className="text-xs px-2 py-1 rounded bg-white/5">{t}</span>)}
              </div>
              <div className="mt-4 flex gap-3">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-sm glass px-3 py-1 rounded hover:bg-white/10 transition-colors">GitHub</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
