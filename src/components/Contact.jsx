import React from 'react'
import { Mail, Github, Linkedin, Phone } from 'lucide-react'

export default function Contact(){
  return (
    <section id="contact" className="mt-20">
      <h3 className="text-xl font-bold text-center mb-8">Get In Touch</h3>
      
      <div className="max-w-2xl mx-auto">
        <div className="glass p-8 rounded-2xl text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 p-3 glass rounded-lg">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+91 7204200386</span>
              </div>
              
              <a href="mailto:shrinidhiupadhyaya00@gmail.com" 
                 className="flex items-center justify-center gap-3 p-3 glass rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>shrinidhiupadhyaya00@gmail.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <a href="https://github.com/Shrinidhi972004" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center justify-center gap-3 p-3 glass rounded-lg hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              
              <a href="https://www.linkedin.com/in/shrinidhi-upadhyaya-82114a26a/" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-center gap-3 p-3 glass rounded-lg hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
            
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-slate-300 text-sm">Open to discussing DevOps opportunities, SRE best practices, and cloud infrastructure projects.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
