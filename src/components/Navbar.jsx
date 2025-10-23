import React from 'react'
import { Moon, Sun, Github, Linkedin } from 'lucide-react'

const links = ['Home','About','Skills','Projects','Contact']

export default function Navbar({theme, setTheme}){
  return (
    <nav className="fixed w-full z-40 top-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass flex items-center justify-between px-4 py-2 rounded-2xl shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-black font-bold">SU</div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold">Shrinidhi Upadhyaya</div>
              <div className="text-xs text-slate-300">DevOps & SRE</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {links.map(l=> (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-slate-300 hover:text-white transition">
                {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="https://github.com/" className="p-2 glass rounded-md"><Github className="w-4 h-4"/></a>
            <a href="https://linkedin.com/" className="p-2 glass rounded-md"><Linkedin className="w-4 h-4"/></a>
          </div>
        </div>
      </div>
    </nav>
  )
}
