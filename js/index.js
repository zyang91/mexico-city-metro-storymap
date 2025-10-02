import { SlideDeck } from './slidedeck.js';

const map = L.map('map', {scrollWheelZoom: false}).setView([0, 0], 0);

// ## The Base Tile Layer
const baseTileLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  maxZoom: 16,
  attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
baseTileLayer.addTo(map);

// ## Interface Elements
const container = document.querySelector('.slide-section');
const slides = document.querySelectorAll('.slide');

// ## load GeoJSON data
const resp = await fetch('data/lines.geojson');
const metroData = await resp.json();

const respMetrobus = await fetch('data/metrobus.geojson');
const metrobusData = await respMetrobus.json();

const respMetroStations = await fetch('data/metro-station.geojson');
const metroStationsData = await respMetroStations.json();

const slideOptions = {
  'intro-slide': {
    bounds: L.geoJSON(metroData).getBounds(),
    datasets: ['metro', 'metrobus'],
  },
  'metro-origins': {
    bounds: L.geoJSON(metroData.features.find((f) => f.properties.LINEA == '1')).getBounds(),
    datasets: ['metro', 'metro-stations'],
    layerStyles: {
      'metro': (feature) => {
        const isLine1 = feature.properties.LINEA === '1';
        return {
          color: `#${feature.properties.color}`,
          weight: isLine1 ? 5 : 2,
          opacity: isLine1 ? 1.0 : 0.3,
        };
      },
      'metro-stations': (feature) => {
        const isLine1 = feature.properties.LINEA === '01';
        return {
          radius: isLine1 ? 6 : 2,
          fillColor: isLine1 ? '#f799c3ff' : '#CCCCCC',
          color: '#ffffff',
          weight: 2,
          opacity: isLine1 ? 1.0 : 0.5,
          fillOpacity: isLine1 ? 0.9 : 0.6,
        };
      },
    },
  },
  'metro-today-upgrades': {
    datasets: ['metro', 'metro-stations'],
    layerTooltips: {
      'metro': (feature, layer) => {
        const lineNumber = feature.properties.LINEA;
        const routeName = feature.properties.RUTA;
        layer.bindTooltip(`Metro Line ${lineNumber}: ${routeName}`);
      },
      'metro-stations': (feature, layer) => {
        const stationName = feature.properties.NOMBRE;
        const lineNumber = feature.properties.LINEA;
        const stationType = feature.properties.TIPO;
        layer.bindTooltip(`${stationName}<br>Line ${lineNumber}<br>${stationType}`);
      },
    },
  },
  'metro-experience-safety': {
    datasets: ['metro', 'metro-stations'],
    layerStyles: {
      'metro-stations': (feature) => {
        const isTransferOrTerminal = feature.properties.TIPO.includes('Transbordo') ||
                                    feature.properties.TIPO.includes('Terminal');
        return {
          radius: isTransferOrTerminal ? 5 : 2,
          fillColor: isTransferOrTerminal ? '#E74C3C' : '#3498DB',
          color: '#ffffff',
          weight: 1,
          opacity: 0.9,
          fillOpacity: isTransferOrTerminal ? 0.8 : 0.6,
        };
      },
    },
  },
  'metrobus-origins': {
    datasets: ['metrobus'],
    layerStyles: {
      'metrobus': (feature) => {
        return {
          color: `#${feature.properties.color}`,
          weight: 3,
          opacity: 0.7,
        };
      },
    },
  },
  'metrobus-growth-electrification': {
    datasets: ['metrobus'],
    layerStyles: {
      'metrobus': (feature) => {
        return {
          color: `#${feature.properties.color}`,
          weight: 3,
          opacity: 0.7,
        };
      },
    },
  },
  'integration-fares': {
    datasets: ['metro', 'metrobus'],
    layerTooltips: {
      metro: (feature, layer) => {
        const lineNumber = feature.properties.LINEA;
        const routeName = feature.properties.RUTA;
        layer.bindTooltip(`Metro Line ${lineNumber}: ${routeName}`);
      },
      metrobus: (feature, layer) => {
        const lineNumber = feature.properties.LINEA;
        const routeName = feature.properties.RUTA;
        layer.bindTooltip(`Metrobús Line ${lineNumber}: ${routeName}`);
      },
    },
  },
  'equity-access': {
    datasets: ['metro', 'metrobus'],
  },
  'climate-public-space': {
    datasets: ['metro', 'metrobus'],
  },
  'resilience-maintenance': {
    datasets: ['metro', 'metrobus'],
  },
  'whats-next': {
    datasets: ['metro', 'metrobus'],
  },
};

