import { createContext, Dispatch, useContext } from "react";
import { useStateStorageSynced } from "../hooks/useStateStorageSynced";

type OptionsContextState = {
  options: {
    jira: {
      organizationName?: string
    }
  }
}

const defaultContextState: OptionsContextState = {
  options: {
    jira: {
      organizationName: ""
    }
  }
};

const OptionsContext = createContext<[OptionsContextState, Dispatch<React.SetStateAction<OptionsContextState>>]>([] as unknown as [OptionsContextState, Dispatch<React.SetStateAction<OptionsContextState>>]);

export const OptionsProvider = ({ children }: {children: JSX.Element}) => {
  const [localOptions, setLocalOptions] = useStateStorageSynced("options", defaultContextState);

  return (
    <OptionsContext.Provider value={[localOptions, setLocalOptions]}>
      {children}
    </OptionsContext.Provider>
  );
};


export const useOptions = () => useContext(OptionsContext);