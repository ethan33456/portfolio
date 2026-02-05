import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import Head from 'next/head'

// Portrait slideshow: use your own at /valentine/slide-1.jpg … slide-13.jpg, or placeholders below
const USE_LOCAL_IMAGES = true // set true once you add slide-1.jpeg … slide-13.jpeg in public/valentine/
const SLIDE_IMAGES = USE_LOCAL_IMAGES
  ? Array.from({ length: 13 }, (_, i) => `/valentine/slide-${i + 1}.jpeg`)
  : Array.from(
      { length: 13 },
      (_, i) => `https://picsum.photos/seed/val${i + 1}/400/600`
    )

const SLIDE_DURATION_MS = 3500
const HEART_COUNT = 60

function Heart({ left, top, delay, dx, dy, scale }) {
  return (
    <div
      className="heart-burst-outer"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        '--burst-dx': `${dx}px`,
        '--burst-dy': `${dy}px`,
        '--burst-scale': scale,
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

  // Slideshow auto-advance (resets when user clicks prev/next)
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

  const goPrev = () => setSlideIndex((p) => (p > 0 ? p - 1 : SLIDE_IMAGES.length - 1))
  const goNext = () => setSlideIndex((p) => (p < SLIDE_IMAGES.length - 1 ? p + 1 : 0))

  // Initial position for "No" button (visible next to Yes) - useLayoutEffect so it's visible on first paint
  useLayoutEffect(() => {
    if (!slideshowDone || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setNoButtonPos((prev) => {
      if (prev.x === 0 && prev.y === 0) {
        return { x: rect.width / 2 + 72, y: rect.height / 2 }
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
                Us through the years (we still can&apos;t believe we put up with each other)
              </p>
              <div className="relative w-full aspect-[3/4] max-h-[70vh] rounded-2xl overflow-hidden bg-pink-100 shadow-inner">
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-rose-600 shadow-md flex items-center justify-center transition"
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-rose-600 shadow-md flex items-center justify-center transition"
                  aria-label="Next"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                </button>
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
            </div>
          ) : (
            <div className="fixed inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 9999 }}>
              {hearts.map((h) => (
                <Heart
                  key={h.id}
                  left={h.left}
                  top={h.top}
                  delay={h.delay}
                  dx={h.dx}
                  dy={h.dy}
                  scale={h.scale}
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
            className="absolute rounded-2xl font-semibold text-rose-700 bg-rose-100 border-2 border-rose-300 shadow-lg select-none transition-all duration-200 px-8 py-3 z-[100]"
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
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
      <style jsx global>{`
        @keyframes heart-burst-keyframes {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          25% {
            transform: translate(
                calc(-50% + var(--burst-dx, 0px)),
                calc(-50% + var(--burst-dy, 0px))
              )
              scale(var(--burst-scale, 1));
            opacity: 1;
          }
          100% {
            transform: translate(
                calc(-50% + var(--burst-dx, 0px)),
                calc(-50% + var(--burst-dy, 0px))
              )
              scale(var(--burst-scale, 1));
            opacity: 0;
          }
        }
        .heart-burst-outer {
          position: fixed;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: heart-burst-keyframes 2.5s ease-out forwards;
        }
      `}</style>
    </>
  )
}
