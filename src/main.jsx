import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter} from 'react-router-dom';
import { CartProvider } from './CartContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>

    <CartProvider>
     <App/>
    </CartProvider>
  </BrowserRouter>
);
