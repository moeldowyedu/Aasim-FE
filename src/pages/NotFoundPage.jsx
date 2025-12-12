import { Link } from 'react-router-dom'
import { AlertCircle, Home, LayoutDashboard, HelpCircle, ArrowRight } from 'lucide-react'
import MainLayout from '../components/layout/MainLayout'

const NotFoundPage = () => {
  return (
    <MainLayout showFooter={false}>
      <div className="min-h-screen bg-[#0B0E14] text-white flex items-center justify-center px-6 relative overflow-hidden">

        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto pt-32">

          {/* Animated Icon */}
          <div className="mb-8 inline-block animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-8">
                <AlertCircle className="w-24 h-24 text-primary-400" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* 404 Heading with Gradient */}
          <h1 className="text-8xl md:text-9xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-primary-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              404
            </span>
          </h1>

          {/* Subheading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-slide-up">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>

            {/* Primary CTA - Go Home */}
            <Link
              to="/"
              className="glass-btn-primary group flex items-center gap-3 min-w-[200px] justify-center"
            >
              <Home className="w-5 h-5" />
              Go Home
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary CTA - Dashboard */}
            <Link
              to="/dashboard"
              className="glass-btn hover:bg-white/10 text-white group flex items-center gap-3 min-w-[200px] justify-center"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
          </div>

          {/* Help Link */}
          <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/support"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors text-sm"
            >
              <HelpCircle className="w-4 h-4" />
              Need help? Contact Support
            </Link>
          </div>

        </div>
      </div>
    </MainLayout>
  )
}

export default NotFoundPage
