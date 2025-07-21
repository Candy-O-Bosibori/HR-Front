
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';
import routes from './routes';
import { Login } from './pages/Login/Login';

function App() {
  return (
    <Router       
      basename={import.meta.env.DEV ? '/' : '/HR-Front/'}
    >
      <Routes>
        <Route path="/signin" element={<Login />} /> 
        <Route path="/" element={<Navigate to="/signin" />} />
        {routes.map((route, index) => (
          route.path !== "/signin" &&
          <Route key={index} path={route.path} element={
            <AuthWrapper role={route.role} Sidebar={route.Sidebar}>
              <route.Element />
            </AuthWrapper>
            
          }/>
        ))}
      </Routes>
    </Router>
  );
}

export default App;