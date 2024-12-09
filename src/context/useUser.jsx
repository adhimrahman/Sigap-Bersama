import { useContext } from 'react';
import UserContext from './UserContext';

const useUser = () => useContext(UserContext);

export default useUser;