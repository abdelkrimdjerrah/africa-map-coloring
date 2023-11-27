
import { solve } from './Algorithm';
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule
} from "react-simple-maps";
import features from './features.json'

interface Colors {
  [key: number]: string;
}

function App() {

  const data = solve();

  const colors:Colors = {
    1: "#CBB29E",
    2: "#809A91",
    3: "#F7EAE1",
    4: "#C3DDDC",
    5: "#00ffff",
    6: "#ff00ff",
    7: "#ffffff",
  }

  return (
    <div className='overscroll-none h-screen overflow-hidden'>
      <div className='flex flex-col gap-2 absolute bottom-10 text-lg md:text-2xl md:top-10 left-10'>
        <div className='flex gap-1 md:gap-2'>
          <div className=''>Number of colors used:</div>
          <div className='font-bold'>{data.numberOfColors}</div>
        </div>
        <div className='flex gap-1 md:gap-2'>
          <div className=''>Number of countries:</div>
          <div className=' font-bold'>{Object.keys(data.coloration).length}</div>
        </div>
      </div>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 16, 0],
          scale: 250
        }}
      >
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          <Geographies geography={features}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const country = geo.properties.name;
                const colorKey: number = data.coloration[country];
                const color:string = colors[colorKey];
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={ color ? color : "#F5F4F6"}
                  />
                );
              })
            }
          </Geographies>
      </ComposableMap>
    </div>
  );
}

export default App;
