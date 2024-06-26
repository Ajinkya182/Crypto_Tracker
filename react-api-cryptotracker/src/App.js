import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';



function App() { 
  const [coins, setCoins] = useState([]);
  const [search, setsearch]= useState(' ')

   useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
       .then(res => {
          setCoins(res.data);
          console.log(res.data);
       }).catch(error => console.log(error))
      }, []);
   
   const handleChange = e =>{
    setsearch(e.target.value)
   }

   const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    );
   
   return (
    <div  className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a coin</h1>
        <form>
          <input type="tect" placeholder="Search" 
           className="coin-input" onChange={handleChange}/>
        </form>
        </div>
        {filteredCoins.map(coin =>{
          return(
          <Coin
          key={coin.id}
          name={coin.name}
          price={coin.current_price}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          volume={coin.total_volume}
          image={coin.image}
          priceChange={coin.price_change_percentage_24h}
          
          />
        );
        })}


   </div>
  );
}

export default App;
