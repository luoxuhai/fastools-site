export interface IProps {
  dispatch: Function;
  match: any;
  token: string;
}
export interface IState {
  tool: any;
  visibleHelp: boolean;
  visibleFrame: boolean;
  visiblePayModal: boolean;
  loading: boolean;
  visibleInput: boolean;
  toolUrl: string;
  alias: string;
  iframeHeight: string | undefined;
  isFull: boolean;
}
