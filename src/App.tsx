import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { SurebetCalculator } from './components/SurebetCalculator';
import { FreebetCalculator } from './components/FreebetCalculator';
import { RefundCalculator } from './components/RefundCalculator';
import { BoostCalculator } from './components/BoostCalculator';
import { ThemeProvider } from './contexts/ThemeContext';
import { AdProvider } from './contexts/AdContext';
import { Analytics } from './components/Analytics';

function App() {
    return (
        <ThemeProvider>
            <AdProvider>
                <BrowserRouter>
                    <Analytics />
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/surebet" element={<SurebetCalculator />} />
                            <Route path="/freebet" element={<FreebetCalculator />} />
                            <Route path="/refund" element={<RefundCalculator />} />
                            <Route path="/boost" element={<BoostCalculator />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </AdProvider>
        </ThemeProvider>
    );
}

export default App;

