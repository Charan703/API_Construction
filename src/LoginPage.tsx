import { useState, useEffect } from 'react';
import { Mail, Lock, CheckCircle2, Users, Rocket, Award, Sparkles, Code, Shield, Zap, TrendingUp, Clock, DollarSign, Globe, Star, FileText, Upload, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api, DEMO_ACCOUNTS, isStaticDemoMode } from './api';
import loginImage from './assets/5102555.png';

export default function LoginPage({ onLogin }: { onLogin: (role: string) => void }) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'builder'>('login');
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState('');
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: ''
  });
  
  const [builderData, setBuilderData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    company: '',
    experience: '',
    portfolio_url: ''
  });
  
  const [builderFiles, setBuilderFiles] = useState<any>({
    id_proof: null,
    address_proof: null,
    certificate: null
  });
  const isDemoMode = isStaticDemoMode;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (activeTab === 'login') {
        const result = await api.login(loginEmail, loginPassword);
        if (result.success) {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            onLogin(result.role);
          }, 1500);
        }
      } else if (activeTab === 'signup') {
        if (signupData.password !== signupData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        const result = await api.signup(signupData);
        if (result.success) {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            onLogin('client');
          }, 1500);
        }
      } else if (activeTab === 'builder') {
        if (!builderFiles.id_proof || !builderFiles.address_proof) {
          setError('ID and Address proof are required');
          return;
        }
        const result = await api.builderRequest(builderData, builderFiles);
        if (result.success) {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            onLogin('worker');
          }, 1500);
        }
      }
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Server connection failed. Please ensure the backend is running.');
    }
  };

  const slides = [
    {
      title: "",
      subtitle: "",
      description: "",
      features: [],
      isImageOnly: true,
      imageUrl: loginImage
    },
    {
      title: "First Construction",
      subtitle: "Build Smarter, Launch Faster",
      description: "Transform your construction workflow with AI-powered site management. First Construction connects visionary clients with talented builders, delivering professional projects that exceed expectations.",
      features: [
        { icon: Rocket, title: "Lightning-Fast Deployment", text: "Launch professional projects in days, not months, with our AI-accelerated workflow" },
        { icon: Sparkles, title: "AI-Powered Intelligence", text: "Leverage cutting-edge AI technology that understands your vision and automates complex tasks" },
        { icon: Code, title: "Production-Ready Management", text: "Clean, optimized, and scalable project management that meets industry best practices" },
        { icon: Globe, title: "Global Platform", text: "Access talent and opportunities from anywhere in the world, 24/7" }
      ]
    },
    {
      title: "For Clients",
      subtitle: "Your Vision, Expertly Realized",
      description: "Whether you're a startup founder, business owner, or project manager, First Construction provides everything you need to bring your construction projects to life with confidence and ease.",
      features: [
        { icon: Users, title: "Vetted Expert Builders", text: "Work with pre-screened, highly skilled contractors and builders who deliver excellence" },
        { icon: CheckCircle2, title: "Unified Project Hub", text: "Manage requirements, track progress, review deliverables, and communicate seamlessly in one place" },
        { icon: TrendingUp, title: "Scalable Solutions", text: "Start small and grow big - our platform scales with your business needs" },
        { icon: Clock, title: "Predictable Timelines", text: "Clear milestones and transparent progress tracking keep your project on schedule" }
      ]
    },
    {
      title: "For Builders",
      subtitle: "Join Our Elite Network",
      description: "Become part of a thriving ecosystem of top-tier contractors and builders. Access high-quality projects, grow your professional network, and build your reputation while earning competitive compensation.",
      features: [
        { icon: Briefcase, title: "Premium Projects", text: "Work on diverse, challenging projects from clients who value quality and innovation" },
        { icon: DollarSign, title: "Fair & Transparent Pay", text: "Competitive rates with secure, on-time payments and complete financial transparency" },
        { icon: Star, title: "Build Your Reputation", text: "Showcase your work, earn ratings, and grow your professional brand on our platform" },
        { icon: Zap, title: "AI-Assisted Workflow", text: "Focus on creative work while AI handles repetitive tasks and accelerates development" }
      ]
    },
    {
      title: "Quality & Trust",
      subtitle: "Excellence Built on Security & Reliability",
      description: "We maintain the highest standards across every aspect of our platform. From rigorous builder vetting to enterprise-grade security, your success and safety are our top priorities.",
      features: [
        { icon: Shield, title: "Bank-Level Security", text: "Enterprise-grade encryption, secure payment processing, and full data protection compliance" },
        { icon: Award, title: "Rigorous Vetting Process", text: "Every builder undergoes comprehensive screening, portfolio review, and skill verification" },
        { icon: CheckCircle2, title: "Quality Guarantee", text: "Multi-stage review process ensures every deliverable meets professional standards" },
        { icon: Users, title: "Dedicated Support", text: "Expert support team available to assist clients and builders throughout every project" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white flex overflow-hidden relative">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-[-8%] left-[-4%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-100/40 to-indigo-100/30 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-gradient-to-tl from-violet-100/35 to-purple-100/25 blur-3xl" />
      <div className="absolute top-[35%] left-[45%] w-96 h-96 rounded-full bg-gradient-to-bl from-cyan-100/30 to-blue-100/25 blur-3xl" />
      
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="w-full p-12 flex flex-col justify-center relative z-10">
          <div className="max-w-xl mx-auto">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out px-12 flex flex-col justify-center ${ 
                  index === currentSlide ? 'opacity-100 translate-x-0' : index < currentSlide ? 'opacity-0 -translate-x-full pointer-events-none' : 'opacity-0 translate-x-full pointer-events-none'
                }`}
              >
                {slide.isImageOnly ? (
                  <div className="flex items-center justify-center h-full">
                    <img 
                      src={slide.imageUrl} 
                      alt="First Construction" 
                      className="max-w-full max-h-[80vh] object-contain opacity-90"
                      style={{ filter: 'drop-shadow(0 0 80px rgba(59, 130, 246, 0.3))' }}
                    />
                  </div>
                ) : (
                  <div className="max-w-xl mx-auto space-y-8">
                    <div className="space-y-3">
                      <h1 className="text-5xl bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">{slide.title}</h1>
                      <p className="text-xl text-blue-600">{slide.subtitle}</p>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">{slide.description}</p>
                    <div className="space-y-4">
                      {slide.features.map((feature: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-gray-900 mb-1">{feature.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{feature.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-black w-8' : 'bg-black/30 w-2'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
        <div className="w-full max-w-md relative z-10">
          <div className="mb-8 flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl text-gray-900">First Construction</h1>
          </div>

          <div className="mb-8 flex justify-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/9666/9666241.png" 
              alt="Construction Mechanic" 
              className="w-32 h-32 object-contain"
            />
          </div>

          {showSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <p className="text-sm">{activeTab === 'login' ? 'Login successful!' : 'Request submitted successfully!'}</p>
            </div>
          )}
          
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {isDemoMode && activeTab === 'login' && (
            <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">GitHub Pages Demo</p>
              <p className="mt-2 text-sm text-slate-700">Use any demo account below to open the static site with local sample data.</p>
              <div className="mt-3 grid gap-2">
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    onClick={() => {
                      setLoginEmail(account.email);
                      setLoginPassword(account.password);
                    }}
                    className="flex items-center justify-between rounded-lg border border-blue-100 bg-white px-3 py-2 text-left text-sm transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    <span className="font-medium text-slate-800">{account.label}</span>
                    <span className="text-xs text-slate-500">{account.email}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button onClick={() => setActiveTab('login')} className={`flex-1 px-4 py-2.5 text-sm transition-all duration-200 rounded-lg ${activeTab === 'login' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Login
              </button>
              <button onClick={() => setActiveTab('signup')} className={`flex-1 px-4 py-2.5 text-sm transition-all duration-200 rounded-lg ${activeTab === 'signup' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Create Account
              </button>
              <button onClick={() => setActiveTab('builder')} className={`flex-1 px-4 py-2.5 text-sm transition-all duration-200 rounded-lg ${activeTab === 'builder' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Builder Access
              </button>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {activeTab === 'login' && (
                <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-3xl text-gray-900">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to access your projects</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-700">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="email" placeholder="you@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-700">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="password" placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all shadow-lg">Sign In</button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'signup' && (
                <motion.div key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-3xl text-gray-900">Create Client Account</h2>
                    <p className="text-gray-600">Start your project journey with us</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="First Name" value={signupData.first_name} onChange={(e) => setSignupData({...signupData, first_name: e.target.value})} className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                      <input type="text" placeholder="Last Name" value={signupData.last_name} onChange={(e) => setSignupData({...signupData, last_name: e.target.value})} className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <input type="email" placeholder="Email" value={signupData.email} onChange={(e) => setSignupData({...signupData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <input type="password" placeholder="Password" value={signupData.password} onChange={(e) => setSignupData({...signupData, password: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <input type="password" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all shadow-lg">Create Account</button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'builder' && (
                <motion.div key="builder" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                  <div className="space-y-1">
                    <h2 className="text-3xl text-gray-900">Request Builder Account</h2>
                    <p className="text-gray-600">Join our network of professionals</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="First Name" value={builderData.first_name} onChange={(e) => setBuilderData({...builderData, first_name: e.target.value})} className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                      <input type="text" placeholder="Last Name" value={builderData.last_name} onChange={(e) => setBuilderData({...builderData, last_name: e.target.value})} className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <input type="email" placeholder="Email" value={builderData.email} onChange={(e) => setBuilderData({...builderData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <input type="tel" placeholder="Phone" value={builderData.phone} onChange={(e) => setBuilderData({...builderData, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <input type="text" placeholder="Company (Optional)" value={builderData.company} onChange={(e) => setBuilderData({...builderData, company: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <select value={builderData.experience} onChange={(e) => setBuilderData({...builderData, experience: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" required>
                      <option value="">Years of Experience</option>
                      <option>0-2 years</option>
                      <option>3-5 years</option>
                      <option>6-10 years</option>
                      <option>10+ years</option>
                    </select>
                    <input type="url" placeholder="Portfolio URL" value={builderData.portfolio_url} onChange={(e) => setBuilderData({...builderData, portfolio_url: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h3 className="text-sm text-gray-900">Identity Verification Documents</h3>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-700">Government-Issued ID (Required)</label>
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setBuilderFiles({...builderFiles, id_proof: e.target.files?.[0]})} className="hidden" id="id-proof" required />
                        <label htmlFor="id-proof" className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                          <Upload className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-600">{builderFiles.id_proof ? builderFiles.id_proof.name : 'Upload ID'}</span>
                        </label>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-700">Address Proof (Required)</label>
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setBuilderFiles({...builderFiles, address_proof: e.target.files?.[0]})} className="hidden" id="address-proof" required />
                        <label htmlFor="address-proof" className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-600">{builderFiles.address_proof ? builderFiles.address_proof.name : 'Upload Address Proof'}</span>
                        </label>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-700">Certificate (Optional)</label>
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setBuilderFiles({...builderFiles, certificate: e.target.files?.[0]})} className="hidden" id="certificate" />
                        <label htmlFor="certificate" className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-600">{builderFiles.certificate ? builderFiles.certificate.name : 'Upload Certificate'}</span>
                        </label>
                      </div>
                    </div>
                    
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all shadow-lg">Submit Request</button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
