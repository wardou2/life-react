import * as React from 'react';
import { GameOfLife } from './GameOfLife';

class App extends React.Component<{}> {
    render() {
        return <GameOfLife speed={150} width={15} height={15} />;
    }
}

export default App;
