import { NextResponse } from 'next/server'

interface SpotifyTrack {
  id: string
  name: string
  artists: Array<{ name: string }>
  album: {
    name: string
    images: Array<{ url: string }>
  }
}

let accessToken: string | null = null
let tokenExpiry: number = 0

async function getAccessToken() {
  // Return existing token if it's still valid
  if (accessToken && tokenExpiry > Date.now()) {
    return accessToken
  }

  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET

  if (!client_id || !client_secret) {
    throw new Error('Missing Spotify credentials')
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    const data = await response.json()
    accessToken = data.access_token
    tokenExpiry = Date.now() + (data.expires_in * 1000)
    return accessToken
  } catch (error) {
    console.error('Error getting Spotify access token:', error)
    throw error
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const token = await getAccessToken()
    
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    const tracks = data.tracks.items.map((track: SpotifyTrack) => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      albumArt: track.album.images[0]?.url,
    }))

    return NextResponse.json(tracks)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Failed to fetch songs' }, { status: 500 })
  }
} 