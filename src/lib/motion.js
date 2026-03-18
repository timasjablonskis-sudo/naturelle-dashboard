export const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 260, damping: 28 },
}

export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06 } },
}

export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 28 } },
}

export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 300, damping: 25 },
}
