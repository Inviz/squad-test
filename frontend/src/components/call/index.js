import { h } from 'preact';
import style from './style.css';
import Participant from '../participant';
const Call = ({participants, me, status, onPause, onFinish, ...props}) => {
  const videos = [];
  for (var i = 0; i < participants.length; i++) {
    videos.push(<Participant key={participants[i].id} index={i} data={participants[i]}>
    </Participant>)
  }

  return [
    <div class={style.grid} {...props} count={participants.length + 1}>
      {videos}
      <Participant key="me" data={me}>
        {status === 'paused' && <div class={style.pause}>
          <img src="/assets/sample/avatar.png" />
          <div><strong>{me.name}</strong> is paused</div>

        </div>}
      </Participant>
    </div>,

    <div class={style.toolbar}>
      <svg onClick={onFinish} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
        <path d="M11 0v22M0 11h22" stroke="#fff" stroke-width="3" transform="rotate(-45 12 8.586) translate(0 2)"/>
      </svg>
      {status === 'paused' && <svg onClick={onPause} xmlns="http://www.w3.org/2000/svg" fill="none" width="26" height="26" viewBox="0 0 26 26">
        <path d="M17 17v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2m5.66 0H15a2 2 0 0 1 2 2v3.34l1 1L24 8v10M2 2l22 22"stroke="#fff" stroke-width="3"/>
      </svg>}
      {status !== 'paused' && <svg onClick={onPause} xmlns="http://www.w3.org/2000/svg" fill="none" width="26" height="18" viewBox="0 0 26 18">
        <g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" transform="translate(2 2)">
          <path d="M22 2l-7 5 7 5z"/>
          <rect width="15" height="14" rx="2"/>
      </g>
      </svg>}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="18" height="26" viewBox="0 0 18 26">
        <g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
          <path d="M9 2a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
          <path d="M16 11v2a7 7 0 1 1-14 0v-2M9 20v4M5 24h8"/>
        </g>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="26" height="22" viewBox="0 0 26 22">
        <g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
          <path d="M2 3v6h6M24 19v-6h-6"/>
          <path d="M21.49 8A9 9 0 0 0 6.64 4.64L2 9m22 4l-4.64 4.36A9 9 0 0 1 4.51 14"/>
        </g>
      </svg>
    </div>
  ]
};

export default Call;
