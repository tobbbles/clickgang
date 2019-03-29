import { get } from 'lodash';
import '../css/main.scss';

let state;

const createNotification = ({
  title,
  body
}) => {
  const notify = new Notification(title, { body });

  notify.onclick = function () {
    window.focus();
  };

  setTimeout(notify.close.bind(notify), 4000);
};

const gameEvent = ({ event = 'heartbeat', data = {} }) => {
  const payload = {
    event,
    timestamp: new Date().toISOString(),
    id: state.user,
    data: {
      ...data
    }
  };

  console.groupCollapsed(`Send: ${ event }`);
  console.log(payload);
  console.groupEnd();

  return JSON.stringify(payload);
};

const handleDisconnect = (serverTriggered) => {
  if (serverTriggered) {
    console.log('server triggered disconnect');
  } else {
    console.log('disconnect');
  }
};

const disableButton = () => {
  const cgButton = document.getElementById('cg-action');

  cgButton.classList.remove('active');

};

const updateCircle = () => {

};

const setState = (newState, callback) => {
  state = { ...state, ...newState };

  callback();
};

const updatePlayers = () => {
  const { total_players, remaining_players } = state;

  const playerDisplay = document.querySelectorAll('#players span');

  playerDisplay[0].innerHTML = remaining_players;
  playerDisplay[1].innerHTML = total_players;
};

const updateRound = () => {
  const { round_count } = state;

  const roundDisplay = document.querySelectorAll('#round span');
  roundDisplay[0].innerHTML = round_count;
};

const initClickGang = () => {
  const cgButton = document.getElementById('cg-action');

  // websocket config
  const connection = new WebSocket('ws://localhost:3117/game');

  // inform server of disconnect when user closes window
  window.addEventListener('beforeunload', () => {
    if (state.user) {
      connection.send(gameEvent({ event: 'disconnect' }));
    }
  });

  connection.onopen = () => {
    // send connect event
    // receive user id
    connection.send(JSON.stringify({
      event: 'connect'
    }));
  };

  connection.onclose = () => {
    handleDisconnect();
  };

  connection.onerror = () => {
    throw new Error('Websocket connection error');
  };

  connection.onmessage = msg => {
    const event = JSON.parse(msg.data);

    // debugging
    console.groupCollapsed(`Received: ${ event.event }`);
    console.log('response', msg);
    console.log('payload', event);
    console.groupEnd();

    const {
      total_players,
      remaining_players
    } = event.data;

    switch (event.event) {
      case 'connected':
        // {"event": "connected", "data": { "id": "xxxx-xxxxxxxx-xxx–xxxxxx" }}
        setState({
          user: event.data.id,
          total_players,
          remaining_players,
          round_count: 0
        });
        break;
      case 'disconnected':
        // {"event": "disconnected"}
        handleDisconnect(true);
        break;
      case 'round_started':
        disableButton();
        setState({
          round_count: event.data.round_count
        }, updateRound);
        // {"event": "round_started", "data": {"timestamp": "..."}}
        break;
      case 'round_ended':
        disableButton();
        setState({
          total_players,
          remaining_players,
          round_count: event.data.round_count
        }, updateRound);
        // {"event": "round_ended", "data": {"timestamp": "..."}}
        break;
      case 'round_crashed':
        disableButton();
        setState({
          total_players,
          remaining_players
        });
        // {"event": "round_crashed", "data":{"timestamp": "..."}}
        break;
      case 'round_tick':
        // game pause logic
        //{"event": "round_tick", "data": {"total_players": 60, "remaining_players": 35, "timestamp":"..."}}
        setState({
          total_players,
          remaining_players,
          round_count: event.data.round_count
        });
        updateCircle();
        break;
      case 'notify':
        createNotification({
          title: get(event, 'data.title'),
          body: get(event, 'data.message')
        });
        break;
      case 'click_requested':
        cgButton.classList.add('active');
        createNotification({
          title: 'Time to click!',
          body: 'It\'s your turn to click now! :D'
        });
        break;
      default:
        console.log(event);
        break;
    }

    updatePlayers(event.data);
  };


  // click response
  // game button
  cgButton.addEventListener('click', () => {
    disableButton();
    connection.send(
      gameEvent({
        event: 'click_response'
      })
    );
  });
};

window.addEventListener('load', function () {
  // At first, let's check if we have permission for notification
  // If not, let's ask for i
  console.log('load', window.Notification, Notification.permission);
  if (window.Notification && Notification.permission !== 'granted') {
    Notification.requestPermission().then(function (status) {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
    });
  }

  initClickGang();
});
