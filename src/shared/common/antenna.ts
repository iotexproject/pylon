// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import window from "global/window";
import Antenna from "iotex-antenna/lib";
import isBrowser from "is-browser";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JsonGlobal from "safe-json-globals/get";
import { WsSignerPlugin } from "iotex-antenna/lib/plugin/ws";

const state = isBrowser && JsonGlobal("state");
const iotexCore = isBrowser && state.base.iotexCore;

export function getAntenna(): Antenna {
  const injectedWindow: Window & { antenna?: Antenna } = window;
  if (injectedWindow.antenna) {
    return injectedWindow.antenna;
  }
  let signer;
  if (isBrowser) {
    signer = new WsSignerPlugin();
  }
  injectedWindow.antenna = new Antenna(iotexCore, { signer });
  return injectedWindow.antenna;
}
