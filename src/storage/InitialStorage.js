
export const UsersContext = createContext({});

export const UsersContextProvider = props => {
    const usersContext = {
        users,
        vehicle,
        addNewUser,
        addNewVehicle,
        updateUser,
        updateVehicle,
        deleteUsers,
        deleteVehicle
      };
    
      // pass the value in provider and return
      return <UsersContext.Provider value={usersContext}>{children}</UsersContext.Provider>;
};