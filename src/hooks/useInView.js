import { useInView } from 'react-intersection-observer'

export function useReveal(threshold = 0.15) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
  })
  return { ref, inView }
}