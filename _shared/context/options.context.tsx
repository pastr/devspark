import { createContext, Dispatch, useContext } from "react";
import { useStateStorageSynced } from "../hooks/useStateStorageSynced";
import { IOptionsContextState } from "../types/IOptionsState";

const defaultContextState: IOptionsContextState = {
  jira: {
    organizationName: ""
  },
  github: {
    deemphasizeTextList: []
  },
  allHost: {
    environmentName: []
  }
};

const OptionsContext = createContext<[IOptionsContextState, Dispatch<React.SetStateAction<IOptionsContextState>>]>([] as unknown as [IOptionsContextState, Dispatch<React.SetStateAction<IOptionsContextState>>]);

export const OptionsProvider = ({ children }: {children: JSX.Element}) => {
  const [localOptions, setLocalOptions] = useStateStorageSynced("options", defaultContextState);

  return (
    <OptionsContext.Provider value={[localOptions, setLocalOptions]}>
      {children}
    </OptionsContext.Provider>
  );
};


export const useOptions = () => useContext(OptionsContext);
