import React from 'react'
import { motion } from 'framer-motion'

const counters = [
  {label: 'Pipelines Built', value: 15},
  {label: 'Deployments Automated', value: 12},
  {label: 'Systems Monitored', value: 8}
]

export default function About(){
  return (
    <section id="about" className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="flex justify-center md:justify-start">
        <div className="w-64 h-64 rounded-full overflow-hidden relative glass glow-border">
          <img src="/profile.png" alt="Shrinidhi" className="w-full h-full object-cover" />
          <div className="absolute -bottom-4 right-4 bg-gradient-to-br from-blue-400 to-purple-500 text-black text-xs font-bold px-3 py-1 rounded-full">Open to Work</div>
        </div>
      </div>

      <div>
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} className="text-2xl font-bold">About Me</motion.h2>
        
        <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} transition={{delay:0.1}} className="mt-4 space-y-4 text-slate-300">
          <p>
            I'm an <span className="text-white font-semibold">aspiring DevOps Engineer</span> and <span className="text-white font-semibold">Site Reliability Engineer (SRE)</span> passionate about building and maintaining scalable, reliable cloud infrastructure. My journey focuses on bridging the gap between development and operations through automation, monitoring, and best practices.
          </p>
          
          <p>
            With expertise in <span className="text-blue-400">AWS cloud platform</span>, <span className="text-purple-400">containerization</span> (Docker, Kubernetes), and <span className="text-cyan-400">Infrastructure as Code</span> (Terraform, Ansible), I specialize in creating robust CI/CD pipelines and implementing comprehensive observability solutions.
          </p>
          
          <p>
            My focus areas include <span className="text-white">automated deployments</span>, <span className="text-white">incident response</span>, <span className="text-white">performance monitoring</span>, and building systems that can scale efficiently while maintaining high availability and reliability standards.
          </p>
        </motion.div>

        <div className="mt-6 flex gap-4">
          <a href="/devops_resume.pdf" download="Shrinidhi_Upadhyaya_Resume.pdf" className="px-4 py-2 rounded-lg text-white font-medium hover:scale-105 transition-transform" style={{background: 'linear-gradient(90deg,#0ea5e9,#7c3aed)'}}>
            Download Resume
          </a>
        </div>

        <div className="mt-6 flex gap-6">
          {counters.map(c=> (
            <div key={c.label} className="text-center">
              <div className="text-2xl font-bold">{c.value}+</div>
              <div className="text-xs text-slate-400">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
