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
    // bbox: [-99.9, 19.2, -99.1, 19.6],
    bounds: L.geoJSON(data.features.find(f => f.properties.LINEA == '1')).getBounds(),
    style: (feature) => {
      return {
        color: 'red',
        fillColor: 'green',
        fillOpacity: 0.5,
      };
    },
    onEachFeature: (feature, layer) => {
      layer.bindTooltip(feature.properties.label);
    },
  },
  'third-slide': {
    style: (feature) => {
      return {
        color: 'blue',
        fillColor: 'yellow',
        fillOpacity: 0.5,
      };
    },
    onEachFeature: (feature, layer) => {
      layer.bindTooltip(feature.properties.label);
    },
  },
};

// ## The SlideDeck object
const deck = new SlideDeck(container, slides, map, slideOptions);

document.addEventListener('scroll', () => deck.calcCurrentSlideIndex());

deck.preloadFeatureCollections();
deck.syncMapToCurrentSlide();
