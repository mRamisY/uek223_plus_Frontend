import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../../../types/models/User.model';
import UserService from '../../../Services/UserService';
import UserForm from '../../molecules/UserForm/UserForm';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';

/**
 * UserPage Component
 * - Renders a form for user creation or editing based on whether the user is an admin or the current user.
 * - Handles logic for user redirection based on roles and permissions.
 */
const UserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user: currentUser, checkRole } = useContext(ActiveUserContext);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // If no currentUser, redirect to login
    if (!currentUser) {
      navigate('/login');
      // If the user is not an admin and tries to access another user's data, redirect to unauthorized
    } else if (userId && currentUser.id !== userId && !checkRole('ADMIN')) {
      navigate('/unauthorized');
      // Fetch the user data if userId is present in the URL
    } else if (userId) {
      UserService.getUser(userId).then((res) => {
        setUser(res);
      });
      // If no userId is present, initialize a blank user object for a new user creation
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

  /**
   * submitActionHandler - Handles form submission for both user creation and update
   * @param values - The user form values submitted
   */
  const submitActionHandler = (values: User) => {
    if (userId !== undefined) {
      // If userId exists, update the user
      UserService.updateUser(values).then(() => {
        if (checkRole('ADMIN')) {
          navigate('/users');
        } else {
          navigate('/user-home');
        }
      });
    } else if (checkRole('ADMIN')) {
      // If no userId and the current user is an admin, create a new user
      UserService.addUser(values).then(() => {
        navigate('/users');
      });
    } else {
      // If the user is not authorized, redirect to unauthorized
      navigate('/unauthorized');
    }
  };

  // Show loading message while fetching user data
  if (!user) {
    return <div>Loading...</div>;
  }

  // Render the UserForm component with the user data and the submit handler
  return <UserForm user={user} submitActionHandler={submitActionHandler} />;
};

export default UserPage;
