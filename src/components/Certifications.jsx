import React from 'react'
import { certifications } from '../data/portfolio'

const certs = certifications

export default function Certifications(){
  return (
    <section id="certifications" className="mt-20">
      <h3 className="text-xl font-bold">Certifications & Awards</h3>
      <div className="mt-6 flex gap-4 overflow-x-auto py-4">
        {certs.map(c=> (
          <div key={c.title} className="min-w-[220px] glass p-4 rounded-xl">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-slate-300">{c.organization} — {c.year}</div>
            {c.credentialId && <div className="text-xs text-slate-400 mt-1">{c.credentialId}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
