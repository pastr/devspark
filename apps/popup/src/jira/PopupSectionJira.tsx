import set from "lodash.set";
import { useEffect, useState } from "react";
import * as browser from "webextension-polyfill";

import { useOptions } from "@devspark/context/options";
import { useFocus } from "@devspark/hooks/useFocus";
import { ESupportedApps } from "@devspark/types/enums/ESupportedApps";

import PopupSection from "../_shared/components/PopupSection";

const TICKET_HISTORY_LENGTH = 5;

export default function PopupSectionJira() {
  const [jiraTicketNumber, setJiraTicketNumber] = useState("");
  const [organizationNameMissing, setOrganizationNameMissing] = useState(true);
  const [prefixInputRef, setPrefixInputFocus] = useFocus();
  const [ticketNumberInputRef, setTicketNumberInputFocus] = useFocus();
  const [options, setOptions] = useOptions();
  const jiraTicketPrefix = options?.jira?.ticketPrefix ?? "";
  const jiraTicketHistory = options?.jira?.ticketHistory ?? [];

  useEffect(() => {
    if (options.jira?.organizationName) {
      setOrganizationNameMissing(false);
    }
  }, [options.jira?.organizationName]);


  function openJiraTicket() {
    const jiraOrganizationName = options.jira?.organizationName;
    const newOptions: typeof options = { ...options };

    const fullTicket = `${jiraTicketPrefix}-${jiraTicketNumber}`;
    const url = `https://${jiraOrganizationName}.atlassian.net/browse/${fullTicket}`;
    const copyJiraTicketHistory = [...jiraTicketHistory];

    if (copyJiraTicketHistory.length >= TICKET_HISTORY_LENGTH) {
      copyJiraTicketHistory.pop();
    }
    copyJiraTicketHistory.unshift(url);
    set(newOptions, "jira.ticketHistory", copyJiraTicketHistory);
    setOptions(newOptions);

    browser.tabs.create({ url });
    window.close();
  }

  function setJiraTicketPrefix(prefix: string) {
    const newOptions: typeof options = { ...options };
    set(newOptions, "jira.ticketPrefix", prefix);
    setOptions(newOptions);
  }

  function onPrefixInputEnter() {
    isButtonDisabled() ? setTicketNumberInputFocus(true) : openJiraTicket();
  }
  function onTicketNumberInputEnter() {
    isButtonDisabled() ? setPrefixInputFocus(true) : openJiraTicket();
  }

  function isButtonDisabled(): boolean {
    return jiraTicketNumber === "" || jiraTicketPrefix === "" || organizationNameMissing;
  }

  function showErrors() {
    function openOptionsPage() {
      browser.runtime.openOptionsPage();
    }

    if (organizationNameMissing) {
      return (
        <div>
          <div className="text-red-400">Please set the Jira organization name in the options first.</div>
          <div className="text-red-400">You can access the options by clicking <button className="text-blue-600 underline bg-transparent" onClick={openOptionsPage}>here</button></div>
        </div>
      );
    }
  }

  return (
    <PopupSection title='Jira' icon={ESupportedApps.Jira}>
      <div className="flex flex-col gap-2">
        {
          organizationNameMissing ?
            showErrors() :
            <>
              <input className="input"
                     placeholder="ticket prefix"
                     value={jiraTicketPrefix}
                     ref={prefixInputRef}
                     onKeyDown={(e) => e.key === "Enter" ? onPrefixInputEnter() : null}
                     onChange={(e) => setJiraTicketPrefix(e.target.value)}/>
              <input className="input"
                     autoFocus
                     ref={ticketNumberInputRef}
                     onKeyDown={(e) => e.key === "Enter" ? onTicketNumberInputEnter() : null}
                     type="number"
                     min="1"
                     placeholder="ticket number"
                     value={jiraTicketNumber}
                     onChange={(e) => setJiraTicketNumber(e.target.value)}/>
              <button className="btn-primary"
                      disabled={isButtonDisabled()}
                      onClick={openJiraTicket}>
                Open ticket
              </button>
            </>
        }
        <section className="flex flex-col gap-1">
          <JiraTicketHistory jiraTickets={jiraTicketHistory} />
        </section>
      </div>
    </PopupSection>
  );
}

function JiraTicketHistory({ jiraTickets }: { jiraTickets: string[] }) {
  function showTickets() {
    return jiraTickets.map((ticketUrl, index) => {
      const ticketNumber = ticketUrl.split("/")[4];
      return (
        <a key={`${index}-${ticketUrl}`}
           className="underline text-blue-600 hover:text-blue-700"
           href={ticketUrl}
           target="_blank"
           rel="noreferrer">
          {ticketNumber.toUpperCase()}
        </a>
      );
    });
  }
  return (
    <>
      {jiraTickets.length ? `Last ${TICKET_HISTORY_LENGTH} tickets` : null}
      {showTickets()}
    </>
  );

}
