import { useEffect } from 'react';
import { auth } from './firebase';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './features/userSlice';
import Logged from './logged';
import Signup from './signup';
import { Route, Switch, useHistory } from 'react-router';


function App() {
  let history = useHistory();
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged(user=>{
      if(user){
        dispatch(login({
          user:user.email,
          id:user.uid,
        }))
      }
    })
  }, [dispatch])
  return (
    <div className="app">
      <Switch>
          <Route exact path="/signup">
            {(!user)?(<Signup />):(history.replace({pathname:'/login'}))}
          </Route>
          <Route path="/">
          {(!user)?(<Login/>):(<Logged/>)}
          </Route>
        </Switch>
    
      
    </div>
  );
}

export default App;
