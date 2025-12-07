const fs = require('fs');
const path = require('path');

// Create a proper 32x32 PNG with a simple colored square
const createColoredPNG = (color) => {
  // This creates a minimal but valid PNG file
  const width = 32;
  const height = 32;
  
  // PNG signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 2; // color type (RGB)
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  
  const ihdrCrc = crc32(Buffer.concat([Buffer.from('IHDR'), ihdrData]));
  const ihdr = Buffer.concat([
    Buffer.from([0x00, 0x00, 0x00, 0x0D]), // length
    Buffer.from('IHDR'),
    ihdrData,
    Buffer.from([(ihdrCrc >>> 24) & 0xFF, (ihdrCrc >>> 16) & 0xFF, (ihdrCrc >>> 8) & 0xFF, ihdrCrc & 0xFF])
  ]);
  
  // Simple IDAT chunk with solid color
  const pixelData = Buffer.alloc(width * height * 3);
  for (let i = 0; i < pixelData.length; i += 3) {
    pixelData[i] = color.r;     // Red
    pixelData[i + 1] = color.g; // Green  
    pixelData[i + 2] = color.b; // Blue
  }
  
  // Add filter bytes (0 for no filter)
  const filteredData = Buffer.alloc(height * (width * 3 + 1));
  for (let y = 0; y < height; y++) {
    filteredData[y * (width * 3 + 1)] = 0; // filter byte
    pixelData.copy(filteredData, y * (width * 3 + 1) + 1, y * width * 3, (y + 1) * width * 3);
  }
  
  // Compress with zlib (simplified)
  const compressed = Buffer.from([0x78, 0x9C, 0x01, 0x01, 0x04, 0x00, 0xFE, 0xFB, ...filteredData, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
  
  const idatCrc = crc32(Buffer.concat([Buffer.from('IDAT'), compressed]));
  const idat = Buffer.concat([
    Buffer.from([(compressed.length >>> 24) & 0xFF, (compressed.length >>> 16) & 0xFF, (compressed.length >>> 8) & 0xFF, compressed.length & 0xFF]),
    Buffer.from('IDAT'),
    compressed,
    Buffer.from([(idatCrc >>> 24) & 0xFF, (idatCrc >>> 16) & 0xFF, (idatCrc >>> 8) & 0xFF, idatCrc & 0xFF])
  ]);
  
  // IEND chunk
  const iend = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82]);
  
  return Buffer.concat([signature, ihdr, idat, iend]);
};

// Simple CRC32 implementation
function crc32(data) {
  const table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

const iconsDir = path.join(__dirname, 'public', 'icons');
const iconConfigs = {
  'mcp.png': { r: 100, g: 150, b: 255 },      // Blue
  'openai.png': { r: 16, g: 163, b: 127 },    // OpenAI green
  'anthropic.png': { r: 255, g: 140, b: 0 },  // Orange
  'huggingface.png': { r: 255, g: 215, b: 0 }, // Yellow
  'custom.png': { r: 128, g: 128, b: 128 },   // Gray
  'builtin.png': { r: 75, g: 85, b: 99 },     // Dark gray
  'default.png': { r: 200, g: 200, b: 200 }   // Light gray
};

console.log('Creating better icon files...');

Object.entries(iconConfigs).forEach(([iconName, color]) => {
  const iconPath = path.join(iconsDir, iconName);
  const pngData = createColoredPNG(color);
  fs.writeFileSync(iconPath, pngData);
  console.log(`Created: ${iconName} (${pngData.length} bytes)`);
});

console.log('Done!');
