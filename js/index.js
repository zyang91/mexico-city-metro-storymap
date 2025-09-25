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
const data = await resp.json();

const slideOptions = {
  'second-slide': {
    bounds: L.geoJSON(data.features.find(f => f.properties.LINEA == '1')).getBounds(),
    style: (feature) => {
      return {
        color: `#${feature.properties.color}`,
        weight: 4,
        opacity: 0.8,
      };
    },
    onEachFeature: (feature, layer) => {
      const lineNumber = feature.properties.LINEA;
      const routeName = feature.properties.RUTA;
      layer.bindTooltip(`Metro Line ${lineNumber}: ${routeName}`);
    },
  },
  'third-slide': {
    style: (feature) => {
      return {
        color: `#${feature.properties.color}`,
        weight: 4,
        opacity: 0.8,
      };
    },
    onEachFeature: (feature, layer) => {
      const lineNumber = feature.properties.LINEA;
      const routeName = feature.properties.RUTA;
      layer.bindTooltip(`Metro Line ${lineNumber}: ${routeName}`);
    },
  },
};

// ## The SlideDeck object
const deck = new SlideDeck(container, slides, map, slideOptions);

document.addEventListener('scroll', () => deck.calcCurrentSlideIndex());

deck.preloadFeatureCollections();
deck.syncMapToCurrentSlide();