// ## The SlideDeck object
const deck = new SlideDeck(container, slides, map, slideOptions, {
  'metro': metroData,
  'metrobus': metrobusData,
  'metro-stations': metroStationsData,
});

// ## Add Legend
const legend = L.control({position: 'topleft'});

legend.onAdd = function() {
  const div = L.DomUtil.create('div', 'map-legend');
  div.innerHTML = '<h4>Transit Lines</h4>';

  // Add Metro Lines
  div.innerHTML += '<div class="legend-section"><strong>Metro</strong></div>';
  const metroLines = [
    {line: '1', color: 'F04E98', name: 'Observatorio - Pantitlán'},
    {line: '2', color: '005EB8', name: 'Cuatro Caminos - Tasqueña'},
    {line: '3', color: 'AF9800', name: 'Indios Verdes - Universidad'},
    {line: '4', color: '6BBBAE', name: 'Martín Carrera - Santa Anita'},
    {line: '5', color: 'FFD100', name: 'Politécnico - Pantitlán'},
    {line: '6', color: 'DA291C', name: 'El Rosario - Martín Carrera'},
    {line: '7', color: 'E87722', name: 'El Rosario - Barranca del Muerto'},
    {line: '8', color: '009A44', name: 'Garibaldi - Constitución de 1917'},
    {line: '9', color: '512F2E', name: 'Tacubaya - Pantitlán'},
    {line: 'A', color: '981D97', name: 'Pantitlán - La Paz'},
    {line: 'B', color: 'B1B3B3', name: 'Buenavista - Ciudad Azteca'},
    {line: '12', color: 'B0A32A', name: 'Mixcoac - Tláhuac'},
  ];

  metroLines.forEach((item) => {
    div.innerHTML += `<div class="legend-item">
      <span class="legend-line" style="background-color: #${item.color}"></span>
      <span class="legend-label">Line ${item.line}</span>
    </div>`;
  });

  // Add Metrobús Lines
  div.innerHTML += '<div class="legend-section"><strong>Metrobús</strong></div>';
  const metrobusLines = [
    {line: '1', color: 'D40D0D', name: 'Indios Verdes - El Caminero'},
    {line: '2', color: '8D1A96', name: 'Tepalcates - Tacubaya'},
    {line: '3', color: '7A9A01', name: 'Etiopia - Tenayuca'},
    {line: '4', color: 'F48020', name: 'San Lázaro - Buenavista'},
    {line: '5', color: '0071BC', name: 'San Lázaro - Glorieta Vaqueritos'},
    {line: '6', color: 'E30613', name: 'El Rosario - Villa de Aragón'},
    {line: '7', color: '128A3A', name: 'Campo Marte - Indios Verdes'},
  ];

  metrobusLines.forEach((item) => {
    div.innerHTML += `<div class="legend-item">
      <span class="legend-line" style="background-color: #${item.color}"></span>
      <span class="legend-label">Line ${item.line}</span>
    </div>`;
  });

  return div;
};

legend.addTo(map);

document.addEventListener('scroll', () => deck.calcCurrentSlideIndex());

deck.preloadFeatureCollections();
deck.syncMapToCurrentSlide();
