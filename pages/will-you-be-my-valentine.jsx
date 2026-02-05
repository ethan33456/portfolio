import { useState, useEffect, useRef, useCallback } from 'react'
import Head from 'next/head'

// Portrait slideshow: use your own at /valentine/slide-1.jpg … slide-13.jpg, or placeholders below
const USE_LOCAL_IMAGES = false // set true once you add slide-1.jpg … slide-13.jpg in public/valentine/
const SLIDE_IMAGES = USE_LOCAL_IMAGES
  ? Array.from({ length: 13 }, (_, i) => `/valentine/slide-${i + 1}.jpg`)
  : Array.from(
      { length: 13 },
      (_, i) => `https://picsum.photos/seed/val${i + 1}/400/600`
    )

const SLIDE_DURATION_MS = 3500
const HEART_COUNT = 60

function Heart({ style, delay, dx, dy }) {
  return (
    <div
      className="absolute pointer-events-none heart-burst"
      style={{
        ...style,
        '--burst-dx': `${dx}px`,
        '--burst-dy': `${dy}px`,
        animationDelay: `${delay}ms`,
      }}
      aria-hidden
    >
      <span className="text-2xl md:text-4xl" role="img" aria-label="heart">
        ❤️
      </span>
    </div>
  )
}

export default function WillYouBeMyValentine() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [slideshowDone, setSlideshowDone] = useState(false)
  const [yesClicked, setYesClicked] = useState(false)
  const [hearts, setHearts] = useState([])
  const [showVideo, setShowVideo] = useState(false)
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const videoRef = useRef(null)

  // Slideshow auto-advance
  useEffect(() => {
    if (slideshowDone) return
    const id = setInterval(() => {
      setSlideIndex((prev) => {
        if (prev >= SLIDE_IMAGES.length - 1) {
          setSlideshowDone(true)
          return prev
        }
        return prev + 1
      })
    }, SLIDE_DURATION_MS)
    return () => clearInterval(id)
  }, [slideshowDone, slideIndex])

  // Initial position for "No" button (center-right of container)
  useEffect(() => {
    if (!slideshowDone || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setNoButtonPos((prev) => {
      if (prev.x === 0 && prev.y === 0) {
        return { x: rect.width / 2 + 70, y: rect.height / 2 }
      }
      return prev
    })
  }, [slideshowDone])

  // Running "No" button: move away from mouse
  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current || !slideshowDone || yesClicked) return
      const rect = containerRef.current.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const runRadius = 140
      let angle = Math.atan2(mouseY - centerY, mouseX - centerX)
      const dist = Math.hypot(mouseX - centerX, mouseY - centerY)
      if (dist < 180) {
        angle += Math.PI
      }
      const bx = centerX + Math.cos(angle) * runRadius
      const by = centerY + Math.sin(angle) * runRadius
      setNoButtonPos({ x: bx, y: by })
    },
    [slideshowDone, yesClicked]
  )

  const handleYesClick = () => {
    setYesClicked(true)
    const newHearts = Array.from({ length: HEART_COUNT }, (_, i) => {
      const angle = (Math.PI * 2 * i) / HEART_COUNT + Math.random() * 2
      const dist = 80 + Math.random() * 120
      return {
        id: i,
        left: 50,
        top: 50,
        dx: Math.cos(angle) * dist * (3 + Math.random() * 2),
        dy: Math.sin(angle) * dist * (3 + Math.random() * 2),
        delay: Math.random() * 400,
        scale: 0.5 + Math.random() * 1,
      }
    })
    setHearts(newHearts)
    setTimeout(() => {
      setHearts([])
      setShowVideo(true)
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {})
        }
      }, 100)
    }, 2800)
  }

  return (
    <>
      <Head>
        <title>Will you be my valentine? 💕</title>
      </Head>
      <div
        className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f8b4c4 0%, #fce4ec 50%, #f8bbd9 100%)',
          border: '16px solid #e91e63',
          boxSizing: 'border-box',
        }}
        onMouseMove={handleMouseMove}
        ref={containerRef}
      >
        {/* Floating decorative hearts in background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-300/40 animate-float"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${(i * 11) % 90}%`,
                fontSize: `${14 + (i % 3) * 10}px`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              ❤
            </div>
          ))}
        </div>

        <div
          className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg rounded-3xl px-6 py-10 md:py-14 shadow-xl"
          style={{ backgroundColor: '#fff5f8' }}
        >
          {!slideshowDone ? (
            <>
              <p
                className="text-center text-lg md:text-xl font-semibold mb-6 tracking-wide"
                style={{ color: '#c2185b' }}
              >
                Our story in every moment
              </p>
              <div className="relative w-full aspect-[3/4] max-h-[70vh] rounded-2xl overflow-hidden bg-pink-100 shadow-inner">
                {SLIDE_IMAGES.map((src, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{
                      opacity: i === slideIndex ? 1 : 0,
                      zIndex: i === slideIndex ? 1 : 0,
                    }}
                  >
                    <img
                      src={src}
                      alt={`Memory ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        const fallback = e.target.nextElementSibling
                        if (fallback) {
                          fallback.classList.remove('hidden')
                          fallback.classList.add('flex')
                        }
                      }}
                    />
                    <div
                      className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-pink-200 to-rose-200 text-rose-400 font-medium"
                    >
                      <span>Your photo {i + 1}</span>
                    </div>
                  </div>
                ))}
                <div
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-rose-400/90"
                  style={{ zIndex: 2 }}
                >
                  {slideIndex + 1} / {SLIDE_IMAGES.length}
                </div>
              </div>
            </>
          ) : !yesClicked ? (
            <>
              <p className="text-2xl md:text-4xl font-bold text-center mb-2 text-rose-700">
                Will you be my valentine?
              </p>
              <p className="text-rose-400 text-sm mb-8">💕</p>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleYesClick}
                  className="px-8 py-3 rounded-2xl font-semibold text-white shadow-lg hover:scale-105 active:scale-95 transition transform select-none relative"
                  style={{ backgroundColor: '#e91e63' }}
                >
                  Yes!
                </button>
              </div>
            </>
          ) : showVideo ? (
            <div className="w-full rounded-2xl overflow-hidden bg-black">
              <video
                ref={videoRef}
                className="w-full max-h-[70vh] object-contain"
                src="/valentine/response-video.mp4"
                controls
                playsInline
                autoPlay
                muted={false}
                loop
              />
              <p className="text-center text-rose-600 font-medium mt-4 py-2">
                I love you! 💕
              </p>
            </div>
          ) : (
            <div className="relative w-full h-96 flex items-center justify-center">
              {hearts.map((h) => (
                <Heart
                  key={h.id}
                  style={{
                    left: `${h.left}%`,
                    top: `${h.top}%`,
                    transform: `translate(-50%, -50%) scale(${h.scale})`,
                  }}
                  delay={h.delay}
                  dx={h.dx}
                  dy={h.dy}
                />
              ))}
            </div>
          )}
        </div>

        <p className="mt-6 text-rose-400/80 text-sm z-10">Made with love</p>

        {/* No button runs away from cursor and is not clickable */}
        {slideshowDone && !yesClicked && (noButtonPos.x !== 0 || noButtonPos.y !== 0) && (
          <button
            type="button"
            className="absolute rounded-2xl font-semibold text-rose-700 bg-rose-100 border-2 border-rose-300 shadow select-none transition-all duration-200 px-8 py-3"
            style={{
              left: noButtonPos.x,
              top: noButtonPos.y,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
            tabIndex={-1}
            aria-hidden
          >
            No
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-12px) rotate(5deg);
            opacity: 0.7;
          }
        }
        @keyframes heart-burst {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          20% {
            transform: translate(
                calc(-50% + var(--burst-dx, 0px)),
                calc(-50% + var(--burst-dy, 0px))
              )
              scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
                calc(-50% + var(--burst-dx, 0px)),
                calc(-50% + var(--burst-dy, 0px))
              )
              scale(1.1);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .heart-burst {
          animation: heart-burst 2.5s ease-out forwards;
          pointer-events: none;
        }
      `}</style>
    </>
  )
}
