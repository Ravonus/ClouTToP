import { ipcRenderer } from 'electron/renderer';
import { FC, useState } from 'react';
import TopBar from './topBar';

interface AppProps {}

const App: FC<AppProps> = () => {
  const [darkmode, setDarkmode] = useState(false);
  let plugin: any = useState('eef');
  let setPlugins: any;
  [plugin, setPlugins] = useState('daw');

  ipcRenderer.on('pushPlugin', function (evt, message: any) {
    console.log(message); // Returns: {'SAVED': 'File Saved'}

    setPlugins(message);
  });

  async function darkmodeCheck(value: boolean) {
    await setDarkmode(value);
  }

  return (
    <>
      <TopBar
        darkmode={darkmode}
        setDarkmode={setDarkmode}
        darkmodeCheck={darkmodeCheck}
      />
      <div className='text-center l flex flex-col justify justify-center dark:text-primary'>
        <div className='pt-12'>
          <span>{plugin.name} is trying to install is this ok?</span>

          <div className='grid grid-cols-2 gap-4 pt-12 px-4'>
            <button
              onClick={async () => {
                console.log('RAN');
                ipcRenderer.invoke('pluginSetup', {
                  ...plugin,
                  install: true,
                });
              }}
              className='text-green-500 bg-transparent border border-solid border-green-500 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
            >
              Install
            </button>
            <button
              onClick={() => {
                ipcRenderer.invoke('pluginSetup', {
                  ...plugin,
                  install: false,
                });
              }}
              className='text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
