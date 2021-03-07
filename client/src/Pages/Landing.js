import React, { useEffect, useRef, useState } from 'react';

import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import CallEndIcon from '@material-ui/icons/CallEnd';
import Footer from '../Components/Footer/Footer';
import { Howl } from 'howler';
import Navigation from '../Components/Navigation/Navigation';
import Peer from 'simple-peer';
import Rodal from 'rodal';
import VideoFrame from '../Components/VideoFrame';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import camera from '../Icons/camera.svg';
import camerastop from '../Icons/camera-stop.svg';
import fullscreen from '../Icons/fullscreen.svg';
import io from 'socket.io-client';
import minimize from '../Icons/minimize.svg';
import ringtone from '../Sounds/ringtone.mp3';
import share from '../Icons/share.svg';
import { useAuth } from '../Contexts/AuthContext';
import { useHistory } from 'react-router';
import useStyles from './Landing-jss';

// --------------------------------------------------

var identity = 0;
var classes = []; // list of classes
var text = ""


const ringtoneSound = new Howl({
  src: [ringtone],
  loop: true,
  preload: true,
});

const start = async () => {
  
  const predictions = document.getElementById('predictions');
  const confidence = document.getElementById('confidence');
  
  const createKNNClassifier = async () => {
    console.log('Loading KNN Classifier');
    return await window.knnClassifier.create();
};
  const createMobileNetModel = async () => {
    console.log('Loading Mobilenet Model');
    return await window.mobilenet.load();
  };
  const createWebcamInput = async () => {
    console.log('Loading Webcam Input');
    const webcamElement = await document.getElementById('webcam');
    return await window.tf.data.webcam(webcamElement);
  };


  const mobilenetModel = await createMobileNetModel();
  const knnClassifierModel = await createKNNClassifier();
  const webcamInput = await createWebcamInput();

  const uploadModel = async (classifierModel, event) => {
    let inputModel = event.target.files;
    console.log("Uploading");
    let fr = new FileReader();
    if (inputModel.length > 0) {
         fr.onload = async () => {
              var dataset = fr.result;
              var tensorObj = JSON.parse(dataset);

              Object.keys(tensorObj).forEach((key) => {
                   tensorObj[key] = window.tf.tensor(tensorObj[key], [tensorObj[key].length / 1024, 1024]);
              });
              classifierModel.setClassifierDataset(tensorObj);
              console.log("Classifier has been set up! Congrats! ");
         };
    }
    await fr.readAsText(inputModel[0]);
    console.log("Uploaded");
  };

  const initializeElements = () => {

    document.getElementById('load_button').addEventListener('change', (event) => uploadModel(knnClassifierModel, event));
  };

  const imageClassificationWithTransferLearningOnWebcam = async () => {
    console.log("Machine Learning on the web is ready");
    while (true) {
        if (knnClassifierModel.getNumClasses() > 0) {
              const img = await webcamInput.capture();

              // Get the activation from mobilenet from the webcam.
              const activation = mobilenetModel.infer(img, 'conv_preds');
              // Get the most likely class and confidences from the classifier module.
              const result = await knnClassifierModel.predictClass(activation);

              //console.log(classes[result.label - 1].name)
              try {
                  predictions.innerHTML = classes[result.label - 1].name
                  confidence.innerHTML = Math.floor(result.confidences[result.label] * 100)
                  document.getElementById('change-prediction').click();
              }
              catch (err) {
                  predictions.innerHTML = result.label - 1
                  confidence.innerHTML = Math.floor(result.confidences[result.label] * 100)
              }
              // Dispose the tensor to release the memory.
              img.dispose();
        }
        await window.tf.nextFrame();
    }
  };

  await initializeElements();
  await imageClassificationWithTransferLearningOnWebcam();
}


window.onload = async () => {
  await start();
};

