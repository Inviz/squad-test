import { h, Component } from 'preact';
import { useState, useCallback, useRef } from 'preact/hooks';
import style from './style';

import Dialog from '../../components/dialog';
import Call from '../../components/call';

import sample from './sample.json';

export default (params, { name }) => {
  // read out name from params if desired
  const [ me, setMe ] = useState({
    name: (name || params.name && decodeURIComponent(params.name)),
    src: 'http://mirrors.standaloneinstaller.com/video-sample/grb_2.mp4'
  });

  // request invitation information
  const [ invite, setInvite ] = useState({});
  fetch(`http://${location.host.split(':')[0]}:3999/api/invite/${params.id}`).then(response => {
    response.json().then(setInvite);
  })

  // set status of a call
  const [ status, setStatus ] = useState('initial');
  if (status === 'initial' && me.name) {
    setStatus('initialized')
  }

  // request camera feed
  const requestingMedia = useRef(null);
  if (!requestingMedia.current) {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      requestingMedia.current = navigator.mediaDevices.getUserMedia({video: true})
        .then(function(stream) {
          setMe({...me, srcObject: stream})
        });
    }
  }

  // handle name dialog
  const onInvitationFormSubmit = useCallback((e) => {
    const nameFromInput = new FormData(e.target).get('name').trim();
    setMe({...me, name: nameFromInput})
    e.preventDefault()
  }, [me]);

  // manage participant addition & removal
  const [ participants, setParticipants ] = useState(sample.slice(0, 1));
  const removeParticipant = useCallback((index) => {
    setParticipants(participants.slice(0, index).concat(participants.slice(index + 1)));
  }, [participants]);
  const addParticipant = useCallback(() => {
    setParticipants([sample[participants.length]].concat(participants));
  }, [participants]);

  // handle clicks && double clicks
  const clearTimer = () => {
    clearTimeout(doubleClickTimer.current);
    doubleClickTimer.current = 0;
  }
  const doubleClickTimer = useRef(0);
  const onClick = useCallback((e) => {
    // second click
    if (doubleClickTimer.current) {
      const clickedVideo = e.target.closest('[index]');
      if (clickedVideo) {
        if (participants.length === 1) {
          setStatus('finished')
        } else {
          removeParticipant(parseInt(clickedVideo.getAttribute('index')))
        }
      }
      clearTimer();
    } else {
      // wait for 300ms in case second click happens
      doubleClickTimer.current = setTimeout(() => {
        if (doubleClickTimer.current) {
          if (participants.length < 8) {
            addParticipant();
          }
        }
        clearTimer();
      }, 300)
    }

  }, [participants]);

  // call quit callback
  const onFinish = useCallback(() => {
    setStatus('finished');
  })

  // pause callback
  const onPause = useCallback(() => {
    setStatus(status === 'paused' ? 'initialized' : 'paused');
  }, [status])

  return [
    status !== 'finished' && <Dialog isOpen={!me.name} key="before">
      <header>
        {invite.author && <h2>{invite.author}</h2>}
        {invite.author && <p>invited you to join a video chat</p>}
        {!invite.author && <p>Loading invitation...</p>}

      </header>
      <form onSubmit={onInvitationFormSubmit}>
        <p>What's your full name?</p>
        <input name="name" value={me.name} />

        <button>Join the room</button>

        <p class={style.footnote}>
          You agree to our <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>
        </p> 
      </form>
    </Dialog>,

    status !== 'initial' && <Dialog isOpen={status === 'finished'} key="after">
      <header>
        <h2>The call is over</h2>
        <p>Have a wonderful day!</p>
      </header>
      <form>
        <p>How was quality of the call?</p>

        <div class={style.choices}>
          <label><input type="radio" name="quality" defaultChecked />Great</label>
          <label><input type="radio" name="quality" />Okay</label>
          <label><input type="radio" name="quality" />Bad</label>
        </div>
        <button>Send feedback</button>
      </form>
    </Dialog>,

    status !== 'initial' ? <Call 
      onClick={onClick}
      onFinish={onFinish}
      onPause={onPause}
      status={status}
      participants={participants} me={me} /> : null
  ];
}
