import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../../../types/models/User.model';
import UserService from '../../../Services/UserService';
import UserForm from '../../molecules/UserForm/UserForm';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';

const UserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user: currentUser, checkRole } = useContext(ActiveUserContext);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (userId && currentUser.id !== userId && !checkRole('ADMIN')) {
      navigate('/unauthorized');
    } else if (userId) {
      UserService.getUser(userId).then((res) => {
        setUser(res);
      });
    } else {
      setUser({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
      });
    }
  }, [userId, currentUser, checkRole, navigate]);

  const submitActionHandler = (values: User) => {
    if (userId !== undefined) {
      UserService.updateUser(values).then(() => {
        if (checkRole('ADMIN')) {
          navigate('/users');
        } else {
          navigate('/user-home');
        }
      });
    } else if (checkRole('ADMIN')) {
      UserService.addUser(values).then(() => {
        navigate('/users');
      });
    } else {
      navigate('/unauthorized');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return <UserForm user={user} submitActionHandler={submitActionHandler} />;
};

export default UserPage;
