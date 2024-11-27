import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import { SuperHerospage } from './componenets/SuperHeros.page';
import { RQSuperHerospage } from './componenets/RQSuperHeros.page';
import { Homepage } from './componenets/Home.page';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SuperheroId } from './componenets/SuperheroId';
import { ParallelQuery } from './componenets/ParallelQuery';
import { DynamicParallelQuery } from './componenets/DynamicParallelQuery';
import { DependentQuery } from './componenets/DependentQuery';
import { Paginatedqueries } from './componenets/Paginatedqueries';
import { Overview } from './componenets/Overview';

const queryClient = new QueryClient();

function App() {
  return (
    // queryClient - used initial query data
    <QueryClientProvider client={queryClient}>
      <Router>
        <Main />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function Main() {
  const location = useLocation();
  const isExtraPage = location.pathname === '/extra';

  return (
    <div>
      {/* Conditionally render the navigation menu */}
      {!isExtraPage && (
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
      )}

      <Routes>
        <Route path='/super-heroes' element={<SuperHerospage />} />
        <Route path='/rq-super-heroes' element={<RQSuperHerospage />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/rq-super-heroes/:heroId' element={<SuperheroId />} />
        <Route path='/parallel-query' element={<ParallelQuery />} />
        <Route path='/dynamic-parallel-query' element={<DynamicParallelQuery heroIds={[1, 3]} />} />
        <Route path='/dependent-query' element={<DependentQuery email='vijayvjj7@gmail.com' />} />
        <Route path='/paginated-queries' element={<Paginatedqueries />} />
        <Route path='/extra' element={<Overview />} />      </Routes>
    </div>
  );
}

export default App;
