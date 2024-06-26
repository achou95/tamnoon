import data from './webinterviews-main/assets.json'
import './App.css';
import AssetTable from './AssetTable';

function App() {

  return (
    <div className="App">
      <h1>Tamnoon</h1>
      <AssetTable data={data}></AssetTable>
    </div>
  );
}

export default App;
