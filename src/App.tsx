import { NativeBaseProvider } from 'native-base';
import Index from './Routes';

const App = () => {
  return <NativeBaseProvider>
    <Index />
    </NativeBaseProvider>

};

export default App;