const Landing = () => {
  const [yourID, setYourID] = useState('');
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callingFriend, setCallingFriend] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callRejected, setCallRejected] = useState(false);
  const [receiverID, setReceiverID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [isfullscreen, setFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();
  const myPeer = useRef();
  const classes = useStyles();

  useEffect(() => {
    socket.current = io.connect('/');

    socket.current.on('yourID', (id) => {
      setYourID(id);
    });
    socket.current.on('allUsers', (users) => {
      setUsers(users);
    });

    socket.current.on('hey', (data) => {
      setReceivingCall(true);
      ringtoneSound.play();
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  function acceptCall() {
    ringtoneSound.unload();
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
        setCallAccepted(true);
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });

        myPeer.current = peer;

        peer.on('signal', (data) => {
          socket.current.emit('acceptCall', { signal: data, to: caller });
        });

        peer.on('stream', (stream) => {
          partnerVideo.current.srcObject = stream;
        });

        peer.on('error', (err) => {
          endCall();
        });

        peer.signal(callerSignal);

        socket.current.on('close', () => {
          window.location.reload();
        });
      })
      .catch(() => {
        setModalMessage(
          'You cannot place/ receive a call without granting video and audio permissions! Please change your settings to use this app.',
        );
        setModalVisible(true);
      });
  }

  function rejectCall() {
    ringtoneSound.unload();
    setCallRejected(true);
    socket.current.emit('rejected', { to: caller });
    window.location.reload();
  }

  function endCall() {
    myPeer.current.destroy();
    socket.current.emit('close', { to: caller });
    window.location.reload();
  }

  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((screenStream) => {
      myPeer.current.replaceTrack(
        stream.getVideoTracks()[0],
        screenStream.getVideoTracks()[0],
        stream,
      );
      userVideo.current.srcObject = screenStream;
      screenStream.getTracks()[0].onended = () => {
        myPeer.current.replaceTrack(
          screenStream.getVideoTracks()[0],
          stream.getVideoTracks()[0],
          stream,
        );
        userVideo.current.srcObject = stream;
      };
    });
  }

  function toggleMuteAudio() {
    if (stream) {
      setAudioMuted(!audioMuted);
      stream.getAudioTracks()[0].enabled = audioMuted;
    }
  }

  function toggleMuteVideo() {
    if (stream) {
      setVideoMuted(!videoMuted);
      stream.getVideoTracks()[0].enabled = videoMuted;
    }
  }

  function renderLanding() {
    if (!callRejected && !callAccepted && !callingFriend) return 'block';
    return 'none';
  }

  function renderCall() {
    if (!callRejected && !callAccepted && !callingFriend) return 'none';
    return 'block';
  }

  // function isMobileDevice() {
  //   let check = false;
  //   (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  //   return check;
  // };

  function showCopiedMessage() {
    navigator.clipboard.writeText(yourID);
    setCopied(true);
    setInterval(() => {
      setCopied(false);
    }, 1000);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <VideoFrame
        video={
          <video
            className="userVideo"
            playsInline
            muted
            ref={userVideo}
            className={classes.video}
            autoPlay
          />
        }
      />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    if (callAccepted && isfullscreen) {
      PartnerVideo = (
        <VideoFrame
          video={
            <video
              playsInline
              ref={partnerVideo}
              className={`partnerVideo cover ${classes.video}`}
              autoPlay
            />
          }
        />
      );
    } else if (callAccepted && !isfullscreen) {
      PartnerVideo = (
        <VideoFrame
          video={
            <video
              className="partnerVideo"
              playsInline
              ref={partnerVideo}
              className={`partnerVideo ${classes.video} `}
              autoPlay
            />
          }
        />
      );
    }
  }

  let audioControl;
  if (audioMuted) {
    audioControl = (
      <span className="iconContainer" onClick={() => toggleMuteAudio()}>
        <VolumeOffIcon />
      </span>
    );
  } else {
    audioControl = (
      <span className="iconContainer" onClick={() => toggleMuteAudio()}>
        <VolumeUpIcon />
      </span>
    );
  }

  let videoControl;
  if (videoMuted) {
    videoControl = (
      <span className="iconContainer" onClick={() => toggleMuteVideo()}>
        <img src={camerastop} alt="Resume video" />
      </span>
    );
  } else {
    videoControl = (
      <span className="iconContainer" onClick={() => toggleMuteVideo()}>
        <img src={camera} alt="Stop audio" />
      </span>
    );
  }

  let screenShare = (
    <span className="iconContainer" onClick={() => shareScreen()}>
      <img src={share} alt="Share screen" />
    </span>
  );
  // if(isMobileDevice()){
  //   screenShare=<></>
  // }

  let fullscreenButton;
  if (isfullscreen) {
    fullscreenButton = (
      <span
        className="iconContainer"
        onClick={() => {
          setFullscreen(false);
        }}
      >
        <img src={minimize} alt="fullscreen" />
      </span>
    );
  } else {
    fullscreenButton = (
      <span
        className="iconContainer"
        onClick={() => {
          setFullscreen(true);
        }}
      >
        <img src={fullscreen} alt="fullscreen" />
      </span>
    );
  }

  let incomingCall;
  if (receivingCall && !callAccepted && !callRejected) {
    incomingCall = (
      <div className="incomingCallContainer">
        <div className="incomingCall flex flex-column">
          <div>
            <span className="callerID">{caller}</span> is calling you!
          </div>
          <div className="incomingCallButtons flex">
            <button name="accept" className="alertButtonPrimary" onClick={() => acceptCall()}>
              Accept
            </button>
            <button name="reject" className="alertButtonSecondary" onClick={() => rejectCall()}>
              Reject
            </button>
          </div>
        </div>
      </div>
    );
  }

  function callPeer(id) {
    if (id !== '' && users[id] && id !== yourID) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          getUserData();

          setStream(stream);
          setCallingFriend(true);
          setCaller(id);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
          const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {
              iceServers: [
                // {
                //     urls: "stun:numb.viagenie.ca",
                //     username: "sultan1640@gmail.com",
                //     credential: "98376683"
                // },
                // {
                //     urls: "turn:numb.viagenie.ca",
                //     username: "sultan1640@gmail.com",
                //     credential: "98376683"
                // }
                { url: 'stun:stun01.sipphone.com' },
                { url: 'stun:stun.ekiga.net' },
                { url: 'stun:stun.fwdnet.net' },
                { url: 'stun:stun.ideasip.com' },
                { url: 'stun:stun.iptel.org' },
                { url: 'stun:stun.rixtelecom.se' },
                { url: 'stun:stun.schlund.de' },
                { url: 'stun:stun.l.google.com:19302' },
                { url: 'stun:stun1.l.google.com:19302' },
                { url: 'stun:stun2.l.google.com:19302' },
                { url: 'stun:stun3.l.google.com:19302' },
                { url: 'stun:stun4.l.google.com:19302' },
                { url: 'stun:stunserver.org' },
                { url: 'stun:stun.softjoys.com' },
                { url: 'stun:stun.voiparound.com' },
                { url: 'stun:stun.voipbuster.com' },
                { url: 'stun:stun.voipstunt.com' },
                { url: 'stun:stun.voxgratia.org' },
                { url: 'stun:stun.xten.com' },
                {
                  url: 'turn:numb.viagenie.ca',
                  credential: 'muazkh',
                  username: 'webrtc@live.com',
                },
                {
                  url: 'turn:192.158.29.39:3478?transport=udp',
                  credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                  username: '28224511:1379330808',
                },
                {
                  url: 'turn:192.158.29.39:3478?transport=tcp',
                  credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                  username: '28224511:1379330808',
                },
              ],
            },
            stream: stream,
          });

          myPeer.current = peer;

          peer.on('signal', (data) => {
            socket.current.emit('callUser', {
              userToCall: id,
              signalData: data,
              from: yourID,
            });
          });

          peer.on('stream', (stream) => {
            if (partnerVideo.current) {
              partnerVideo.current.srcObject = stream;
            }
          });

          peer.on('error', (err) => {
            endCall();
          });

          socket.current.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
          });

          socket.current.on('close', () => {
            window.location.reload();
          });

          socket.current.on('rejected', () => {
            window.location.reload();
          });
        })
        .catch(() => {
          setModalMessage(
            'You cannot place/ receive a call without granting video and audio permissions! Please change your settings to use this app.',
          );
          setModalVisible(true);
        });
    } else {
      setModalMessage('We think the username entered is wrong. Please check again and retry!');
      setModalVisible(true);
      return;
    }
  }
  // ------------------------------------------
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  async function handleLogout() {
    setError('');
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  async function getUserData() {
    const body = {
      username: currentUser.email,
    };
    const response = await fetch('/user-model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log('data', data);
  }
  // -------------------------------------------------
  let landingHTML = (
    <>
      <Navigation />
      <main>
        <div className="u-margin-top-xxlarge u-margin-bottom-xxlarge">
          <div className="o-wrapper-l">
            <div className="hero flex flex-column">
              <div>
                <div className="welcomeText">motion</div>
                <div className="descriptionText">across the world for free</div>
              </div>
              <div>
                <div className="actionText">
                  Who do you want to call,{' '}
                  <span
                    className={copied ? 'username highlight copied' : 'username highlight'}
                    onClick={() => {
                      showCopiedMessage();
                    }}
                  >
                    {yourID}
                  </span>
                  ?
                </div>
              </div>
              <div className="callBox flex">
                <input
                  type="text"
                  placeholder="Friend ID"
                  value={receiverID}
                  onChange={(e) => setReceiverID(e.target.value)}
                  className="form-input"
                />
                <button
                  onClick={() => callPeer(receiverID.toLowerCase().trim())}
                  className="primaryButton"
                >
                  Call
                </button>
              </div>
              <div>
                To call your friend, ask them to open this app in their browser. <br />
                Send your username (<span className="username">{yourID}</span>) and wait for their
                call <span style={{ fontWeight: 600 }}>OR</span> enter their username and hit call!
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
  return (
    <>
      <div style={{ display: renderLanding() }}>
        {landingHTML}
        <Rodal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          width={20}
          height={5}
          measure={'em'}
          closeOnEsc={true}
        >
          <div>{modalMessage}</div>
        </Rodal>
        {incomingCall}
        <strong>Email:</strong> {currentUser && currentUser.email}
        <div>
          <Button onClick={handleLogout}>Log Out</Button>
        </div>
      </div>
      <div className={`callContainer ${classes.videoBackground}`} style={{ display: renderCall() }}>
        <div className={classes.videoContainer}>
          <div className={classes.twoVideos}>
            <div className="">{PartnerVideo}</div>
            <div className="">{UserVideo}</div>
          </div>
        </div>
        <div className={classes.btnContainer}>
          <Button
            variant="contained"
            className={classes.endCallBtn}
            startIcon={<CallEndIcon />}
            onClick={endCall}
          >
            End Call
          </Button>
        </div>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
      <div>
      <div id="video-grid"></div>
      <div id="loading"></div>
      <div className="row">

        <div className="mycam">
          <video hidden autoPlay playsInline muted id="webcam" className="cam"></video>
          <div className="grey-bg">
              <div className="row text-center">
                  <h3>Prediction: <span id="predictions"></span></h3>
                  <h3>Probability : <span id="confidence"></span> %</h3>
                  <button hidden id="change-prediction"></button>
              </div>
          </div>
        </div>
        <div className="column flex-2-container">
          <div>
          <div className="model">
              <button className="dark btn-lg btn-shadow " id="save_button">Download Model 
              <i className="fas fa-download"></i>
              </button>
              <input id="load_button" className="fileinputs" type="file" accept=".json"></input>
                <label htmlFor="upload-photo">Browse...</label> 

            </div>
            <div className="add-class text-center">


              <input id="inputClassName" type="text" placeholder="Enter Class Name Here" name="option" />
              <button className="dark btn-lg btn-shadow mr-5" id="add-button">Add 
              <i className="fas  fa-plus fa-1x"></i>
              </button>

              </div>

              <div id="training-cards">

              </div>
          </div>
        </div>
      </div>
      </div>


    </>
  );
};

export default Landing;
