import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import './style.css';
import { Routes, Route } from 'react-router-dom';
import Peer, { MediaConnection } from 'peerjs';

export default function PeerJsComponent() {

  const menuRef = useRef<HTMLDivElement | null>(null);
  const uuidRef = useRef<HTMLDivElement | null>(null);
  const liveRef = useRef<HTMLDivElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const [peerId, setPeerId] = useState<string>('');
  const [id, setId] = useState<string>('');

  const peer = new Peer();
  let currentCall: MediaConnection | undefined;

  async function callUser() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // switch to the video call and play the camera preview
    if (!menuRef.current) return;
    menuRef.current.style.display = "none";
    if (!liveRef.current) return;
    liveRef.current.style.display = "block";
    if (!localVideoRef.current) return;
    localVideoRef.current.srcObject = stream;
    localVideoRef.current.play();
  // make the call
    const call = peer.call(peerId, stream);
    call.on("stream", (stream) => {
      if (!remoteVideoRef.current) return;
      remoteVideoRef.current.srcObject = stream;
      remoteVideoRef.current.play();
    });
    // call.on("data", (stream) => {
    //   if (!remoteVideoRef.current) return;
    //   remoteVideoRef.current.srcObject = stream;
    // });
    call.on("error", (err) => {
      console.log(err);
    });
    call.on('close', () => {
      endCall()
    })
  // save the close function
    currentCall = call;
  }

  peer.on("call", (call) => {
    if (window.confirm(`Accept call from ${call.peer}?`)) {
      // grab the camera and mic
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          // play the local preview
          if (!localVideoRef.current) return;
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play();
  // answer the call
          // call.answer(stream);
  // save the close function
          currentCall = call;
  // change to the video view
          if (!menuRef.current) return;
          menuRef.current.style.display = "none";
          if (!liveRef.current) return;
          liveRef.current.style.display = "block";
          call.on("stream", (remoteStream) => {
            // when we receive the remote stream, play it
            if (!remoteVideoRef.current) return;
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        })
        .catch((err) => {
          console.log("Failed to get local stream:", err);
        });
    } else {
      // user rejected the call, close it
      call.close();
    }
  });

  function endCall() {
    // Go back to the menu
          if (!menuRef.current) return;
          menuRef.current.style.display = "block";
    if (!liveRef.current) return;
    liveRef.current.style.display = "none";
  // If there is no current call, return
    if (!currentCall) return;
  // Close the call, and reset the function
    try {
      currentCall.close();
    } catch {}
    currentCall = undefined;
  }

  const onPeerIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPeerId(value);
  }

  useEffect(() => {
    peer.on("open", function (id) {
      setId(id);
    });
  }, [])

  return (
    <>
      <div id="menu" ref={menuRef}>
          <p>Your ID:</p>
          <p id="uuid">{id}</p>  
          <input value={peerId} onChange={onPeerIdChangeHandler} type="text" placeholder="Peer id" />
          <button onClick={callUser}>Connect</button>
      </div>
      <div id="live" ref={liveRef}>
          <video ref={remoteVideoRef} id="remote-video"></video>
          <video ref={localVideoRef} id="local-video" muted></video>
          <button id="end-call" onClick={endCall}>End Call</button>
      </div>
    </>
    
  );
}
