# VR 360 Panorama Viewer

A modern, interactive 360-degree panoramic scene viewer built with Three.js and Vite. Explore immersive museum environments with smooth navigation, interactive hotspots, and point-of-interest markers.

## Features

- **360° Panoramic Viewing**: Seamlessly navigate immersive equirectangular panoramic images
- **Interactive Hotspots**: Click-to-navigate hotspots for moving between connected scenes
- **Point of Interest (POI) Markers**: Discover and learn about specific points in each scene with titles, descriptions, and images
- **Zoom Controls**: Zoom in/out with buttons or mouse scroll for detailed exploration
- **Auto-Rotate**: Automatically rotate the panorama for hands-free viewing
- **Fullscreen Support**: Immersive fullscreen experience
- **Scene Navigation**: Thumbnail-based scene switcher with quick preview
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark UI with glass-morphism effects
- **Performance Optimized**: LRU texture cache for efficient memory management

## Tech Stack

- **Three.js** - 3D rendering and panorama manipulation
- **Vite** - Fast build tool and development server
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern styling with CSS variables and animations

## Project Structure

```
vr360-demo/
├── public/
│   ├── images/
│   │   └── ms/                 # Museum panoramic images
│   │       ├── ms-1.jpeg
│   │       ├── ms-2.jpeg
│   │       ├── ms-3.jpeg
│   │       ├── ms-4.jpeg
│   │       ├── ms-5.jpeg
│   │       └── ms-6.jpeg
│   └── vite.svg
├── src/
│   ├── main.js                 # Main application logic
│   ├── counter.js              # Counter utility (if used)
│   └── style.css               # Styling
├── index.html                  # HTML entry point
├── package.json
└── vite.config.js              # Vite configuration
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vr360-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Usage

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Scene Configuration

Scenes are configured in `src/main.js`. Each scene object includes:

```javascript
{
  id: "Museum-01",                    // Unique scene identifier
  name: "Museum - View 1",            // Display name
  image: "/images/ms/ms-1.jpeg",      // Panoramic image path
  thumbnail: "/images/ms/ms-1.jpeg",  // Thumbnail for scene selector
  hotspots: [                         // Navigation hotspots
    {
      id: "to-Museum-02",
      target: "Museum-02",            // Target scene ID
      position: { lon: 60, lat: -10 },// Spherical coordinates
      label: "Navigate here"
    }
  ],
  poiMarkers: [                       // Points of interest
    {
      id: "poi-1",
      position: { lon: -65, lat: 30 },
      title: "Exhibition Title",
      description: "Description text",
      image: "/images/ms/ms-3.jpeg"
    }
  ]
}
```

## Controls

### Desktop
- **Drag Mouse**: Rotate and look around the panorama
- **Scroll Wheel**: Zoom in/out
- **Click Hotspots**: Navigate to connected scenes
- **Click POI Markers**: View detailed information about points of interest

### Mobile/Touch
- **Drag/Swipe**: Rotate and look around
- **Pinch**: Zoom in/out
- **Tap Hotspots**: Navigate between scenes

### UI Controls
- **Zoom In/Out Buttons**: Adjust zoom level
- **Auto Rotate Button**: Enable/disable automatic rotation
- **Fullscreen Button**: Enter fullscreen mode
- **Info Button**: View help and controls
- **Scenes Thumbnail Panel**: Switch between available scenes

## Current Scenes

The demo includes 6 interconnected museum views:

1. **Museum - View 1** → Main entrance area
2. **Museum - View 2** → Central hall with exhibition access
3. **Museum - View 3** → Gallery collection with multiple POI markers
4. **Museum - View 4** → Painting room with exhibition details
5. **Museum - View 5** → Secondary hall
6. **Museum - View 6** → Artifact room with collection markers

Each scene is fully connected with navigation hotspots and includes detailed POI markers for exploration.

## Performance

The viewer includes performance optimizations:

- **LRU Texture Cache**: Limits memory usage by caching only the most recently accessed textures
- **Lazy Loading**: Textures are loaded on-demand
- **Efficient Rendering**: Uses Three.js best practices for panoramic rendering

## Customization

### Adding New Scenes

1. Add your panoramic image to `public/images/ms/`
2. Create a new scene object in the `sections` array in `src/main.js`
3. Configure hotspots and POI markers as needed
4. Link it to existing scenes via hotspots

### Changing Colors

Edit the CSS variables in `src/style.css`:

```css
:root {
  --primary: #6366f1;           /* Primary button color */
  --primary-hover: #4f46e5;     /* Hover state */
  --bg-dark: #0f0f0f;           /* Dark background */
  --text: #ffffff;              /* Text color */
  /* ... more variables ... */
}
```

### Adjusting Panorama Behavior

Key settings in `src/main.js`:

- **Camera FOV**: Control zoom range
- **Auto-rotate Speed**: Adjust rotation animation
- **Texture Cache Size**: Modify LRU cache limit
- **Coordinate System**: Use longitude/latitude for hotspot positioning

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

- Panoramic images should be in equirectangular format (2:1 aspect ratio)
- Very large images may impact performance on older devices
- Fullscreen API may not work on all browsers due to security policies

## Future Enhancements

- [ ] Multi-scene loading animations
- [ ] Configurable theme system
- [ ] VR headset support (WebXR)
- [ ] Audio integration for scene narration
- [ ] Advanced analytics tracking
- [ ] Admin panel for scene management
- [ ] Social sharing features

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue in the repository or contact the development team.

---

**Created with Three.js & Vite** ✨
