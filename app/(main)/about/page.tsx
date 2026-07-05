import React from 'react'
import Link from 'next/link'

const AboutPage = () => {
  return (
    <div>
      <h1>AboutPage</h1>
      <Link href={'/contact'}>Go to contack</Link>
    </div>
  )
}

export default AboutPage