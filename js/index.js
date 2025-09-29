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

const slideOptions = {
  'intro-slide':{
    bounds: L.geoJSON(metroData).getBounds(),
    datasets: ['metro', 'metrobus'],
    layerStyles: {
      metro: (feature) => ({
        color: `#${feature.properties.color}`,
        weight: 4,
        opacity: 0.8,
      }),
      metrobus: (feature) => ({
        color: '#FF6B35', // Orange color for Metrobus
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 5', // Dashed line to distinguish from metro
      })
    },
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
      }
    }
  },
  'metro-origins': {
    bounds: L.geoJSON(metroData.features.find(f => f.properties.LINEA == '1')).getBounds(),
    datasets: ['metro'],
    layerStyles: {
      metro: (feature) => {
        const isLine1 = feature.properties.LINEA === '1';
        return {
          color: `#${feature.properties.color}`,
          weight: isLine1 ? 5 : 2,
          opacity: isLine1 ? 1.0 : 0.3,
        };
      }
    },
    layerTooltips: {
      metro: (feature, layer) => {
        const lineNumber = feature.properties.LINEA;
        const routeName = feature.properties.RUTA;
        layer.bindTooltip(`Metro Line ${lineNumber}: ${routeName}`);
      }
    }
  },
  'metro-today-upgrades': {
    datasets: ['metro'],
    layerStyles: {
      metro: (feature) => ({
        color: `#${feature.properties.color}`,
        weight: 4,
        opacity: 0.8,
      })
    },
    layerTooltips: {
      metro: (feature, layer) => {
        const lineNumber = feature.properties.LINEA;
        const routeName = feature.properties.RUTA;
        layer.bindTooltip(`Metro Line ${lineNumber}: ${routeName}`);
      }
    }
  },
  'metro-experience-safety': {
    datasets: ['metro'],
    layerStyles: {
      metro: (feature) => ({
        color: `#${feature.properties.color}`,
        weight: 4,
        opacity: 0.8,
      })
    },
    layerTooltips: {
      metro: (feature, layer) => {
        const lineNumber = feature.properties.LINEA;
        const routeName = feature.properties.RUTA;
        layer.bindTooltip(`Metro Line ${lineNumber}: ${routeName}`);
      }
    }
  },
  'metrobus-origins': {
    datasets: ['metrobus'],
    layerStyles: {
      metrobus: (feature) => ({
        color: '#FF6B35', // Orange color for Metrobus
        weight: 4,
        opacity: 0.9,
      })
    },
    layerTooltips: {
      metrobus: (feature, layer) => {
        const lineNumber = feature.properties.LINEA;
        const routeName = feature.properties.RUTA;
        layer.bindTooltip(`Metrobús Line ${lineNumber}: ${routeName}`);
      }
    }
  },
  'metrobus-growth-electrification': {
    datasets: ['metrobus'],
    layerStyles: {
      metrobus: (feature) => ({
        color: '#FF6B35', // Orange color for Metrobus
        weight: 4,
        opacity: 0.9,
      })
    },
    layerTooltips: {
      metrobus: (feature, layer) => {
        const lineNumber = feature.properties.LINEA;
        const routeName = feature.properties.RUTA;
        layer.bindTooltip(`Metrobús Line ${lineNumber}: ${routeName}`);
      }
    }
  },
  'integration-fares': {
    datasets: ['metro', 'metrobus'],
    layerStyles: {
      metro: (feature) => ({
        color: `#${feature.properties.color}`,
        weight: 4,
        opacity: 0.8,
      }),
      metrobus: (feature) => ({
        color: '#FF6B35', // Orange color for Metrobus
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 5', // Dashed line to distinguish from metro
      })
    },
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
      }
    }
  },
  'equity-access': {
    datasets: ['metro', 'metrobus'],
    layerStyles: {
      metro: (feature) => ({
        color: `#${feature.properties.color}`,
        weight: 4,
        opacity: 0.8,
      }),
      metrobus: (feature) => ({
        color: '#FF6B35', // Orange color for Metrobus
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 5', // Dashed line to distinguish from metro
      })
    },
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
      }
    }
  },
  'climate-public-space': {
    datasets: ['metro', 'metrobus'],
    layerStyles: {
      metro: (feature) => ({
        color: `#${feature.properties.color}`,
        weight: 4,
        opacity: 0.8,
      }),
      metrobus: (feature) => ({
        color: '#FF6B35', // Orange color for Metrobus
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 5', // Dashed line to distinguish from metro
      })
    },
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
      }
    }
  },
  'resilience-maintenance': {
    datasets: ['metro', 'metrobus'],
    layerStyles: {
      metro: (feature) => ({
        color: `#${feature.properties.color}`,
        weight: 4,
        opacity: 0.8,
      }),
      metrobus: (feature) => ({
        color: '#FF6B35', // Orange color for Metrobus
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 5', // Dashed line to distinguish from metro
      })
    },
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
      }
    }
  },
  'whats-next': {
    datasets: ['metro', 'metrobus'],
    layerStyles: {
      metro: (feature) => ({
        color: `#${feature.properties.color}`,
        weight: 4,
        opacity: 0.8,
      }),
      metrobus: (feature) => ({
        color: '#FF6B35', // Orange color for Metrobus
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 5', // Dashed line to distinguish from metro
      })
    },
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
      }
    }
  },
};

// ## The SlideDeck object
const deck = new SlideDeck(container, slides, map, slideOptions, {
  metro: metroData,
  metrobus: metrobusData
});

document.addEventListener('scroll', () => deck.calcCurrentSlideIndex());

deck.preloadFeatureCollections();
deck.syncMapToCurrentSlide();
