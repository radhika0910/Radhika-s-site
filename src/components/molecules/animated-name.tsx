'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

const letters = 'A!B#C$D^E&F(G:H;I?J/K<L,M.N5O6P3Q1R@S%T*W2X7Y8Z9'

export const AnimatedName = () => {
  const [text, setText] = useState('RADHIKA BHOYAR')
  const [intervalId] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const ref = useRef<HTMLHeadingElement | null>(null)

  const handleMouseOver = useCallback(() => {
    if (isAnimating) return

    let iteration = 0

    if (intervalId !== null) {
      clearTimeout(intervalId)
    }

    const animate = () => {
      setIsAnimating(true)
      setText(prevText =>
        prevText
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return text[index]
            }
            return letters[Math.floor(Math.random() * 26)]
          })
          .join('')
      )

      if (iteration < text.length) {
        iteration += 1 / 3
        setTimeout(animate, 30)
      } else {
        setIsAnimating(false)
      }
    }

    animate()
  }, [intervalId, isAnimating, text])

  useEffect(() => {
    const currentRef = ref.current

    if (currentRef) {
      currentRef.addEventListener('mouseover', handleMouseOver)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mouseover', handleMouseOver)
      }
    }
  }, [handleMouseOver, ref])

  return (
    <h1 ref={ref} className='md:text-6xl sm:text-4xl text-3xl font-medium'>
      {text}
    </h1>
  )
}
