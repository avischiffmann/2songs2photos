const sharp = require('sharp')

async function generateIcons() {
  const sizes = [16, 32, 64, 128, 256]
  const input = './public/icon.svg'

  // Generate favicon.ico (multiple sizes in one file)
  await sharp(input)
    .resize(32, 32)
    .toFile('./public/favicon.ico')

  // Generate apple-touch-icon
  await sharp(input)
    .resize(180, 180)
    .toFile('./public/apple-touch-icon.png')

  // Generate regular icon
  await sharp(input)
    .resize(512, 512)
    .toFile('./public/icon.png')
}

generateIcons() 