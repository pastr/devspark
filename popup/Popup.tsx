import { useEffect, useState } from 'react'
import browser from "webextension-polyfill";
import { ESupportedApps } from '../common/enums/ESupportedApps';
import PopupSectionGithub from './components/PopupSectionGithub';
import PopupSectionJira from './components/PopupSectionJira';

function Popup() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    browser.runtime.onMessage.addListener((msg) => {
      console.log('message received from content script: ', msg);
      setMsg(msg.action)
    })
  }, [])

  return (
    <div className="w-64 p-4 pt-2 flex flex-col">
      <PopupSectionJira  />
      <PopupSectionGithub  />
    </div>
  )
}

export default Popup
