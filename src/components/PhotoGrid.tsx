import { useState } from 'react'

interface PhotoGridProps {
  photo: string | null
  onUpload: (url: string) => void
}

export default function PhotoGrid({ photo, onUpload }: PhotoGridProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result
          if (typeof result === 'string') {
            onUpload(result)
          }
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden relative cursor-pointer 
                 hover:bg-gray-700 transition-colors border border-gray-700"
    >
      {photo ? (
        <div className="relative w-full h-full">
          <img 
            src={photo} 
            alt="Uploaded" 
            className="w-full h-full object-cover"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white">Change Image</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <PlusIcon className="w-8 h-8 text-gray-500" />
        </div>
      )}
    </div>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  )
}