import React from 'react'
import { ProfileForm } from '@/components/custom/app-form'

const page = () => {
  return (
    <div className="  h-full w-full flex justify-center align-middle items-center bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%">
      <div className="  w-1/2">
        <ProfileForm />
      </div>
    </div>
  )
}

export default page