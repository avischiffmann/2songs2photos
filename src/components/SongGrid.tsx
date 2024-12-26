import Image from 'next/image'
import { Song } from '@/types'

interface SongGridProps {
    song: Song | null
    onClick: () => void
  }
  
  export default function SongGrid({ song, onClick }: SongGridProps) {
    return (
      <div
        onClick={onClick}
        className="aspect-square bg-gray-800 rounded-lg overflow-hidden relative cursor-pointer 
                   hover:bg-gray-700 transition-colors border border-gray-700"
      >
        {song ? (
          <div className="relative w-full h-full">
            <Image
              src={song.albumArt}
              alt={song.album}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="font-medium truncate">{song.title}</p>
              <p className="text-sm text-gray-300 truncate">{song.artist}</p>
            </div>
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