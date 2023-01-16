import React from 'react';
import useGet from './hooks/useGet';

const AppContext = React.createContext({
    articles: []
});

function AppContextProvider({ children }) {

    // Sets up the app to fetch from a REST API.
    // const { data } = useGet('/api/hello', '');

    const { data, refresh,isLoading } = useGet('/api/todos', []);

    // The context value that will be supplied to any descendants of this component.
    // const context = {
    //     message: data?.message
    // }
    
    const context = {
        todoItems: data,
        refresh,
        isLoading
    }

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppContextProvider
};