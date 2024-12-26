'use client'

import { useState } from 'react'
import SongGrid from '@/components/SongGrid'
import PhotoGrid from '@/components/PhotoGrid'
import SearchModal from '@/components/SearchModal'

export default function Home() {
  const [songs, setSongs] = useState<Array<Song | null>>([null, null])
  const [photos, setPhotos] = useState<Array<string | null>>([null, null])
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [activeGridIndex, setActiveGridIndex] = useState<number | null>(null)

  const handleSongSelect = (song: Song, index: number) => {
    const newSongs = [...songs]
    newSongs[index] = song
    setSongs(newSongs)
    setIsSearchModalOpen(false)
  }

  const handlePhotoUpload = (photoUrl: string, index: number) => {
    const newPhotos = [...photos]
    newPhotos[index] = photoUrl
    setPhotos(newPhotos)
  }

  const getCurrentWeek = () => {
    const now = new Date()
    return `Week of ${now.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })}`
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white p-8">
      <div className="max-w-2xl w-full bg-gray-900 rounded-xl p-8 border border-gray-800">
        {/* Container for both grids with increased spacing */}
        <div className="space-y-12">
          {/* Songs row - two squares */}
          <div className="grid grid-cols-2 gap-6 h-[250px]">
            {songs.map((song, index) => (
              <SongGrid
                key={index}
                song={song}
                onClick={() => {
                  setActiveGridIndex(index)
                  setIsSearchModalOpen(true)
                }}
              />
            ))}
          </div>
          
          {/* Photos row - two vertical columns */}
          <div className="grid grid-cols-2 gap-6">
            {photos.map((photo, index) => (
              <PhotoGrid
                key={index}
                photo={photo}
                onUpload={(url) => handlePhotoUpload(url, index)}
              />
            ))}
          </div>
        </div>

        <div className="text-center space-y-2 mt-8">
          <div className="text-gray-500 font-light">
            {getCurrentWeek()} • 2songs2photos.com
          </div>
        </div>
      </div>

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelect={(song) => handleSongSelect(song, activeGridIndex!)}
      />
    </main>
  )
}