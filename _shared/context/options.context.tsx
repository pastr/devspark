import { createContext, Dispatch, useContext } from "react";
import { useStateStorageSynced } from "../hooks/useStateStorageSynced";
import { IOptionsContextState } from "../types/IOptionsState";

const defaultContextState: IOptionsContextState = {
  options: {
    jira: {
      organizationName: ""
    },
    github: {
      deemphasizeTextList: []
    },
    environmentName: []
  }
};

const OptionsContext = createContext<[IOptionsContextState, Dispatch<React.SetStateAction<IOptionsContextState>>]>([] as unknown as [IOptionsContextState, Dispatch<React.SetStateAction<IOptionsContextState>>]);

export const OptionsProvider = ({ children }: {children: JSX.Element}) => {
  // TODO: Fix the options satte because it's {options: {options: {}}
  const [localOptions, setLocalOptions] = useStateStorageSynced("options", defaultContextState);

  return (
    <OptionsContext.Provider value={[localOptions, setLocalOptions]}>
      {children}
    </OptionsContext.Provider>
  );
};


export const useOptions = () => useContext(OptionsContext);