import browser from "webextension-polyfill";
import { createContext, Dispatch, useContext, useEffect, useState } from "react";

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
  const [localOptions, setLocalOptions] = useState(defaultContextState);

  useEffect(() => {
    browser.storage.sync.get("options").then(({ options }) => {
      if (options) {
        setLocalOptions(options);
      }
      console.log("🚀 ~ browser.storage.sync.get ~ options", options);
    });
  }, []);

  useEffect(() => {
    browser.storage.sync.set({ options: localOptions });
  }, [localOptions]);


  return (
    <OptionsContext.Provider value={[localOptions, setLocalOptions]}>
      {children}
    </OptionsContext.Provider>
  );
};


export const useOptions = () => useContext(OptionsContext);