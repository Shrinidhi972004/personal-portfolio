import React from 'react'
import { Cloud, Server, Terminal, Cpu, Database, Activity, BarChart3, Code } from 'lucide-react'

const tools = [
  {name:'AWS', icon:<Cloud/>},
  {name:'Docker', icon:<Server/>},
  {name:'Kubernetes', icon:<Server/>},
  {name:'Terraform', icon:<Cpu/>},
  {name:'Jenkins', icon:<Activity/>},
  {name:'Prometheus', icon:<Database/>},
  {name:'Grafana', icon:<BarChart3/>},
  {name:'Bash', icon:<Terminal/>},
  {name:'Python', icon:<Code/>}
]

export default function Skills(){
  return (
    <section id="skills" className="mt-20">
      <h3 className="text-xl font-bold">Skills</h3>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {tools.map(t=> (
          <div key={t.name} className="glass p-4 rounded-xl flex flex-col items-center gap-2 hover:scale-105 hover:glow transition-transform cursor-pointer">
            <div className="text-2xl text-slate-200">{t.icon}</div>
            <div className="text-sm text-slate-300">{t.name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
