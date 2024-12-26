import { useState, useEffect } from 'react'
import { Song } from '@/types'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (song: Song) => void
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelect,
}: SearchModalProps) {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSongSelect = (song: Song) => {
    onSelect(song)
    setSearch('')
    setResults([])
  }

  useEffect(() => {
    if (!isOpen) {
      setSearch('')
      setResults([])
      setError(null)
    }
  }, [isOpen])

  useEffect(() => {
    const searchSongs = async () => {
      if (!search.trim()) {
        setResults([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/spotify?q=${encodeURIComponent(search)}`)
        if (!response.ok) {
          throw new Error('Search failed')
        }
        const data = await response.json()
        setResults(data)
      } catch (err) {
        setError('Failed to search songs')
        console.error('Search error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(searchSongs, 300)
    return () => clearTimeout(timeoutId)
  }, [search])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-lg">
        <input
          type="text"
          placeholder="Search for a song..."
          className="w-full p-3 rounded-lg bg-gray-800 text-white mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
        
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-4 text-gray-400">Searching...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-400">{error}</div>
          ) : results.length > 0 ? (
            results.map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-4 p-3 hover:bg-gray-800 rounded-lg cursor-pointer"
                onClick={() => handleSongSelect(song)}
              >
                <img
                  src={song.albumArt}
                  alt={song.album}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-400">
              {search ? 'No results found' : 'Start typing to search'}
            </div>
          )}
        </div>

        <button
          className="mt-4 w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}